const { Client } = require('pg');
const { readFileSync }  = require("fs");
const { pool } = require('./DBConfig');

(async () => {


    const baseDir = `${__dirname}/schemas`;
    const schemas = ['UserSchema.sql'];
    const files =  schemas.map((schema) => `${baseDir}/${schema}`)
    const client = await pool.connect();

    client.query("BEGIN");

    for(const file of files){
        const sql = readFileSync(file).toString();
        const res = await client.query(sql);

        console.log(res)
    }

    await client.query("COMMIT");

    client.release();

})();