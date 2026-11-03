import { Router } from "express";
import { prisma } from "../lib/prisma.js";
const router = Router();


router.get('/', async (req, res) => {
    const products = await prisma.product.findMany()

    res.json({ "products": products });
})

export default router