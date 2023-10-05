import { User } from '../model/User';
import { message } from '../model/message';
import { UserRepository } from "../repo/User";
import { MessageDB } from '../repo/message';
const pgp = require("pg-promise")();
require("dotenv").config();
const dbConfig = {
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
};
const db = pgp(dbConfig);
export class ServiceMessage {
    messageDB = new MessageDB();
    trepoclient = new UserRepository();

  constructor(messageDB:MessageDB ) {
    this.messageDB = messageDB;
  }
 
 async suppparmoi(req: any, res: any) {
    const postId = req.params.id;
    try{
        const result=await this.messageDB.deleteMessagemoi(postId);
        if(result){
            return  req.status(200).send(result);
        }
        else throw new Error("impossible");
        

    }catch(e){
        return req.status(500).send(e);
    }
  }
  async updatemssage(req:any,res:any){
   try{
    const msg:message=  req.body as message;
  const user1=  this.trepoclient.getUserById(msg.senderId)
  const user2 =this.trepoclient.getUserById(msg.receiverId)
if(!user1 || !user2 ){
    return req.status(500).send("usersnotfound")
}
req.params.id
const mes =this.messageDB.getMessageById(req.params.id)
if(!mes) return req.status(500).send("msg not found")

const result=await this.messageDB.updateMessage(req.params.id,msg  )
if(result){
    return req.status.send(result)
}else{
    throw new Error("impossible");
}
   }catch(e){
    return req.status(500).send(e)
   }
  }
 async getmsgby2user(req:any,res:any){
    try{
        const msg:message=  req.body as message;
        const user1=  this.trepoclient.getUserById(msg.senderId)
        const user2 =this.trepoclient.getUserById(msg.receiverId)
      if(!user1 || !user2 ){
          return req.status(500).send("usersnotfound")
      }
   const data=   await this.messageDB.getAmisBy2user(msg.senderId,msg.receiverId)
   return req.status(200).send(data)
    }
    catch(e){
        return res.status(500).send("errer")
    }
   
  
  }
  
}
