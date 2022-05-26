const mysql = require('mysql2/promise');
const { dbConfig } = require('../config');

async function executeDb(sql, dataToDbArr = []) {
  let conn;
  try {
    conn = await mysql.createConnection(dbConfig);
    const [result] = await conn.execute(sql, dataToDbArr);
    return result;
  } catch (error) {
    console.log('error executeDb', error);
    throw new Error('error executeDb');
  } finally {
    conn?.end();
  }
}

function getUsersDb() {
  const sql = 'SELECT * FROM users';
  return executeDb(sql);
}

function saveUserDb(full_name, email, password) {
  const sql = 'INSERT INTO users (full_name, email, password) VALUES (?, ?, ?)';
  return executeDb(sql, [full_name, email, password]);
}

module.exports = {
  getUsersDb,
  saveUserDb,
};
