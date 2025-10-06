import mongoose from "mongoose";

export const connectDB = async () => {
    try{
        await mongoose.connect(process.env.MONGO_URI as string);
        console.log("Connected to the database");
    }catch(error:any){
        console.error("Error connecting to the database", error);
        throw new Error(error);
    };
};