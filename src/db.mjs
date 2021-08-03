import knex from "knex";

const db = knex({
    client: "sqlite3",
    connection: {
        filename: "./db.sqlite3"
    },
});

async function setup() {
    if (!await db.schema.hasTable("products")) {
        await db.schema.createTable("products", table => {
            table.integer("id").primary();
            table.string("name");
            table.string("price");
            table.float("weight").index();
        });
    }
}

setup();

export default db;
