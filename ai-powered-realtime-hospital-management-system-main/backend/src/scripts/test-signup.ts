import dotenv from "dotenv";

dotenv.config();

const API_URL = "http://localhost:5001";

async function testSignup() {
  try {
    console.log("🔄 Testing signup...\n");

    const response = await fetch(`${API_URL}/api/auth/sign-up/email`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: "test@hospital.com",
        password: "test123456",
        name: "Test User",
      }),
    });

    const data = await response.json();
    
    if (response.ok) {
      console.log("✅ Signup successful!");
      console.log("Response:", JSON.stringify(data, null, 2));
    } else {
      console.log("❌ Signup failed!");
      console.log("Error:", JSON.stringify(data, null, 2));
    }

    // Try to login
    console.log("\n🔄 Testing login...\n");
    
    const loginResponse = await fetch(`${API_URL}/api/auth/sign-in/email`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: "test@hospital.com",
        password: "test123456",
      }),
    });

    const loginData = await loginResponse.json();
    
    if (loginResponse.ok) {
      console.log("✅ Login successful!");
      console.log("Response:", JSON.stringify(loginData, null, 2));
    } else {
      console.log("❌ Login failed!");
      console.log("Error:", JSON.stringify(loginData, null, 2));
    }

    process.exit(0);
  } catch (error) {
    console.error("❌ Test failed:", error);
    process.exit(1);
  }
}

setTimeout(testSignup, 1000);
