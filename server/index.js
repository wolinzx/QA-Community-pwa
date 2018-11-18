const api = require('./api')//引入自定义中间件api
const path = require('path');
const bodyParser = require('body-parser'); // 引入处理post数据的模块
const express = require('express'); // 引入Express
const app = express();
const cookieParser = require('cookie-parser');
const session = require('express-session');

app.use(cookieParser('sessiontest'));
app.use(session({
	secret: 'sessiontest', //与cookieParser中的一致
	resave: true,
	saveUninitialized: true
}));

app.use(bodyParser.json());
app.use(api);
app.listen(8088);
console.log('success listen......');
