import type { Request, Response, NextFunction } from "express";
import { validationResult } from "express-validator";

export function handleValidation(req: Request, res: Response, next: NextFunction)
{
    const result = validationResult(req);

    if(!result.isEmpty())
    {
        const errors = result.array().map((e) => { 
            return { location: e.type === "field" ? e.path : e.type, message: e.msg}
        })
        return res.status(400).json({
            message: "Validation errors",
            errors: errors
        })
    }

    next()
}