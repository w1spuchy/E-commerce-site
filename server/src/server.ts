import express from "express"
import "dotenv/config"
import productRoutes from "./routes/products.routes.js"
import cartRoutes from "./routes/cart.routes.js"
import authRouter from "./routes/auth.routes.js"


const app = express();
app.use(express.json());


app.get("/status", (req, res) => {
    res.json({ "Status": "ok" })
})


app.use("/api/products", productRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/auth", authRouter);


const PORT = Number(process.env.PORT ?? 3000);
app.listen(PORT, () => {
        console.log(`Server running on port: ${PORT}`);
});

