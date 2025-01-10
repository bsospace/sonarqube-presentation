// ตัวอย่าง Technical Debt: การแก้ปัญหาชั่วคราว
function fetchData() {
    return fetch('/api/data').then((res) => res.json());
    // ขาด Error Handling
  }
  