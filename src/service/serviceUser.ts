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
constructor(repoclient:UserRepository){
  this.repoclient=repoclient
}
      users(req:any,res:any) {
    this.repoclient.GetAllUser().then(e=> {
    return res.status(200).send(e)}
       ).catch(err=>console.log("Qwert"))
    
      }
    
    
    
      
}
