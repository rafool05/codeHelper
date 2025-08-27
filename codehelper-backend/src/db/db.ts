import { fromUint8Array } from "js-base64";
import { model, Schema, Types } from "mongoose";
import * as Y from 'yjs'
function randomizer(len : number) : string {
    let ans : string = "";
    let letters : string = "qwertyuiopasdfghjlzxcvbnm1234567890"
    for(let i = 0; i < len; i++){
        ans += (letters[Math.floor(Math.random() * letters.length)])
    }
    return ans
}
const langDefaults = {
  javascript: `console.log("Hello, World!");`,
  python: `print("Hello, World!")`,
  go: `package main
import "fmt"

func main() {
    fmt.Println("Hello, World!")
}`,
  rust: `fn main() {
    println!("Hello, World!");
}`,
  c: `#include <stdio.h>

int main() {
   printf("Hello, World!\\n");
   return 0;
}`,
  cpp: `#include <iostream>

int main() {
    std::cout << "Hello, World!" << std::endl;
    return 0;
}`,
  java: `public class HelloWorld {
    public static void main(String[] args) {
        System.out.println("Hello, World!");
    }
}`,
};
const ydocDefault = new Y.Doc();
ydocDefault.getMap("sharedstate").set('lang','javascript');
ydocDefault.getMap("sharedstate").set('content',langDefaults)
ydocDefault.getMap('sharedstate').set('permission',{})
const defEncoding = fromUint8Array(Y.encodeStateAsUpdate(ydocDefault));
const roomSchema = new Schema({
  title : {type : String,require:true},
  user : {type : Types.ObjectId, ref: 'User'},
  joinedUsers : {type : [Types.ObjectId], ref : 'User'},
  date : {type : Date},
  hash : {type : String,default:()=>randomizer(20)},
  ydoc : {type : typeof defEncoding, default: Buffer.from(defEncoding)}
})
const userSchema = new Schema({
  username : {type : String, required : true,unique:true},    
  email : {type : String, required : true,unique:true},
  password : {type : String, required : true},
  rooms : {type : [Types.ObjectId],ref : 'Room',default:[] },
  joinedRooms : {type : [Types.ObjectId],ref : 'Room',default:[] },
})
export const Room  = model('Room',roomSchema)
export const User = model('User',userSchema)