import { body } from "express-validator";

export const registrationValidator = 
[
    body("email")
        .notEmpty().withMessage("Email shouldn't be empty")
        .isString().withMessage("Email should be in string format")
        .trim()
        .isEmail().withMessage("Incorrect email format"),

    body("password")
    .notEmpty().withMessage("Password shouldn't be empty")
    .isString().withMessage("Password should be in string format")
    .isLength({min: 8, max: 72}).withMessage("Password should contain from 8 to 72 symbols")
    .matches(/^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]+$/).withMessage("Password should contain only latin letters and digits, including at least one uppercase letter and one digitPassword should contain only latin letters and digits, including at least one uppercase letter and one digit")
]