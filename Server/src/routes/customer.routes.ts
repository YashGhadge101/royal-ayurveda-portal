import { Router } from "express";
import pool from "../config/db";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import customerAuth, { CustomerRequest } from "../middleware/customerAuth";

dotenv.config();

const router = Router();

// --- HELPER FUNCTION: GENERATE REFERRAL CODE ---
// Generates a random 8-character alphanumeric code (e.g., "MI8X9P2A")
const generateReferralCode = () => {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let code = "MI"; // Prefixing with 'MI' for brand identity
  for (let i = 0; i < 6; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return code;
};

// --- POST: SIGNUP ---
router.post("/signup", async (req, res) => {
  try {
    const { name, email, password, phone, referred_by } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        message: "All required fields are required",
      });
    }

    // 1. Check if email exists
    const [existing]: any = await pool.query(
      "SELECT id FROM customers WHERE email = ?",
      [email]
    );

    if (existing.length > 0) {
      return res.status(400).json({
        message: "Email already exists",
      });
    }

    // 2. Validate Referral Code (if user provided one)
    let validReferredBy = null;
    if (referred_by && referred_by.trim() !== "") {
      const [sponsor]: any = await pool.query(
        "SELECT id FROM customers WHERE referral_code = ?",
        [referred_by]
      );
      
      if (sponsor.length === 0) {
        return res.status(400).json({
          message: "Invalid Referral Code. Please check the code and try again.",
        });
      }
      validReferredBy = referred_by.toUpperCase();
    }

    // 3. Generate unique referral code for the new user
    const myReferralCode = generateReferralCode();
    const hashedPassword = await bcrypt.hash(password, 10);

    // 4. Insert into database
    const [result]: any = await pool.query(
      `
      INSERT INTO customers
      (name, email, password, phone, referral_code, referred_by)
      VALUES (?, ?, ?, ?, ?, ?)
      `,
      [name, email, hashedPassword, phone || null, myReferralCode, validReferredBy]
    );

    const token = jwt.sign(
      {
        id: result.insertId,
        email,
      },
      process.env.JWT_SECRET as string,
      { expiresIn: "7d" }
    );

    res.status(201).json({
      message: "Account Created Successfully",
      token,
      customer: {
        id: result.insertId,
        name,
        email,
        phone,
        referral_code: myReferralCode,
        referred_by: validReferredBy
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
});

// --- POST: LOGIN ---
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const [rows]: any = await pool.query(
      "SELECT * FROM customers WHERE email = ?",
      [email]
    );

    if (rows.length === 0) {
      return res.status(401).json({ message: "Invalid Credentials" });
    }

    const customer = rows[0];

    const isMatch = await bcrypt.compare(password, customer.password);

    if (!isMatch) {
      return res.status(401).json({ message: "Invalid Credentials" });
    }

    const token = jwt.sign(
      {
        id: customer.id,
        email: customer.email,
      },
      process.env.JWT_SECRET as string,
      { expiresIn: "7d" }
    );

    res.status(200).json({
      message: "Login Successful",
      token,
      customer: {
        id: customer.id,
        name: customer.name,
        email: customer.email,
        phone: customer.phone,
        referral_code: customer.referral_code,
        referred_by: customer.referred_by
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
});

// --- GET: PROFILE ---
router.get("/profile", customerAuth, async (req: CustomerRequest, res) => {
  try {
    // We grab the user data, AND we run a subquery to count how many people they have referred!
    const [rows]: any = await pool.query(
      `
      SELECT 
        id, name, email, phone, referral_code, referred_by, created_at,
        (SELECT COUNT(*) FROM customers WHERE referred_by = c.referral_code) as network_size
      FROM customers c
      WHERE id = ?
      `,
      [req.customer?.id]
    );

    if (rows.length === 0) {
      return res.status(404).json({ message: "Customer not found" });
    }

    res.json(rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
});

// --- PUT: UPDATE PROFILE ---
router.put("/profile", customerAuth, async (req: CustomerRequest, res) => {
  try {
    const { name, phone } = req.body;

    await pool.query(
      `
      UPDATE customers
      SET name = ?, phone = ?
      WHERE id = ?
      `,
      [name, phone, req.customer?.id]
    );

    const [rows]: any = await pool.query(
      `
      SELECT id, name, email, phone, referral_code, referred_by 
      FROM customers 
      WHERE id = ?
      `,
      [req.customer?.id]
    );

    res.json({
      message: "Profile Updated Successfully",
      customer: rows[0],
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
});

// --- PUT: CHANGE PASSWORD ---
router.put("/change-password", customerAuth, async (req: CustomerRequest, res) => {
  try {
    const { currentPassword, newPassword } = req.body;

    const [rows]: any = await pool.query(
      "SELECT * FROM customers WHERE id = ?",
      [req.customer?.id]
    );

    const customer = rows[0];

    const isMatch = await bcrypt.compare(currentPassword, customer.password);

    if (!isMatch) {
      return res.status(400).json({ message: "Current password is incorrect" });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    await pool.query(
      "UPDATE customers SET password = ? WHERE id = ?",
      [hashedPassword, req.customer?.id]
    );

    res.json({ message: "Password Changed Successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
});

export default router;