// src/demo/bugs.js

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
