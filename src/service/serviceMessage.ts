import { User } from '../model/User';
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
  constructor(repoclient:MessageDB ) {
    this.messageDB = repoclient;
  }
 
  
}
