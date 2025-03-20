// ตัวอย่าง Technical Debt: การแก้ปัญหาชั่วคราว
function fetchData() {
    return fetch('/api/data').then((res) => res.json());
    // ขาด Error Handling
  }
  

const API_KEY = "12345-abcdef";
fetch(`https://api.example.com/data?key=${API_KEY}`);


if (user.age >= 18) {
  console.log("User is an adult");
}

setTimeout(() => {
  console.log("Assuming API responded");
}, 3000);


if (user) {
  if (user.isActive) {
      if (user.isAdmin) {
          console.log("Admin user is active");
      }
  }
}
