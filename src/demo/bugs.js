// ตัวอย่าง Bug
const value = NaN;
if (value === NaN) { // ❌ ผิด: "NaN" ไม่สามารถตรวจสอบด้วยการเปรียบเทียบโดยตรง
    console.log("Value is NaN");
}
