import express from "express"
import "dotenv/config"
import productRoutes from "./routes/products.routes.js";
import cartRoutes from "./routes/cart.routes.js"


const app = express();
app.use(express.json());


app.get("/status", (req, res) => {
    res.json({ "Status": "ok" })
})


app.use("/api/products", productRoutes)
app.use("/api/cart", cartRoutes)


const PORT = Number(process.env.PORT ?? 3000);
app.listen(PORT, () => {
        console.log(`Server running on port: ${PORT}`);
});

