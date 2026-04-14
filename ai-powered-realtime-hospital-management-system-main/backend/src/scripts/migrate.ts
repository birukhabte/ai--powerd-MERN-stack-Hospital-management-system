import mongoose from "mongoose";
import dotenv from "dotenv";
import ActivityLog from "../models/activityLog";
import Invoice from "../models/invoice";
import LabResult from "../models/labResults";
import Notification from "../models/notification";

dotenv.config();

const MONGO_URI = process.env.MONGO_URI || "";

async function migrate() {
  try {
    console.log("🔄 Connecting to MongoDB...");
    console.log(`📍 URI: ${MONGO_URI.substring(0, 30)}...`);
    
    await mongoose.connect(MONGO_URI);
    console.log("✅ Connected to MongoDB");
    console.log(`📊 Database: ${mongoose.connection.db.databaseName}`);

    // Create collections by ensuring indexes
    console.log("\n📦 Creating collections...");

    // Activity Logs Collection
    try {
      await ActivityLog.createCollection();
      console.log("✅ ActivityLog collection created");
    } catch (err: any) {
      if (err.code === 48) {
        console.log("ℹ️  ActivityLog collection already exists");
      } else {
        throw err;
      }
    }

    // Invoice Collection
    try {
      await Invoice.createCollection();
      console.log("✅ Invoice collection created");
    } catch (err: any) {
      if (err.code === 48) {
        console.log("ℹ️  Invoice collection already exists");
      } else {
        throw err;
      }
    }

    // Lab Results Collection
    try {
      await LabResult.createCollection();
      console.log("✅ LabResult collection created");
    } catch (err: any) {
      if (err.code === 48) {
        console.log("ℹ️  LabResult collection already exists");
      } else {
        throw err;
      }
    }

    // Notification Collection
    try {
      await Notification.createCollection();
      console.log("✅ Notification collection created");
    } catch (err: any) {
      if (err.code === 48) {
        console.log("ℹ️  Notification collection already exists");
      } else {
        throw err;
      }
    }

    // List all collections
    const collections = await mongoose.connection.db.listCollections().toArray();
    console.log("\n📋 Available collections in database:");
    collections.forEach((col) => {
      console.log(`   - ${col.name}`);
    });

    console.log("\n✨ Migration completed successfully!");
    
    await mongoose.connection.close();
    console.log("🔌 Database connection closed");
    process.exit(0);
  } catch (error) {
    console.error("❌ Migration failed:", error);
    await mongoose.connection.close();
    process.exit(1);
  }
}

migrate();
