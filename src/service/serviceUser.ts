import { User } from '../model/User';
import { UserRepository } from "../repo/User";
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
export class ServiceUser {
  repoclient = new UserRepository();
  constructor(repoclient: UserRepository) {
    this.repoclient = repoclient;
  }
  users(req: any, res: any) {
    this.repoclient
      .GetAllUser()
      .then((e) => {
        return res.status(200).send(e);
      })
      .catch((err) => console.log("Qwert"));
  }

      

   async   getbyUsername(req:any,res:any){
    const username = req.params.id;

        const user2= await  (this.repoclient.getUserById(username)) as User;
        if(user2!=null){
          return res.status(500).send("this user existe")
        }else{
    res.status(200).send(user2)      }
    
        }
      
  supp(req: any, res: any) {}
  async update(req: any, res: any) {
    const postId = req.params.id;
    const user: User = req.body as User;
    const user2 = (await this.repoclient.getUserById(postId)) as User;
    if (user2 != null) {
      return res.status(500).send("this user existe");
    } else {
      const result = await this.repoclient.updateUser(postId, user);
      res.status(200).send(result);
    }
  }
  async save(req: any, res: any) {
    const user = await this.repoclient.getUserByUsername(req.body.username);
    if (user != null) {
      return res.status(500).send("this userName existe");
    } else {
      await this.repoclient
        .createUser(req.body as User)
        .then((e) => {
          return res.status(200).send(e);
        })
        .catch((err) => console.log("Error in create User"));
    }
  }
  async Filter(req: any, res: any) {
    try {
      const { age, adress } = req.body;
      
      const results: [User] = await this.repoclient.filterUserByAgeAdress(age, adress);
      const count = results.length;
      return res.status(200).json({ results, count });
    } catch (error) {
      return res.status(500).send("Internal Server Error");
    }
  }
  
}
