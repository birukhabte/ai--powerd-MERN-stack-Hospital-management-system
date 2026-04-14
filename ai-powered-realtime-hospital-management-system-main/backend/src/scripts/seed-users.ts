import dotenv from "dotenv";

dotenv.config();

const API_URL = process.env.BETTER_AUTH_URL || "http://localhost:5000";

// Test users for each role
const testUsers = [
  {
    name: "Admin User",
    email: "admin@hospital.com",
    password: "admin123",
    role: "admin",
    status: "active",
  },
  {
    name: "Dr. John Smith",
    email: "doctor@hospital.com",
    password: "doctor123",
    role: "doctor",
    specialization: "Cardiology",
    department: "Cardiology",
    status: "active",
  },
  {
    name: "Nurse Sarah Johnson",
    email: "nurse@hospital.com",
    password: "nurse123",
    role: "nurse",
    department: "Emergency",
    status: "active",
  },
  {
    name: "Pharmacist Mike Brown",
    email: "pharmacist@hospital.com",
    password: "pharmacist123",
    role: "pharmacist",
    department: "Pharmacy",
    status: "active",
  },
  {
    name: "Lab Tech Emily Davis",
    email: "labtech@hospital.com",
    password: "labtech123",
    role: "lab_tech",
    department: "Laboratory",
    status: "active",
  },
  {
    name: "Patient Jane Doe",
    email: "patient@hospital.com",
    password: "patient123",
    role: "patient",
    age: "35",
    gender: "Female",
    bloodgroup: "O+",
    status: "active",
  },
];

async function seedUsers() {
  try {
    console.log("🔄 Creating test users via Better Auth API...\n");

    for (const userData of testUsers) {
      try {
        const response = await fetch(`${API_URL}/api/auth/sign-up/email`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: userData.email,
            password: userData.password,
            name: userData.name,
            role: userData.role,
            specialization: userData.specialization,
            department: userData.department,
            age: userData.age,
            gender: userData.gender,
            bloodgroup: userData.bloodgroup,
            status: userData.status,
          }),
        });

        if (response.ok) {
          console.log(`✅ Created ${userData.role}: ${userData.email}`);
        } else {
          const error = await response.json();
          if (error.message?.includes("already exists") || error.message?.includes("duplicate")) {
            console.log(`⚠️  User already exists: ${userData.email} (${userData.role})`);
          } else {
            console.error(`❌ Failed to create ${userData.email}:`, error.message || error);
          }
        }
      } catch (error: any) {
        console.error(`❌ Failed to create ${userData.email}:`, error.message);
      }
    }

    console.log("\n📋 Test User Credentials:");
    console.log("=".repeat(60));
    testUsers.forEach((user) => {
      console.log(`\n${user.role.toUpperCase()}`);
      console.log(`  Email:    ${user.email}`);
      console.log(`  Password: ${user.password}`);
    });
    console.log("\n" + "=".repeat(60));

    console.log("\n✨ Seeding completed successfully!");
    process.exit(0);
  } catch (error) {
    console.error("❌ Seeding failed:", error);
    process.exit(1);
  }
}

// Wait a bit for server to be ready
setTimeout(seedUsers, 2000);
