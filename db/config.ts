import mongoose from "mongoose";

export const DBConnection = async (): Promise<void> => {
    try {
        const dbUrl = process.env.DB_URL || "";
        if (!dbUrl) {
            throw new Error("La URL de la base de datos no está configurada en el archivo .env");
        }

        await mongoose.connect(dbUrl, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            serverSelectionTimeoutMS: 10000, // Tiempo de espera para conectarse al servidor
        });

        console.log("Conexión exitosa a la base de datos");
    } catch (error) {
        console.error("Error al conectar con la base de datos:", error);
        process.exit(1); // Finaliza el proceso si no se puede conectar
    }
};