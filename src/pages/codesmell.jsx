import CodeExample from "../components/code-example";

const CodeSmell = () => {
  const exampleCode = `
function calculateSum(arr) {
  let sum = 0;
  for (let i = 0; i < arr.length; i++) {
    sum += arr[i];
  }
  return sum;
}

function calculateSumAgain(arr) {
  let sum = 0;
  for (let i = 0; i < arr.length; i++) {
    sum += arr[i];
  }
  return sum;
}
`;

  const description =
    "ตัวอย่างนี้แสดงถึง 'Code Smell' มีฟังก์ชันที่ซ้ำกันซึ่งทำงานเหมือนกันทั้งหมด การมีโค้ดลักษณะนี้ทำให้การบำรุงรักษายากขึ้น และลดความเข้าใจง่ายของโค้ด";

  return (
    <div className="py-8 px-4">
      <header className="mb-8 text-center">
        <h2 className="text-3xl font-bold text-blue-600">Code Smell</h2>
        <p className="text-gray-600">ตัวอย่างของแนวทางการเขียนโค้ดที่ไม่ดี</p>
      </header>
      <main>
        <section className="mb-8">
          <h3 className="text-2xl font-semibold text-red-500">Code Smellคืออะไร?</h3>
          <p className="text-gray-700">
            'Code Smell' (Code Smell) คือสัญญาณที่บ่งบอกถึงปัญหาที่ลึกกว่าในโครงสร้างของโค้ด แม้จะไม่ส่งผลให้เกิดข้อผิดพลาดในทันที แต่จะทำให้โค้ดดูรกและยากต่อการบำรุงรักษาในระยะยาว ตัวอย่างนี้แสดงถึงการเขียนฟังก์ชันที่มีการทำงานเหมือนกันซ้ำๆ โดยไม่จำเป็น
          </p>
        </section>
        <CodeExample code={exampleCode} language="javascript" description={description} />
        <section className="mt-8">
          <h3 className="text-2xl font-semibold text-green-600">วิธีการแก้ไข</h3>
          <p className="text-gray-700">
            ควรปรับโค้ดโดยรวมฟังก์ชันที่ซ้ำกันให้เหลือเพียงฟังก์ชันเดียว ตัวอย่างเช่น การเปลี่ยนจากการมีฟังก์ชัน `calculateSum` และ `calculateSumAgain` ให้เหลือเพียงฟังก์ชัน `calculateSum` ซึ่งจะช่วยลดความซ้ำซ้อน เพิ่มความเรียบง่าย และทำให้โค้ดดูแลรักษาได้ง่ายขึ้น
          </p>
        </section>
      </main>
    </div>
  );
};

export default CodeSmell;
