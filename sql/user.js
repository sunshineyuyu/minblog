var mysql = require("mysql");

var pool = mysql.createPool({
    host:"localhost",
    user:"root",
    password:"root",
    database:"node"
});
function query(sql,callback){
    pool.getConnection(function(err,connection){
        connection.query(sql, function (err,rows) {
            callback(err,rows);
            connection.release();
        });
    });
}

//操作user的接口
function User(user) {
  this.name = user.name;
  this.pwd = user.pwd;
}

User.prototype = {
	addUser: function(callback) {
	  query("insert into user(name,pwd) values('"+this.name+"','"+ this.pwd + "')",function(err,rows){
	    callback(err,rows);
	  });
	},
	getUser: function(callback) {
		query('select * from user where (name = "' + this.name +'")', (err, rows) => {
			console.log(err);
			console.log(rows);
			callback(err, rows);
		})
	},
}

function Article(data) {
	// this.article = {};
	if(data) {
		for(let [key, value] of Object.entries(data)) {
			this[key] = value;
		};
	}
	// this.aid = 9;
}
Article.prototype = {
	addArticle: function(callback) {
		query(`insert into article(title,content,time, author) values('${this.title}','${this.content} ',${this.time} ,'${this.author}')`,function(err,rows){
	    callback(err,rows);
	  });
	},
	getArticle: (callback) => {
		query(`select * from article`,function(err,rows){
	    callback(err,rows);
	  });
	},
	/*getDetail: (callback) => {
		query(`select * from article where (id = ${ this.aid})`,(err, rows) => {
			console.log(rows);
			callback(err,rows[0]);
		});
	},*/
	getDetail: function(callback) {
		query(`select * from article where (id = ${this.aid})`,function(err, rows) {
		// query('select * from article where (id = ' + this.aid + ')',function(err, rows) {
			callback(err,rows[0]);
		});
	},
}

/*User.prototype.addUser = function( callback) {
}*/

module.exports = {User, Article};
