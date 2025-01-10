import CodeExample from "../components/code-example";

const Vulnerabilities = () => {
  const exampleCode = `
// ตัวอย่างช่องโหว่ SQL Injection
const userInput = "1; DROP TABLE users";
// Input ที่ไม่ปลอดภัย
db.query(\`SELECT * FROM users WHERE id=\${userInput}\`); 
`;

  const description =
    "โค้ดนี้แสดงถึงช่องโหว่ด้านความปลอดภัย (Vulnerability): SQL Injection เกิดจากการรับข้อมูลที่ผู้ใช้ป้อนมาโดยตรง " +
    "โดยไม่มีการตรวจสอบหรือกรองข้อมูล ซึ่งทำให้ผู้ไม่หวังดีสามารถแทรกคำสั่ง SQL เพื่อโจมตีฐานข้อมูลได้.";

  const thaiDescription = `
ช่องโหว่นี้เกิดขึ้นจากการที่โค้ดรับข้อมูลที่ผู้ใช้ป้อนมาโดยตรง และใช้ข้อมูลนั้นในการสร้างคำสั่ง SQL โดยไม่มีการกรองหรือป้องกัน 
ทำให้ผู้โจมตีสามารถใส่คำสั่ง SQL ที่อันตราย เช่น การลบตาราง หรือการขโมยข้อมูลในฐานข้อมูล วิธีการป้องกันคือการใช้ Query Parameters 
หรือ ORM (Object-Relational Mapping) เพื่อป้องกันการแทรกคำสั่งที่ไม่พึงประสงค์.
`;

  const secureExample = `
// ตัวอย่างการแก้ไขด้วย Query Parameters
const userInput = "1";
db.query("SELECT * FROM users WHERE id=?", [userInput]);
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
            วิธีที่แนะนำในการป้องกัน SQL Injection คือการใช้ Query Parameters ซึ่งจะช่วยป้องกันคำสั่ง SQL ที่ไม่พึงประสงค์ ตัวอย่าง:
          </p>
          <CodeExample
            code={secureExample}
            language="javascript"
            description="การใช้ Query Parameters เพื่อป้องกัน SQL Injection"
          />
          <p className="text-gray-700 mt-4">
            การใช้ ORM เช่น Sequelize หรือ Prisma ก็เป็นอีกวิธีที่ดีในการลดความเสี่ยงจากช่องโหว่ SQL Injection โดยไม่ต้องจัดการ SQL โดยตรง.
          </p>
        </section>
      </main>
    </div>
  );
};

export default Vulnerabilities;
