'use strict';

var express=require("express");
var UAParser = require('ua-parser-js');
var ip = require('ip');

var parser = new UAParser();

var app=express();

app.get('/(:api)?', function(req, res){
    var api=req.params.api;
    if(api==undefined){res.sendFile(process.cwd() + '/index.html');}
    else{
    var out={};
    var ua = req.headers['user-agent'];
    out['ipaddress']=ip.address();
    out["os"]=parser.setUA(ua).getOS();
    out["language"]=req.headers["accept-language"].slice(0,5);
   res.json(out);
   res.end();}
})

var port=process.env.PORT || 3000;

app.listen(port,  function () {
	console.log('Node.js listening on port ...' + port + '...');
});