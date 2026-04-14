import dotenv from "dotenv";

dotenv.config();

const API_URL = "http://localhost:5001";

async function createAdmin() {
  try {
    console.log("🔄 Creating admin user via signup API...\n");

    // Create admin user
    const signupResponse = await fetch(`${API_URL}/api/auth/sign-up/email`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: "admin@hospital.com",
        password: "Admin@123456",
        name: "Admin User",
      }),
    });

    const signupData = await signupResponse.json();
    
    if (signupResponse.ok) {
      console.log("✅ Admin user created successfully!");
      console.log("\n📋 Admin Credentials:");
      console.log("  Email:    admin@hospital.com");
      console.log("  Password: Admin@123456");
      console.log("\n⚠️  Note: You need to manually update the role to 'admin' in the database");
      console.log("     or use the admin panel after logging in.");
    } else {
      console.log("❌ Signup failed!");
      console.log("Error:", JSON.stringify(signupData, null, 2));
      
      if (signupData.message?.includes("already exists")) {
        console.log("\n✅ User already exists. Try logging in with:");
        console.log("  Email:    admin@hospital.com");
        console.log("  Password: Admin@123456");
      }
    }

    process.exit(0);
  } catch (error) {
    console.error("❌ Failed to create admin:", error);
    process.exit(1);
  }
}

setTimeout(createAdmin, 1000);
