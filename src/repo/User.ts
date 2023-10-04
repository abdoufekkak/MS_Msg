import { User } from "../model/User";

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
export class UserRepository {

    async createUser(user: User) {
        const insertQuery = `
          INSERT INTO users (username, email)
          VALUES ($[username], $[email])
          RETURNING id
        `;
    
        const result = await db.one(insertQuery, user);
    
        return result.id;
      }
      async GetAllUser() {
        const insertQuery = `
         select * from users order by id desc
        `;
    
        const datA=  await db.query(insertQuery);
        return datA;
      }

      async getUserById(id: number) {
        const selectQuery = `
          SELECT * FROM users
          WHERE id = $[id]
        `;

     
      
        const user = await db.oneOrNone(selectQuery, { id });
      
        return user;
      }
      
      async  getAmisByIduser(id: number,){
        const selectQuery = `
        SELECT users2.id,users2.email,users2.username, users2.age
         ,users2,address FROM users as users1,relations,users as  users2
        WHERE   users1.id=relations.user_id and
         users2.id=relations.friend_id and relations.type_relation='ami' and users1.id = $[id]
      `;
      const data=  await db.query(selectQuery,{ id: id });
return data;
      }
      async updateUser(id: number, updatedUserData: User) {
        const updateQuery = `
          UPDATE users
          SET username = $[username], email = $[email], age = $[age], address = $[address]
          WHERE id = $[id]
        `;
      
        updatedUserData.id = id; // Ajoutez également l'ID aux données mises à jour
      
        const result = await db.result(updateQuery, updatedUserData, (r: { rowCount: number }) => r.rowCount);
        //number de ligne 
        return result === 1;
      }
      
      async deleteUser(id: number) {
        const deleteQuery = `
          DELETE FROM users
          WHERE id = $[id]
        `;
      
        const result = await db.result(deleteQuery, { id }, (r: { rowCount: any; }) => r.rowCount);
      
        return result === 1;
      }
      
}
