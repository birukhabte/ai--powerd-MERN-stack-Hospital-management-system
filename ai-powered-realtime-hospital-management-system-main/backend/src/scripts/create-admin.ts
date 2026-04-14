import dotenv from "dotenv";

dotenv.config();

const API_URL = process.env.BETTER_AUTH_URL || "http://localhost:5000";

async function createAdmin() {
  try {
    console.log("🔄 Creating admin user...\n");

    // First, create the user via signup
    const signupResponse = await fetch(`${API_URL}/api/auth/sign-up/email`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: "admin@hospital.com",
        password: "admin123",
        name: "Admin User",
      }),
    });

    if (!signupResponse.ok) {
      const error = await signupResponse.json();
      console.error("❌ Signup failed:", error);
      
      // Try to login instead (user might already exist)
      console.log("\n🔄 Trying to login instead...");
      const loginResponse = await fetch(`${API_URL}/api/auth/sign-in/email`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: "admin@hospital.com",
          password: "admin123",
        }),
      });

      if (loginResponse.ok) {
        console.log("✅ Admin user already exists and login successful!");
        console.log("\n📋 Admin Credentials:");
        console.log("  Email:    admin@hospital.com");
        console.log("  Password: admin123");
        process.exit(0);
      } else {
        console.error("❌ Login also failed");
        process.exit(1);
      }
    }

    const userData = await signupResponse.json();
    console.log("✅ User created:", userData);

    console.log("\n📋 Admin Credentials:");
    console.log("  Email:    admin@hospital.com");
    console.log("  Password: admin123");
    console.log("\n✨ Admin user created successfully!");
    console.log("\nℹ️  Note: You may need to manually set the role to 'admin' in the database.");
    
    process.exit(0);
  } catch (error) {
    console.error("❌ Failed to create admin:", error);
    process.exit(1);
  }
}

// Wait for server to be ready
setTimeout(createAdmin, 2000);
