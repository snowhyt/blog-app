import POOL from "../db";

async function testDB() {
    try {
        const res = await POOL.query("SELECT NOW()");
        console.log("Database Connected:", res.rows[0].now);
    } catch (err) {
        console.error("Database Connection Error:", err);
    }
}

testDB();
