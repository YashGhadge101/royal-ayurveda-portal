import { Router } from "express";
import pool from "../config/db";
import customerAuth, {
  CustomerRequest,
} from "../middleware/customerAuth";

const router = Router();

/*
====================================
CREATE INQUIRY
====================================
*/
router.post(
  "/",
  customerAuth,
  async (
    req: CustomerRequest,
    res
  ) => {
    try {
      const {
        product_name,
        name,
        email,
        phone,
        message,
      } = req.body;

      const customer_id =
        req.customer?.id;

      const [result] =
        await pool.query(
          `
        INSERT INTO inquiries
        (
          customer_id,
          product_name,
          name,
          email,
          phone,
          message
        )
        VALUES (?, ?, ?, ?, ?, ?)
        `,
          [
            customer_id,
            product_name,
            name,
            email,
            phone,
            message,
          ]
        );

      res.status(201).json({
        message:
          "Inquiry Submitted",
        result,
      });
    } catch (error) {
      console.error(error);

      res.status(500).json({
        message: "Server Error",
      });
    }
  }
);

/*
====================================
GET CUSTOMER INQUIRIES
====================================
*/
router.get(
  "/my",
  customerAuth,
  async (
    req: CustomerRequest,
    res
  ) => {
    try {
      const [rows] =
        await pool.query(
          `
          SELECT *
          FROM inquiries
          WHERE customer_id = ?
          ORDER BY id DESC
          `,
          [req.customer?.id]
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

/*
====================================
GET ALL INQUIRIES
====================================
*/
router.get("/", async (_req, res) => {
  try {
    const [rows] =
      await pool.query(
        `
        SELECT *
        FROM inquiries
        ORDER BY id DESC
        `
      );

    res.json(rows);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
});

/*
====================================
DELETE INQUIRY
====================================
*/
router.delete(
  "/:id",
  async (req, res) => {
    try {
      const { id } = req.params;

      await pool.query(
        `
        DELETE FROM inquiries
        WHERE id = ?
        `,
        [id]
      );

      res.json({
        message:
          "Inquiry Deleted",
      });
    } catch (error) {
      console.error(error);

      res.status(500).json({
        message: "Server Error",
      });
    }
  }
);

export default router;