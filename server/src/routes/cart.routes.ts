import Router from "express"
const router = Router();

router.get("/", (req, res) => {
    res.json({ "cartItems": [] })
})

export default router;