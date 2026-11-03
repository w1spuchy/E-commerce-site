import type { Request, Response } from "express";
import bcrypt from "bcrypt";
import { prisma } from "../lib/prisma.js";

async function registration(req: Request, res: Response) {
    try
    {
        const {email, password} = req.body;
        const candidate = await prisma.user.findFirst( {where: {email: email} });
        if(candidate)
        {
            return res.status(400).json({message: "The user with this email already exists"});
        }

        const passwordHash = await bcrypt.hash(password, 10);        
        const newUser = await prisma.user.create({
            data:{
                email: email,
                passwordHash: passwordHash,
                cart: {create: {}}
            },
            select:{
                id: true,
                email: true,
                role: true
            }
        })

        res.status(200).json({
            "registrationStatus": "ok",
            "User": newUser
        })
    }
    catch(e)
    {
        console.log(e)
        res.status(400).json({message: "Registration error"})
    }
}

async function login(req: Request, res: Response) {
    try
    {

    }
    catch(e)
    {
        console.log(e)
        res.status(400).json({message: "Login error"})
    }
}

export { registration, login}
