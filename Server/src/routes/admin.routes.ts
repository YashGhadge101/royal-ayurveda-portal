import { Router } from "express";
import pool from "../config/db";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

const router = Router();
dotenv.config();

router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;

        const [rows]: any = await pool.query(
            "SELECT * FROM admins WHERE email = ?",
            [email]
        );

        if (rows.length === 0) {
            return res.status(401).json({
                message: "Invalid Credentials",
            });
        }

        const admin = rows[0];

        if (admin.password !== password) {
            return res.status(401).json({
                message: "Invalid Credentials",
            });
        }

        const token = jwt.sign(
            {
                id: admin.id,
                email: admin.email,
            },
            process.env.JWT_SECRET as string,
            {
                expiresIn: "7d",
            }
        );

        res.status(200).json({
            message: "Login Successful",
            token,
            admin: {
                id: admin.id,
                username: admin.username,
                email: admin.email,
            },
        });
    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Server Error",
        });
    }
});

router.get("/stats", async (_req, res) => {
  try {
    const [products]: any = await pool.query(
      "SELECT COUNT(*) as totalProducts FROM products"
    );

    const [categories]: any = await pool.query(
      "SELECT COUNT(DISTINCT category) as totalCategories FROM products"
    );

    const [admins]: any = await pool.query(
      "SELECT COUNT(*) as totalAdmins FROM admins"
    );

    res.json({
      totalProducts:
        products[0].totalProducts,

      totalCategories:
        categories[0].totalCategories,

      totalAdmins:
        admins[0].totalAdmins,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
});

router.get(
  "/recent-products",
  async (_req, res) => {
    try {
      const [rows] = await pool.query(
        `
        SELECT *
        FROM products
        ORDER BY id DESC
        LIMIT 5
        `
      );

      res.json(rows);
    } catch (error) {
      console.error(error);

      res.status(500).json({
        message: "Server Error",
      });
    }
  }
);

router.get(
  "/category-stats",
  async (_req, res) => {
    try {
      const [rows] = await pool.query(
        `
        SELECT
          category,
          COUNT(*) as total
        FROM products
        GROUP BY category
        ORDER BY total DESC
        `
      );

      res.json(rows);
    } catch (error) {
      console.error(error);

      res.status(500).json({
        message: "Server Error",
      });
    }
  }
);

export default router;