var mysql = require('mysql'),

connection = mysql.createConnection(
	{ 
		host: '127.2.85.2', 
		user: 'admin1wNN6rU',  
		password: 'pK3_Nh5PQS2g', 
		database: 'controlfid'

		
	}
);

module.exports = connection;
