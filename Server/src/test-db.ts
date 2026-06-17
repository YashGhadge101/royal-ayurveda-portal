import pool from "./config/db";

async function testDB() {
  try {
    const [rows] = await pool.query(
      "SELECT * FROM products"
    );

    console.log(rows);
  } catch (error) {
    console.error(error);
  }
}

testDB();