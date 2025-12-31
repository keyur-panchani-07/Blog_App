import mongoose from "mongoose";

export const ConnectDB = async () =>{
    await mongoose.connect('mongodb://localhost:27017/blog_app');
    console.log("DB Connected.")
}