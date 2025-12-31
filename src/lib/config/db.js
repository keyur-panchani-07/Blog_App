import mongoose from "mongoose";

export const ConnectDB = async () => {
    if (mongoose.connection.readyState >= 1) {
        return;
    }
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/blog_app');
    console.log("DB Connected.");
}