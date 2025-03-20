import CodeExample from "../components/code-example";

const Bug = () => {
  const exampleCode = `
// 1. \"eval()\" should not be used
//  Vulnerability: การใช้ eval() อาจทำให้เกิดช่องโหว่ code injection
//  โค้ดที่ไม่ปลอดภัย:
eval("console.log('Hello, World!')");

//  โค้ดที่ปลอดภัยกว่า:
const safeFunction = new Function("console.log('Hello, World!')");
safeFunction();

// 2. \"in\" should not be used with primitive types
const value = 42;
if ("toString" in value) { //  ผิด: \"in\" ควรใช้กับ objects เท่านั้น
    console.log("toString exists in value");
}

//  วิธีที่ถูกต้อง:
if (typeof value.toString === "function") {
    console.log("toString exists in value");
}

// 3. \"NaN\" should not be used in comparisons
const num = NaN;
if (num === NaN) { //  ผิด: \"NaN\" ไม่สามารถตรวจสอบด้วยการเปรียบเทียบโดยตรง
    console.log("Number is NaN");
}

//  วิธีที่ถูกต้อง:
if (Number.isNaN(num)) {
    console.log("Number is NaN");
}

// 4. \"new\" operators should be used with functions
const result = new Math(); //  ผิด: Math ไม่ใช่ constructor function

//  วิธีที่ถูกต้อง:
const randomNumber = Math.random();

// 5. \"super()\" should be invoked appropriately
class Parent {
    constructor(name) {
        this.name = name;
    }
}

class Child extends Parent {
    constructor(name) {
        super(name); //  ถูกต้อง: ต้องส่ง parameter ให้ super()
        this.name = name;
    }
}

// 6. \"typeof\" expressions should only be compared to valid values
const unknown = "hello";
if (typeof unknown === "strnig") { //  ผิด: \"strnig\" เป็นค่าไม่ถูกต้อง
    console.log("It's a string");
}

//  วิธีที่ถูกต้อง:
if (typeof unknown === "string") {
    console.log("It's a string");
}

// 7. \"with\" statements should not be used
const obj = { a: 1, b: 2 };
with (obj) { //  ผิด: with ทำให้โค้ดอ่านยากและเกิดปัญหา scope
    console.log(a);
}

//  วิธีที่ถูกต้อง:
console.log(obj.a);

// 8. A \"for\" loop update clause should move the counter in the right direction
for (let i = 0; i < 5; i--) { //  ผิด: counter ลดลงแทนที่จะเพิ่มขึ้น
    console.log(i);
}

//  วิธีที่ถูกต้อง:
for (let i = 0; i < 5; i++) {
    console.log(i);
}

// 9. A compare function should be provided when using \"Array.prototype.sort()\"
const unsortedNumbers = [10, 1, 2];
unsortedNumbers.sort(); //  ผิด: sort() เรียงตาม lexicographical order โดย default

//  วิธีที่ถูกต้อง:
unsortedNumbers.sort((a, b) => a - b);
console.log(unsortedNumbers);

// 10. All branches in a conditional structure should not have exactly the same implementation
const threshold = 10;
if (threshold > 10) {
    console.log("Do something"); //  ผิด: ทั้งสอง branch ทำเหมือนกัน
} else {
    console.log("Do something");
}

//  วิธีที่ถูกต้อง:
if (threshold > 10) {
    console.log("Condition met: Threshold is greater than 10");
} else {
    console.log("Condition not met: Threshold is 10 or less");
}
`;

  const description =
    "ตัวอย่างโค้ดนี้แสดงข้อผิดพลาดที่พบบ่อยใน JavaScript และแนวทางการแก้ไข โดยรวมถึงการใช้ eval() อย่างไม่ปลอดภัย, " +
    "การใช้ 'in' กับ primitive types, การเปรียบเทียบ NaN ที่ผิดวิธี, และการใช้งานเงื่อนไขที่ไม่มีความแตกต่างกันอย่างแท้จริง";

  return (
    <div className="py-8 px-4">
      <header className="mb-8 text-center">
        <h2 className="text-3xl font-bold text-blue-600">ข้อผิดพลาดที่พบบ่อยใน JavaScript</h2>
        <p className="text-gray-600">ตัวอย่างข้อผิดพลาดและแนวทางการแก้ไข</p>
      </header>
      <main>
        <section className="mb-8">
          <h3 className="text-2xl font-semibold text-red-500">รายละเอียดข้อผิดพลาด</h3>
          <p className="text-gray-700">{description}</p>
        </section>
        <CodeExample code={exampleCode} language="javascript" description={description} />
      </main>
    </div>
  );
};

export default  Bug;