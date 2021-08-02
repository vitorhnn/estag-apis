import knex from "knex";

const db = knex({
    client: "sqlite3",
    connection: {
        filename: "./db.sqlite3"
    },
});

async function setup() {
    await db.schema.createTableIfNotExists("products", table => {
        table.integer("id").primary();
        table.string("name");
        table.string("price");
        table.float("weight");
    })
}

setup();

export default db;
