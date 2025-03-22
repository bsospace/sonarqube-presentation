import CodeExample from "../components/code-example";

const Vulnerabilities = () => {
  const exampleCode = `
// 1. A new session should be created during user authentication
const express = require('express');
const session = require('express-session');
const app = express();

app.use(session({ secret: "old-session-secret", resave: false, saveUninitialized: true }));
app.post('/login', (req, res) => {
    req.session.user = req.body.username; //  ไม่สร้าง session ใหม่ อาจทำให้เกิด session fixation attack
    res.send("User logged in");
});

// 2. Cryptographic keys should be robust
const crypto = require('crypto');
const weakKey = "12345"; //  คีย์สั้นและคาดเดาได้ง่าย
const cipher = crypto.createCipheriv('aes-128-cbc', weakKey, '1234567890123456');
let encrypted = cipher.update("sensitive-data", 'utf8', 'hex');
encrypted += cipher.final('hex');
console.log(encrypted);
`;

  const description =
    "โค้ดนี้แสดงถึงช่องโหว่ที่สำคัญ เช่น การไม่สร้าง session ใหม่หลังการเข้าสู่ระบบ อาจทำให้เกิด Session Fixation " +
    "และการใช้คีย์เข้ารหัสที่อ่อนแอ ซึ่งอาจทำให้ข้อมูลสำคัญถูกคาดเดาได้ง่าย.";

  const thaiDescription = `
ช่องโหว่ในโค้ดนี้ครอบคลุมประเด็นด้านความปลอดภัย เช่น:
1. การไม่สร้าง session ใหม่หลังจากผู้ใช้เข้าสู่ระบบ อาจทำให้เกิดการโจมตีแบบ Session Fixation ซึ่งผู้ไม่หวังดีสามารถใช้ session เดิมเพื่อเข้าถึงบัญชีได้.
2. การใช้คีย์เข้ารหัสที่สั้นเกินไปและไม่ปลอดภัย ทำให้ข้อมูลที่เข้ารหัสสามารถถูกถอดรหัสได้ง่าย.
`;

  const secureExample = `
// วิธีแก้ไข Session Fixation
app.post('/login', (req, res) => {
    req.session.regenerate((err) => { //  สร้าง session ใหม่หลังการล็อกอิน
        if (err) {
            res.status(500).send("Session regeneration failed");
            return;
        }
        req.session.user = req.body.username;
        res.send("User logged in");
    });
});

// วิธีแก้ไขการใช้คีย์ที่อ่อนแอ
const strongKey = crypto.randomBytes(32); //  ใช้คีย์ที่สุ่มและปลอดภัย
const cipher = crypto.createCipheriv('aes-256-cbc', strongKey, '1234567890123456');
let encrypted = cipher.update("sensitive-data", 'utf8', 'hex');
encrypted += cipher.final('hex');
console.log(encrypted);
`;

  return (
    <div className="py-8 px-4">
      <header className="mb-8 text-center">
        <h2 className="text-3xl font-bold text-blue-600">ช่องโหว่ในโค้ด (Vulnerabilities)</h2>
        <p className="text-gray-600">ตัวอย่างช่องโหว่ที่สามารถเกิดขึ้นในโค้ด</p>
      </header>
      <main>
        <section className="mb-8">
          <h3 className="text-2xl font-semibold text-red-500">รายละเอียดช่องโหว่</h3>
          <p className="text-gray-700">{thaiDescription}</p>
        </section>
        <CodeExample code={exampleCode} language="javascript" description={description} />
        <section className="mt-8">
          <h3 className="text-2xl font-semibold text-green-600">วิธีการป้องกัน</h3>
          <p className="text-gray-700">
            วิธีการป้องกันช่องโหว่เหล่านี้ ได้แก่:
          </p>
          <ul className="list-disc list-inside text-gray-700 mt-4">
            <li>
              สร้าง session ใหม่ทุกครั้งที่ผู้ใช้เข้าสู่ระบบ เพื่อป้องกันการโจมตีแบบ Session Fixation.
            </li>
            <li>
              ใช้คีย์เข้ารหัสที่สุ่มและมีความยาวเพียงพอ เช่น 256 บิต สำหรับการเข้ารหัสข้อมูลสำคัญ.
            </li>
          </ul>
          <CodeExample
            code={secureExample}
            language="javascript"
            description="ตัวอย่างการแก้ไขเพื่อป้องกัน Session Fixation และใช้คีย์เข้ารหัสที่ปลอดภัย"
          />
          <p className="text-gray-700 mt-4">
            การปรับปรุงเหล่านี้ช่วยลดความเสี่ยงด้านความปลอดภัยและป้องกันช่องโหว่ที่อาจถูกโจมตี.
          </p>
        </section>
      </main>
    </div>
  );
};

export default Vulnerabilities;
