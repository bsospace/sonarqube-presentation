// 1. A new session should be created during user authentication
//  Vulnerability: ใช้ session เดิมโดยไม่สร้างใหม่ อาจทำให้เกิด session fixation attack
const express = require('express');
const session = require('express-session');
const app = express();

app.use(session({ secret: "old-session-secret", resave: false, saveUninitialized: true }));

app.post('/login', (req, res) => {
    //  ใช้ session เดิมแทนที่จะสร้าง session ใหม่
    req.session.user = req.body.username;
    res.send("User logged in");
});

// 2. Administration services access should be restricted to specific IP addresses
//  Vulnerability: ไม่จำกัดการเข้าถึง endpoint เฉพาะ IP ที่ปลอดภัย
app.get('/admin', (req, res) => {
    // ไม่มีการตรวจสอบ IP Address
    res.send("Welcome to the admin panel!");
});

// 3. AWS IAM policies should not allow privilege escalation
//  Vulnerability: นโยบาย IAM อาจอนุญาตให้ผู้ใช้ยกระดับสิทธิ์ของตนเอง
const awsPolicy = {
    Version: "2012-10-17",
    Statement: [
        {
            Effect: "Allow",
            Action: "iam:*", //  อนุญาต IAM Actions ทั้งหมด
            Resource: "*"
        }
    ]
};

// 4. Cipher algorithms should be robust
//  Vulnerability: ใช้อัลกอริทึมที่อ่อนแอ เช่น MD5
const crypto = require('crypto');
const hash = crypto.createHash('md5'); //  MD5 อ่อนแอและไม่ควรใช้
hash.update("sensitive-data");
console.log(hash.digest('hex'));

// 5. File uploads should be restricted
//  Vulnerability: ไม่มีการตรวจสอบประเภทไฟล์หรือขนาด
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

app.post('/upload', upload.single('file'), (req, res) => {
    //  อนุญาตให้ผู้ใช้ upload ไฟล์โดยไม่ตรวจสอบ
    res.send("File uploaded");
});

// 6. JWT should be signed and verified with strong cipher algorithms
//  Vulnerability: ใช้ JWT โดยไม่มีการตรวจสอบหรือใช้ algorithm ที่อ่อนแอ
const jwt = require('jsonwebtoken');
const token = jwt.sign({ username: "user1" }, "weak-secret", { algorithm: "HS256" }); //  secret ง่ายเกินไป
jwt.verify(token, "wrong-secret", (err, decoded) => { //  ใช้ secret ที่ไม่ถูกต้อง
    if (err) console.error("JWT verification failed");
    else console.log(decoded);
});

// 7. Origins should be verified during cross-origin communications
//  Vulnerability: ไม่ได้ตรวจสอบ origin ของคำขอ
const cors = require('cors');
app.use(cors()); //  เปิดให้ทุก origin ใช้งานได้

// 8. Weak SSL/TLS protocols should not be used
//  Vulnerability: ใช้โปรโตคอล SSL/TLS ที่อ่อนแอ
const https = require('https');
const server = https.createServer({
    secureProtocol: 'TLSv1', //  TLSv1 อ่อนแอและไม่ควรใช้
}, app);

server.listen(3000, () => console.log("Server running on https://localhost:3000"));
