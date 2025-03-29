import express from "express";
import { connectMongoDB } from "./config/mongoDB.config.js";
import session from "express-session";  
import routes from "./routes/index.js";
import envsConfig from "./config/env.config.js";
import cookieParser from "cookie-parser";


const app = express();

connectMongoDB();



app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));



app.use(
  session({
    secret: envsConfig.SESSION_SECRET,
    resave: true, // Evita guardar la sesión si no hay cambios
    saveUninitialized: true, // Guarda sesiones vacías
    cookie: { secure: false, maxAge: 500000 }, // Debe estar en true si usas HTTPS
  })
);

app.use(cookieParser());

// Rutas de la api
app.use("/api", routes);

// Ruta para manejar errores 404
app.use((req, res) => {
  res.status(404).json({ error: "Recurso no encontrado" });
});

app.listen(envsConfig.PORT, () => {
  console.log(`Servidor escuchando en el puerto ${envsConfig.PORT}`);
});
