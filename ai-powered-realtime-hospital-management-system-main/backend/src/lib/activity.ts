import ActivityLog from "../models/activityLog";

export const logActivity = async (
  userId: string,
  action: string,
  details: string,
) => {
  try {
    await ActivityLog.create({ user: userId, action, details });
  } catch (error) {
    console.error("Error logging activity:", error);
  }
};
// Updated on 2026-04-14
// Updated on 2026-04-14
