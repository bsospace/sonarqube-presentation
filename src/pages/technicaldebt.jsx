import CodeExample from "../components/code-example";

const TechnicalDebt = () => {
  const exampleCode = `
// วิธีแก้ปัญหาชั่วคราว (Quick workaround)
function fetchData() {
  return fetch('/api/data').then((res) => res.json());
}

// ออกแบบไม่ดี ขาดการจัดการข้อผิดพลาด (Error Handling)
`;

  const description =
    "โค้ดนี้แสดงตัวอย่างของหนี้ทางเทคนิค (Technical Debt): การแก้ปัญหาแบบชั่วคราวโดยขาดความรอบคอบ " +
    "ซึ่งอาจส่งผลให้ระบบไม่เสถียรและเพิ่มค่าใช้จ่ายในการดูแลรักษาในอนาคต.";

  const thaiDescription = `
หนี้ทางเทคนิค (Technical Debt) หมายถึงการเลือกใช้วิธีแก้ปัญหาแบบง่ายหรือชั่วคราว เพื่อให้สามารถพัฒนาได้เร็วขึ้น 
แต่ไม่ได้คำนึงถึงผลกระทบในระยะยาว เช่น การขาดการจัดการข้อผิดพลาดในโค้ดตัวอย่างนี้ อาจทำให้เกิดปัญหาเมื่อ API 
ส่งข้อมูลผิดพลาด หรือระบบไม่สามารถทำงานได้อย่างที่ควรจะเป็น ทำให้ต้องเสียเวลาและทรัพยากรมากขึ้นในอนาคตเพื่อแก้ไข.
`;

  return (
    <div className="py-8 px-4">
      <header className="mb-8 text-center">
        <h2 className="text-3xl font-bold text-blue-600">หนี้ทางเทคนิค (Technical Debt)</h2>
        <p className="text-gray-600">ตัวอย่างของผลกระทบจากการแก้ปัญหาแบบชั่วคราว</p>
      </header>
      <main>
        <section className="mb-8">
          <h3 className="text-2xl font-semibold text-red-500">หนี้ทางเทคนิคคืออะไร?</h3>
          <p className="text-gray-700">{thaiDescription}</p>
        </section>
        <CodeExample code={exampleCode} language="javascript" description={description} />
        <section className="mt-8">
          <h3 className="text-2xl font-semibold text-green-600">วิธีการปรับปรุง</h3>
          <p className="text-gray-700">
            เพื่อหลีกเลี่ยงหนี้ทางเทคนิค ควรเขียนโค้ดที่รองรับข้อผิดพลาดและมีการออกแบบที่ดี ตัวอย่างเช่น:
          </p>
          <CodeExample
            code={`
async function fetchData() {
  try {
    const response = await fetch('/api/data');
    if (!response.ok) {
      throw new Error(\`HTTP error! status: \${response.status}\`);
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching data:', error);
    return { error: true, message: error.message };
  }
}
`}
            language="javascript"
            description="ตัวอย่างการปรับปรุงโค้ดให้มีการจัดการข้อผิดพลาด"
          />
          <p className="text-gray-700 mt-4">
            การเขียนโค้ดในลักษณะนี้ช่วยลดความเสี่ยงจากปัญหาที่ไม่คาดคิด และช่วยให้ระบบมีความเสถียรในระยะยาว.
          </p>
        </section>
      </main>
    </div>
  );
};

export default TechnicalDebt;
