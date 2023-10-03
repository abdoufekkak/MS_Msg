import { User } from "../model/User";
import { UserRepository } from "../repo/User"; 

const pgp = require('pg-promise')();
require('dotenv').config(); 
const dbConfig = {
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
};
const db = pgp(dbConfig);
export class ServiceUser {
     repoclient = new UserRepository ()

    async createUser(req: any,res:any) {
      return req.status(200).send(this.repoclient.GetAllUser())
      }
     
      
}
