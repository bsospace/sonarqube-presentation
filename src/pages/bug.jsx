import CodeExample from "../components/code-example";

const Bug = () => {
  const exampleCode = `
const numbers = [1, 2, 3];
// Undefined, เกินขอบเขต array
console.log(numbers[3]); 
`;

  const description =
    "ข้อผิดพลาดนี้เกิดจากการเข้าถึง index ที่เกินขอบเขตของ array ซึ่งในกรณีนี้ array มีขนาด 3 " +
    "(index 0-2) แต่พยายามเข้าถึง index 3 ส่งผลให้ค่าเป็น `undefined` และอาจทำให้โปรแกรมทำงานผิดพลาดได้.";

  const thaiDescription = `
ปัญหานี้เกิดจากการพยายามเข้าถึง index ที่ไม่มีอยู่ใน array ตัวอย่างเช่น array ที่ชื่อว่า numbers มีขนาด 3 
ซึ่ง index ที่ใช้งานได้คือ 0, 1 และ 2 แต่ตัวอย่างนี้พยายามเข้าถึง index ที่ 3 ซึ่งไม่มีข้อมูล ทำให้โปรแกรมคืนค่า undefined 
ซึ่งหากโค้ดพยายามใช้ค่าดังกล่าวโดยไม่ตรวจสอบ อาจทำให้เกิดข้อผิดพลาดในการทำงานได้.
`;

  return (
    <div className="py-8 px-4">
      <header className="mb-8 text-center">
        <h2 className="text-3xl font-bold text-blue-600">ข้อผิดพลาด (Bugs)</h2>
        <p className="text-gray-600">ตัวอย่างข้อผิดพลาดในการเขียนโปรแกรม</p>
      </header>
      <main>
        <section className="mb-8">
          <h3 className="text-2xl font-semibold text-red-500">รายละเอียดข้อผิดพลาด</h3>
          <p className="text-gray-700">{thaiDescription}</p>
        </section>
        <CodeExample code={exampleCode} language="javascript" description={description} />
        <section className="mt-8">
          <h3 className="text-2xl font-semibold text-green-600">วิธีการป้องกัน</h3>
          <p className="text-gray-700">
            วิธีการป้องกันข้อผิดพลาดนี้คือการตรวจสอบขอบเขตของ array ก่อนการเข้าถึงข้อมูล ตัวอย่างเช่น:
          </p>
          <CodeExample
            code={`
const numbers = [1, 2, 3];
if (numbers.length > 3) {
  console.log(numbers[3]);
} else {
  console.log("Index ไม่อยู่ในขอบเขตของ array");
}
`}
            language="javascript"
            description="ตัวอย่างการตรวจสอบขอบเขตก่อนการเข้าถึง array"
          />
          <p className="text-gray-700 mt-4">
            การเขียนโค้ดในลักษณะนี้ช่วยลดความเสี่ยงจากข้อผิดพลาดและทำให้โค้ดมีความปลอดภัยมากยิ่งขึ้น.
          </p>
        </section>
      </main>
    </div>
  );
};

export default Bug;
