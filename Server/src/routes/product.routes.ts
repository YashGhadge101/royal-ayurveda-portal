import { Router } from "express";
import pool from "../config/db";

const router = Router();

/*
====================================
GET ALL PRODUCTS
/api/products
====================================
*/
router.get("/", async (_req, res) => {
  try {
    const [rows] = await pool.query(
      "SELECT * FROM products ORDER BY id DESC"
    );

    res.status(200).json(rows);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
});

/*
====================================
GET SINGLE PRODUCT
/api/products/:id
====================================
*/
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const [rows]: any = await pool.query(
      "SELECT * FROM products WHERE id = ?",
      [id]
    );

    if (rows.length === 0) {
      return res.status(404).json({
        message: "Product Not Found",
      });
    }

    res.status(200).json(rows[0]);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
});

/*
====================================
ADD PRODUCT
/api/products
====================================
*/
router.post("/", async (req, res) => {
  try {
    const {
      name,
      category,
      image,
      description,
    } = req.body;

    if (
      !name ||
      !category ||
      !image ||
      !description
    ) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    const [result] = await pool.query(
      `
      INSERT INTO products
      (name, category, image, description)
      VALUES (?, ?, ?, ?)
      `,
      [
        name,
        category,
        image,
        description,
      ]
    );

    res.status(201).json({
      message: "Product Added Successfully",
      result,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const {
      name,
      category,
      image,
      description,
    } = req.body;

    const [result]: any = await pool.query(
      `
      UPDATE products
      SET
      name = ?,
      category = ?,
      image = ?,
      description = ?
      WHERE id = ?
      `,
      [
        name,
        category,
        image,
        description,
        id,
      ]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({
        message: "Product Not Found",
      });
    }

    res.status(200).json({
      message: "Product Updated Successfully",
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const [result]: any = await pool.query(
      "DELETE FROM products WHERE id = ?",
      [id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({
        message: "Product Not Found",
      });
    }

    res.status(200).json({
      message: "Product Deleted Successfully",
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
});

export default router;

