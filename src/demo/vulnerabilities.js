// ตัวอย่าง Vulnerability: SQL Injection
const userInput = "1; DROP TABLE users"; // Input จากผู้ใช้ที่ไม่ปลอดภัย
db.query(`SELECT * FROM users WHERE id=${userInput}`); // ช่องโหว่ SQL Injection
