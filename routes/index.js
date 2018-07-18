var express = require('express');
var router = express.Router();
var total = require('../sql/user');
let url = require('url');  

/* GET home page. */
/*router.get('/', function(req, res, next) {
  // res.render('index', { title: 'Express' });
  res.render('index');
});
module.exports = router;*/

function session(req, nickname) {
  if(req.session.isVisit) {
    req.session.isVisit++;
    console.log(session);
    console.log('<p>第 ' + req.session.isVisit + '次来此页面</p>');
  } else {
    req.session.isVisit = 1;
    req.session.author = nickname;
    console.log("欢迎第一次来这里");
    console.log(req.session);
  }
}
let User = total.User;
let Article = total.Article;

module.exports = function(app) {
  app.get("/", function(req,res,next){
    res.render('index');
  });

	app.post("/register", function(req,res,next){
  // app.post("/\/register\//",function (req,res,next) {
    let query = url.parse(req.url, true).query,
        name = query.name,
        pwd = query.pwd;

    var user = new User({
      name: name,
      pwd: pwd,
    });
    let sendDate = {
      errcode: 0,
      errstr: '',
      data: {},
    };
    user.addUser(function(err, rows){
      if(err) {
        sendDate.errcode = err;
        sendDate.errstr = '注册用户失败';
        res.send(sendDate);
      }else {
        res.send(sendDate);
      }
    });
  });

  app.get("/login", function(req, res, next) {
    let query = url.parse(req.url, true).query,
        name = query.name,
        pwd = query.pwd;
    var user = new User({
      name: name,
      pwd: pwd,
    });
    let sendDate = {
      errcode: 0,
      errstr: '',
      data: {},
    };
    user.getUser(function(err, rows){
      if(err) {
        sendDate.errcode = err;
        sendDate.errstr = '用户登录失败';
        res.send(sendDate);
      }else {
        session(req, rows[0].name);
        sendDate.data = rows;
        res.send(sendDate);
        // res.render('/write');
      }
    });
  });

  app.post("/write", function(req,res,next){
    let query = url.parse(req.url, true).query,
        title = query.title,
        content = query.content,
        time = query.time;
    var article = new Article({
      title: title,
      content: content,
      time: time,
    });
    if(req.session.author) {
      article.author = req.session.author;
    }else {
      return console.log('用户还没有登录');
    };
    let sendDate = {
      errcode: 0,
      errstr: '',
      data: {},
    };
    // console.log(article);
    article.addArticle(function(err, rows){
      if(err) {
        sendDate.errcode = err;
        sendDate.errstr = '发布失败';
        res.send(sendDate);
      }else {
        sendDate.data = rows;
        res.send(sendDate);
      }
    });
  });

  app.get("/getList", function(req,res,next){
    let sendDate = {
      errcode: 0,
      errstr: '',
      data: {},
    };
    var article = new Article();
    // console.log(article);
    article.getArticle(function(err, rows){
      if(err) {
        sendDate.errcode = err;
        sendDate.errstr = '获取失败';
        res.send(sendDate);
      }else {
        sendDate.data = rows;
        res.send(sendDate);
      }
    });
  });

  app.get("/articleDetial", function(req,res,next){
    let query = url.parse(req.url, true).query,
        id = query.id;
    let sendDate = {
      errcode: 0,
      errstr: '',
      data: {},
    };
    var article = new Article({
      aid: id,
    });
    article.getDetail(function(err, rows){
      if(err) {
        sendDate.errcode = err;
        sendDate.errstr = '获取失败';
        res.send(sendDate);
      }else {
        sendDate.data = rows;
        res.send(sendDate);
      }
    });
  });
}
