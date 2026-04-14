import dotenv from "dotenv";

dotenv.config();

async function test() {
  try {
    // Try signup with detailed error
    const response = await fetch("http://localhost:5001/api/auth/sign-up/email", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: "testuser@test.com",
        password: "TestPassword123!",
        name: "Test User"
      })
    });

    console.log("Status:", response.status);
    const text = await response.text();
    console.log("Response:", text);

    if (response.ok) {
      // Try login
      const loginRes = await fetch("http://localhost:5001/api/auth/sign-in/email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: "testuser@test.com",
          password: "TestPassword123!"
        })
      });
      
      console.log("\nLogin Status:", loginRes.status);
      console.log("Login Response:", await loginRes.text());
    }
  } catch (e) {
    console.error("Error:", e);
  }
}

setTimeout(test, 1000);
