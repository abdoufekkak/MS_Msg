import { User } from "../model/User";
import { message } from "../model/message";
import { UserRepository } from "../repo/User";
import { MessageDB } from "../repo/message";
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
  constructor(repoclient: MessageDB) {
    this.messageDB = repoclient;
  }
  async save(req: any, res: any) {
    const user2 = (await this.trepoclient.getUserById(
      req.body.receiverId
    )) as User;
    const user1 = (await this.trepoclient.getUserById(
      req.body.senderId
    )) as User;
    if (user1 != null && user2 != null) {
      await this.messageDB
        .createMessage(req.body as message)
        .then((e) => {
          return res.status(200).send(e);
        })
        .catch((err) => console.log("Error in create User"));
    } else {
      return res.status(500).send("users not found");
    }
  }
  async delete_fo_all(req: any, res: any) {
    const message_id = req.params.id;
    if (message_id != null) {
      this.messageDB
        .deleteMessageAll(message_id)
        .then((e) => {
          return res.status(200).send(e);
        })
        .catch((err) => console.log(err));
    } else {
      return res.status(500).send("message not found");
    }
  }
  async transfer_msg(req: any, res: any) {
    const { msg_id, usr_receiver } = req.body;
    const message = await this.messageDB.getMessageById(msg_id);
    const user2 = (await this.trepoclient.getUserById(
      usr_receiver
    )) as User;
    const user1 = (await this.trepoclient.getUserById(
      message.senderId
    )) as User;
    if (!user1 || !user2 || !message ) {
      return res.status(500).send("users or message not found.");
      } else {
          this.messageDB
            .transferMessage(message,usr_receiver)
            .then((e) => {
              return res.status(200).send(e);
            })
            .catch((err) => console.log(err));
         
      }
    
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
