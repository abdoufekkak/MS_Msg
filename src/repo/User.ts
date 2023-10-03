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


      async getUserById(id: number) {
        const selectQuery = `
          SELECT * FROM users
          WHERE id = $[id]
        `;
      
        const user = await db.oneOrNone(selectQuery, { id });
      
        return user;
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
