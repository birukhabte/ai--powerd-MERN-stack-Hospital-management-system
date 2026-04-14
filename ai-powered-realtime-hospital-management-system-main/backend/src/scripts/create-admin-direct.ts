import { MongoClient, ObjectId } from "mongodb";
import dotenv from "dotenv";

dotenv.config();

const MONGO_URI = process.env.MONGO_URI || "";

async function createAdminDirect() {
  const client = new MongoClient(MONGO_URI);

  try {
    console.log("🔄 Connecting to MongoDB...");
    await client.connect();
    console.log("✅ Connected to MongoDB");
    
    const db = client.db();
    const userCollection = db.collection("user");
    const accountCollection = db.collection("account");

    console.log(`📊 Database: ${db.databaseName}\n`);

    // Check if admin already exists
    const existingUser = await userCollection.findOne({ email: "admin@hospital.com" });
    
    if (existingUser) {
      console.log("⚠️  Admin user already exists!");
      console.log("\n📋 Admin Credentials:");
      console.log("  Email:    admin@hospital.com");
      console.log("  Password: admin123");
      
      // Check if account exists
      const existingAccount = await accountCollection.findOne({ 
        userId: existingUser._id.toString() 
      });
      
      if (!existingAccount) {
        console.log("\n⚠️  Account record missing! Creating it...");
        
        // Hash password using Bun
        const hashedPassword = await Bun.password.hash("admin123");
        
        await accountCollection.insertOne({
          userId: existingUser._id.toString(),
          accountId: "admin@hospital.com",
          providerId: "credential",
          password: hashedPassword,
          createdAt: new Date(),
          updatedAt: new Date(),
        });
        
        console.log("✅ Account record created!");
      }
      
      await client.close();
      process.exit(0);
    }

    console.log("👤 Creating admin user...\n");

    // Hash password using Bun's built-in password hashing
    const hashedPassword = await Bun.password.hash("admin123");

    // Create user document
    const userId = new ObjectId();
    const userDoc = {
      _id: userId,
      name: "Admin User",
      email: "admin@hospital.com",
      emailVerified: true,
      image: null,
      role: "admin",
      createdAt: new Date(),
      updatedAt: new Date(),
      banned: false,
      banReason: null,
      banExpires: null,
      status: "active",
      specialization: null,
      department: null,
      gender: null,
      bloodgroup: null,
      age: null,
      medicalHistory: null,
      prescriptions: [],
      appointments: [],
    };

    await userCollection.insertOne(userDoc);
    console.log("✅ User record created in 'user' collection");

    // Create account document for email/password auth
    const accountDoc = {
      userId: userId.toString(),
      accountId: "admin@hospital.com",
      providerId: "credential",
      password: hashedPassword,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    await accountCollection.insertOne(accountDoc);
    console.log("✅ Account record created in 'account' collection");

    console.log("\n📋 Admin Credentials:");
    console.log("  Email:    admin@hospital.com");
    console.log("  Password: admin123");
    console.log("  Role:     admin");

    console.log("\n✨ Admin user created successfully!");
    console.log("\nYou can now login at: http://localhost:5173/login");

    await client.close();
    console.log("\n🔌 Database connection closed");
    process.exit(0);
  } catch (error) {
    console.error("❌ Failed to create admin:", error);
    await client.close();
    process.exit(1);
  }
}

createAdminDirect();
