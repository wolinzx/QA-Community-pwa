// db模块
let mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/qa-community-pwa');

let db = mongoose.connection;
db.on('error', () => {
	console.log('failed link database');
});
db.once('open', () => {
	console.log('success link database');
});

/************** 定义模式loginSchema **************/
const loginSchema = mongoose.Schema({
	avatar: {
		type: String
	},
	account: {
		type: String,
		unique: true
	},
	password: {
		type: String
	},
	sex: {
		type: String,
		enum: ['男', '女']
	},
	describe: {
		type: String
	},
	// match: /^([0-9A-Za-z\-_\.]+)@([0-9a-z]+\.[a-z]{2,3}(\.[a-z]{2})?)$/g
	email: {
		type: String,
		unique: true
	},
	industry: {
		type: String
	},
	avatar: {
		type: String
	}
});

/************** 定义模型Model **************/
const Models = {
	Login: mongoose.model('Login', loginSchema)
}

module.exports = Models;
