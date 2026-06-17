import { Router } from "express";
import pool from "../config/db";



const router = Router();

router.get("/", async (_req, res) => {
  try {
    const [rows] = await pool.query(
      "SELECT * FROM categories ORDER BY name ASC"
    );

    res.json(rows);
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
    });
  }
});

router.post("/", async (req, res) => {
  try {
    const { name } = req.body;

    await pool.query(
      `
      INSERT INTO categories(name)
      VALUES(?)
      `,
      [name]
    );

    res.status(201).json({
      message: "Category Added",
    });
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
    });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    await pool.query(
      `
      DELETE FROM categories
      WHERE id = ?
      `,
      [id]
    );

    res.json({
      message: "Category Deleted",
    });
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
    });
  }
});

export default router;