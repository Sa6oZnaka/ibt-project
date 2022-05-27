const mysql = require('mysql');

module.exports = class DbContext{

    constructor(dbConfig){
        this.connection = mysql.createConnection(dbConfig);
        //this.connection.query('USE ' + dbConfig.database);

        this.connection.connect(function(err) {
            if (err) throw err;
            
            console.log("Connected to MySQL!");
            
        });
    }

    GetItems = () => {
        let query = 'SELECT * FROM items;';

        return new Promise((resolve, reject) => 
        {
            this.connection.query(query, (error, results) => 
            {
                return resolve(res);
            });
        });
    }
}