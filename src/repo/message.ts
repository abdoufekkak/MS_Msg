import { message } from "../model/message";
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

export class MessageDB {
 
  // Fonction pour insérer un message
  async createMessage(message : message) {
    const insertQuery = `
      INSERT INTO message (senderId, receiverId, contente, send_date, contry_msg, deleted_al, deleted_fr_me, messageType)
      VALUES ($[senderId], $[receiverId], $[content], $[send_date], $[contry_msg], $[deleted_al], $[deleted_fr_me], $[messageType])
    `;

     message = await db.one(insertQuery, message);
    return message;
  }

  async GetAllmsg() {
    const insertQuery = `
     select * from message order by id desc
    `;

    const date=  await db.query(insertQuery);
    return date;
  }
  // Fonction pour récupérer un message par son ID
  async getMessageById(id : number) {
    const selectQuery = `
      SELECT * FROM message
      WHERE id = $1
    `;

    const message = await db.oneOrNone(selectQuery, id);
    return message;
  }

  // Fonction pour mettre à jour un message par son ID
  async updateMessage(id: number, updatedMessage: message) {
    const updateQuery = `
      UPDATE message
      SET senderId = $[senderId], receiverId = $[receiverId], content = $[contente], 
          send_date = $[send_date], contry_msg = $[contry_msg], deleted_al = $[deleted_al], 
          deleted_fr_me = $[deleted_fr_me], messageType = $[messageType]
      WHERE id = $[id]
    `;

    updatedMessage.id = id; // Ajoutez également l'ID aux données mises à jour

    const result = await db.result(updateQuery, updatedMessage, (r: { rowCount: number }) => r.rowCount);
    //number de ligne 
    return result === 1;  }

  // Fonction pour supprimer un message par son ID
  async deleteMessageAll(id: number) {
    const updateQuery = `
      UPDATE message
      SET deleted_al = NOW()
      WHERE id = $1
    `;

    await db.none(updateQuery, id);
  }
  async deleteMessagemoi(id: number) {
    const updateQuery = `
      UPDATE message
      SET deleted_fr_me = NOW()
      WHERE id = $1
    `;

 const result = await db.result(
      updateQuery,
      { id },
      (r: { rowCount: any }) => r.rowCount
    );
    return result === 1;  }
    
  async  getAmisBy2user(idsender: number,idrecever:number){
      const selectQuery = `
      SELECT * FROM message
WHERE (senderId = $1 AND receiverId = $2) OR (senderId = $2 AND receiverId = $1)
ORDER BY send_date ASC;
    `;
    const data=  await db.query(selectQuery,{ idsender: idrecever });
return data;
    }
}

