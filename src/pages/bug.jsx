import CodeExample from "../components/code-example";

const Bug = () => {
  const exampleCode = `
// 1. "delete" should be used only with object properties
const numbers = [1, 2, 3];
delete numbers[1]; // ❌ ผิด: "delete" ควรใช้กับ properties ของ object เท่านั้น
console.log(numbers); // [1, <empty>, 3]

// 2. "in" should not be used with primitive types
const value = 42;
if ("toString" in value) { // ❌ ผิด: "in" ควรใช้กับ objects เท่านั้น
    console.log("toString exists in value");
}

// 3. "NaN" should not be used in comparisons
const num = NaN;
if (num === NaN) { // ❌ ผิด: "NaN" ไม่สามารถตรวจสอบด้วยการเปรียบเทียบโดยตรง
    console.log("Number is NaN");
}

// 4. "new" operators should be used with functions
const result = new Math(); // ❌ ผิด: Math ไม่ใช่ constructor function

// 5. "super()" should be invoked appropriately
class Parent {
    constructor(name) {
        this.name = name;
    }
}

class Child extends Parent {
    constructor(name) {
        super(); // ❌ ผิด: ต้องส่ง parameter ให้ super()
        this.name = name;
    }
}

// 6. "typeof" expressions should only be compared to valid values
const unknown = "hello";
if (typeof unknown === "strnig") { // ❌ ผิด: "strnig" เป็นค่าไม่ถูกต้อง
    console.log("It's a string");
}

// 7. "with" statements should not be used
const obj = { a: 1, b: 2 };
with (obj) { // ❌ ผิด: with ทำให้โค้ดอ่านยากและเกิดปัญหา scope
    console.log(a);
}

// 8. A "for" loop update clause should move the counter in the right direction
for (let i = 0; i < 5; i--) { // ❌ ผิด: counter ลดลงแทนที่จะเพิ่มขึ้น
    console.log(i);
}

// 9. A compare function should be provided when using "Array.prototype.sort()"
const unsortedNumbers = [10, 1, 2];
unsortedNumbers.sort(); // ❌ ผิด: sort() เรียงตาม lexicographical order โดย default
console.log(unsortedNumbers); // ["1", "10", "2"]

// 10. All branches in a conditional structure should not have exactly the same implementation
const threshold = 10;
if (threshold > 10) {
    console.log("Do something"); // ❌ ผิด: ทั้งสอง branch ทำเหมือนกัน
} else {
    console.log("Do something");
}
`;

  const description =
    "ตัวอย่างโค้ดนี้แสดงข้อผิดพลาดทั่วไปที่เกิดขึ้นใน JavaScript เช่น การใช้ `delete` กับ array, " +
    "การใช้ `in` กับ primitive types, การเปรียบเทียบ NaN อย่างไม่ถูกต้อง และการเรียงลำดับ array โดยไม่มี compare function.";

  const thaiDescription = `
โค้ดนี้มีตัวอย่างข้อผิดพลาดที่เกิดขึ้นบ่อยใน JavaScript เช่น:
1. การใช้คำสั่ง \`delete\` กับ array ซึ่งไม่ถูกต้อง
2. การตรวจสอบ \`in\` กับ primitive types ซึ่งควรใช้กับ objects เท่านั้น
3. การเปรียบเทียบ \`NaN\` ซึ่งไม่สามารถตรวจสอบด้วยการเปรียบเทียบโดยตรง
4. การเรียกใช้งาน \`super()\` โดยไม่ส่ง parameter ที่จำเป็น
5. การใช้คำสั่ง \`with\` ซึ่งเป็น anti-pattern
6. การใช้งาน \`typeof\` เปรียบเทียบกับค่าที่ไม่ถูกต้อง
7. การใช้ \`for\` loop ที่ counter ไม่ทำงานตามที่คาด
8. การเรียงลำดับ array โดยไม่มี compare function ทำให้ผลลัพธ์ผิดพลาด
9. การมี branch ที่มี logic เหมือนกัน ซึ่งทำให้โค้ดอ่านยากและไม่มีประโยชน์
`;

  return (
    <div className="py-8 px-4">
      <header className="mb-8 text-center">
        <h2 className="text-3xl font-bold text-blue-600">ตัวอย่างข้อผิดพลาด (Bugs)</h2>
        <p className="text-gray-600">ตัวอย่างข้อผิดพลาดที่พบบ่อยใน JavaScript</p>
      </header>
      <main>
        <section className="mb-8">
          <h3 className="text-2xl font-semibold text-red-500">รายละเอียดข้อผิดพลาด</h3>
          <p className="text-gray-700">{thaiDescription}</p>
        </section>
        <CodeExample code={exampleCode} language="javascript" description={description} />
        <section className="mt-8">
          <h3 className="text-2xl font-semibold text-green-600">วิธีการแก้ไข</h3>
          <p className="text-gray-700">
            ข้อผิดพลาดเหล่านี้สามารถแก้ไขได้โดยการตรวจสอบ logic ของโค้ด การปฏิบัติตาม best practices
            และการใช้วิธีการที่เหมาะสมสำหรับแต่ละกรณี เช่น:
          </p>
          <ul className="list-disc list-inside text-gray-700 mt-4">
            <li>หลีกเลี่ยงการใช้ <code>delete</code> กับ array และใช้ <code>splice</code> แทน</li>
            <li>ตรวจสอบชนิดของค่าด้วย <code>typeof</code> และเปรียบเทียบกับค่าที่ถูกต้อง</li>
            <li>เขียน function เปรียบเทียบสำหรับ <code>Array.prototype.sort</code> เพื่อให้ผลลัพธ์ถูกต้อง</li>
          </ul>
        </section>
      </main>
    </div>
  );
};

export default Bug;
