const mysql = require('mysql');

module.exports = class DbContext{

    constructor(dbConfig){
        this.connection = mysql.createConnection(dbConfig);

        this.connection.connect(function(err) {
            if (err) throw err;
            
            console.log("Connected to MySQL!");
            
        });
    }

    GetItems = () => {
        let query = "SELECT " +
        "i.*, " +
        "COUNT(uo.id) AS orderCount " +
        "FROM " +
        "items i " +
        "LEFT JOIN userOrders uo ON i.id = uo.itemId " +
        "GROUP BY i.name;";

        return new Promise((resolve, reject) => 
        {
            this.connection.query(query, (error, results) => 
            {
                return resolve(results);
            });
        });
    }

    GetOrders = (userId) => {
        let query = 
        "SELECT i.name, os.name AS 'status', os.id AS 'statusId' FROM userOrders uo " +
        "LEFT JOIN items i " +
        "ON uo.itemId = i.id " + 
        "LEFT JOIN orderStatus os " +
        "ON uo.orderStatus = os.id " +
        "WHERE uo.userId = ?;";

        return new Promise((resolve, reject) => 
        {
            this.connection.query(query, [userId], (error, results) => 
            {
                return resolve(results);
            });
        });
    }

    AllOrders = () => {
        let query = 
        "SELECT u.username as 'orderedBy', uo.id, DATE_FORMAT(uo.order_date, '%d/%l/%Y %H:%i:%s') as order_date, i.name, os.name AS 'status', os.id AS 'statusId' "+
        "FROM userOrders uo " +
        "LEFT JOIN items i " +
        "ON uo.itemId = i.id " +
        "LEFT JOIN orderStatus os " +
        "ON uo.orderStatus = os.id " +
        "LEFT JOIN users u " +
        "ON u.id = uo.userId " +
        "ORDER BY uo.order_date desc";

        return new Promise((resolve, reject) => 
        {
            this.connection.query(query, (error, results) => 
            {
                return resolve(results);
            });
        });
    }

    GetOrderStatus = (id) => {
        let query = "SELECT orderStatus FROM userOrders where id = ?;"

        return new Promise((resolve, reject) => 
        {
            this.connection.query(query, [id], (error, results) => 
            {
                return resolve(results);
            });
        });
    }
        
    UpdateOrderStatus = (id, newStatus) => {
        let query = "UPDATE userOrders SET orderStatus = ? WHERE id = ?";

        return new Promise((resolve, reject) => 
        {
            this.connection.query(query, [newStatus, id], (error, results) => 
            {
                return resolve(results);
            });
        });
    }

    AddOrder = (itemId, userId) => {
        let query = 'INSERT INTO userOrders (itemId, userId) VALUES (?, ?);';

        return new Promise((resolve, reject) => 
        {
            this.connection.query(query, [itemId, userId], (error, results) => 
            {
                return resolve(results);
            });
        });
    }

    GetItem = (id) => {
        let query = 'SELECT * FROM items WHERE id = ?;';

        return new Promise((resolve, reject) => 
        {
            this.connection.query(query, [id], (error, results) => 
            {
                return resolve(results[0]);
            });
        });
    }

    GetReviews = (itemId) => {
        let query = 
        "SELECT u.username, ur.rating, ur.text FROM userReviews ur " +
        "LEFT JOIN users u " +
        "ON u.id = ur.userId " +
        "Where ur.itemId = ?;"

        return new Promise((resolve, reject) => 
        {
            this.connection.query(query, [itemId], (error, results) => 
            {
                return resolve(results);
            });
        });
    }

    AddReview = (userId, itemId, rating, text) => {
        let query = "INSERT INTO userReviews (itemId, userId, text, rating) VALUES (?, ?, ?, ?);"
        
        return new Promise((resolve, reject) => 
        {
            this.connection.query(query, [itemId, userId, text, rating], (error, results) => 
            {
                return resolve(results);
            });
        });
    }

    AddItem = (name, price, url) => {
        let query = "INSERT INTO items (name, price, src) VALUES (?, ?, ?);"
        
        return new Promise((resolve, reject) => 
        {
            this.connection.query(query, [name, price, url], (error, results) => 
            {
                return resolve(results);
            });
        });
    }

    RemoveItem = (id) => {
        let query = "DELETE FROM items WHERE id = ?;"
        
        return new Promise((resolve, reject) => 
        {
            this.connection.query(query, [id], (error, results) => 
            {
                return resolve(results);
            });
        });
    }
}