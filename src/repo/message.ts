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

class MessageDB {
 
  // Fonction pour insérer un message
  async createMessage(message : message) {
    const insertQuery = `
      INSERT INTO message (senderId, receiverId, content, send_date, contry_msg, deleted_al, deleted_fr_me, messageType)
      VALUES ($[senderId], $[receiverId], $[content], $[send_date], $[contry_msg], $[deleted_al], $[deleted_fr_me], $[messageType])
      RETURNING id;
    `;

    const result = await db.one(insertQuery, message);
    return result.id;
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
      SET senderId = $[senderId], receiverId = $[receiverId], content = $[content], 
          send_date = $[send_date], contry_msg = $[contry_msg], deleted_al = $[deleted_al], 
          deleted_fr_me = $[deleted_fr_me], messageType = $[messageType]
      WHERE id = $[id]
    `;

    updatedMessage.id = id; // Ajoutez également l'ID aux données mises à jour

    const result = await db.result(updateQuery, updatedMessage, (r: { rowCount: number }) => r.rowCount);
    //number de ligne 
    return result === 1;  }

  // Fonction pour supprimer un message par son ID
  async deleteMessage(id: number) {
    const updateQuery = `
      UPDATE message
      SET deleted_at = NOW()
      WHERE id = $1
    `;

    await db.none(updateQuery, id);
  }
}

module.exports = new MessageDB();