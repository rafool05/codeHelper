import { NextFunction,Request,Response } from "express";
import { signupSchema } from "../validation/signup.types";
import { ZodError } from "zod";

export async function validateInput(req:Request, res : Response, next : NextFunction){
    try{
        const username = req.body.username;
        const password = req.body.password;
        const email = req.body.email;
        await signupSchema.parseAsync({username,password,email})
        next();
    }
    catch (err : unknown) {
        // console.log(err)
        if (err instanceof ZodError) {
            res.status(400).json({
                errors: err.issues.map(({ message } ) => ({
                    message,
                })),
            });
        }
        else{
            res.status(400).json({
                errors : [{message:"This should not be returned"}]
            })
        }
    }
}