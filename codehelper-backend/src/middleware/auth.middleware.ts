import cookieParser = require("cookie-parser");
import express,{ NextFunction, Request,Response}  from "express"
import jwt, { JwtPayload } from 'jsonwebtoken'
import 'dotenv/config'
const JWT_SECRET : string = process.env.JWT_SECRET as string
import e = require("express");
const app = e()
app.use(express.json())
app.use(cookieParser())
export function auth(req:Request, res : Response, next : NextFunction){
    const token = req.cookies.token
    // console.log(token)
    try{
        const userId =  (jwt.verify(token,JWT_SECRET) as JwtPayload);
        req.body = req.body || {}
        req.body.username = userId.username;
        req.body.email = userId.email;
        req.body._id = userId._id;
        next()
    }
    catch(e){
        res.status(403).json({
            errors : [{message:"Not Authenticated"}]
        })
    }
}