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
  repoclient = new UserRepository();
  constructor(repoclient: MessageDB) {
    this.messageDB = repoclient;
  }
  async save(req: any, res: any) {
    const user2 = (await this.repoclient.getUserById(
      req.body.receiverId
    )) as User;
    const user1 = (await this.repoclient.getUserById(
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
    const user2 = (await this.repoclient.getUserById(
      usr_receiver
    )) as User;
    const user1 = (await this.repoclient.getUserById(
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
}
