import mongoose from "mongoose";
export const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Connected to the database");
    }
    catch (error) {
        console.error("Error connecting to the database", error);
        throw new Error(error);
    }
    ;
};
//# sourceMappingURL=db.js.map