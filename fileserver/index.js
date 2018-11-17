const express = require('express');
const models = require('../server/db')
var path = require("path");
var url = require("url");
var fs = require("fs");
var bodyParser = require('body-parser');
var formidable = require('formidable');
const app = express();



app.get('/img/test',function(req,res){
    res.send('11');
})

app.post('/img/uploadavatar', function(req, res) {
    var form = new formidable.IncomingForm(); // 创建一个新实例
    form.encoding = 'utf-8'; // 设置传入表单字段的编码
    // 设置文件上传放置的目录  
    // __dirname：被执行node文件的绝对路径     
    form.uploadDir = path.join(__dirname + "/../page/upload"); 
    form.keepExtensions = true;//保留后缀
    // 限制字段文字大小
    // form.maxFieldsSize = 2 * 1024 * 1024;
    // 限制上传文件大小
    //form.maxFileSize = 2 * 1024 * 1024;
    //处理图片
    form.parse(req, function (err, fields, files){
        // console.log(files);
        console.log(fields);
        var filename = files.file.name;
        console.log(filename);
        var nameArray = filename.split('.');
        var type = nameArray[nameArray.length - 1];
        var name = '';8 
        for (var i = 0; i < nameArray.length - 1; i++) {
            name = name + nameArray[i];
        }
        var date = new Date();
        var time = '_' + date.getFullYear() + "_" + date.getMonth() + "_" + date.getDay() + "_" + date.getHours() + "_" + date.getMinutes();
        var avatarName = fields.account + '.' + type;
        var newPath = form.uploadDir + "/" + avatarName;
        var imgServerPath = url.parse("http://img.wolinzx.com/page/upload"+"/" + avatarName);
        console.log(imgServerPath.href);
        models.Login.updateOne({account:fields.account},{avatar:imgServerPath.href},function(err){
            if(err){
                throw err;
            }else{
                res.send(true);
                // console.log(true)
            }
        })

        fs.renameSync(files.file.path, newPath);  //重命名
        // res.send({data:"/upload/"+avatarName})
    })
});
app.listen(8090 ,()=>console.log('success listen......'));

