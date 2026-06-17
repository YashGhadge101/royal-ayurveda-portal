import { Router } from "express";
import pool from "../config/db";
import customerAuth, {
  CustomerRequest,
} from "../middleware/customerAuth";

const router = Router();

/*
====================================
ADD TO WISHLIST
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
      const { productId } =
        req.body;

      const customerId =
        req.customer?.id;

      const [existing]: any =
        await pool.query(
          `
          SELECT *
          FROM wishlist
          WHERE customer_id = ?
          AND product_id = ?
          `,
          [
            customerId,
            productId,
          ]
        );

      if (
        existing.length > 0
      ) {
        return res.json({
          message:
            "Already in wishlist",
        });
      }

      await pool.query(
        `
        INSERT INTO wishlist
        (
          customer_id,
          product_id
        )
        VALUES (?, ?)
        `,
        [
          customerId,
          productId,
        ]
      );

      res.json({
        message:
          "Added to wishlist",
      });
    } catch (error) {
      console.error(error);

      res.status(500).json({
        message:
          "Server Error",
      });
    }
  }
);

/*
====================================
GET MY WISHLIST
====================================
*/
router.get(
  "/",
  customerAuth,
  async (
    req: CustomerRequest,
    res
  ) => {
    try {
      const [rows] =
        await pool.query(
          `
          SELECT
            p.*
          FROM wishlist w
          INNER JOIN products p
          ON p.id = w.product_id
          WHERE w.customer_id = ?
          ORDER BY w.id DESC
          `,
          [req.customer?.id]
        );

      res.json(rows);
    } catch (error) {
      console.error(error);

      res.status(500).json({
        message:
          "Server Error",
      });
    }
  }
);

/*
====================================
REMOVE WISHLIST
====================================
*/
router.delete(
  "/:productId",
  customerAuth,
  async (
    req: CustomerRequest,
    res
  ) => {
    try {
      const {
        productId,
      } = req.params;

      await pool.query(
        `
        DELETE FROM wishlist
        WHERE customer_id = ?
        AND product_id = ?
        `,
        [
          req.customer?.id,
          productId,
        ]
      );

      res.json({
        message:
          "Removed from wishlist",
      });
    } catch (error) {
      console.error(error);

      res.status(500).json({
        message:
          "Server Error",
      });
    }
  }
);

export default router;