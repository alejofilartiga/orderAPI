import mongoose from "mongoose";

export const DBConnection = async (): Promise<void> => {
    try {
        const dbUrl = process.env.DB_URL;
        if (!dbUrl) {
            throw new Error("La Url no esta definida en los .ENV");
        }
        await mongoose.connect(dbUrl, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("Database Online");
    } catch (error) {
        console.log(error);
        throw new Error("Error al iniciar la DB");
    }
};