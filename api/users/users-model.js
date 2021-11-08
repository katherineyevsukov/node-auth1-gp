const db = require("../../database/db-config.js");

module.exports = {
  add,
  find,
  findBy,
  findById,
};

function find() {
  return db("users").select("id", "username").orderBy("id");
}

function findBy(filter) { // { username: "ladygaga" }
  return db("users").where(filter).orderBy("id"); // []
}

async function add(user) {
  const [id] = await db("users").insert(user);
  return findById(id);
}

function findById(id) {
  return db("users").where({ id }).first();
}
