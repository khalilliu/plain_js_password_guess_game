var express = require("express");
var path = require("path");

var app = express();

app.use(express.static(path.join(__dirname,'public')));

app.get('/',function(req,res){
    res.sendFile(path.resolve(__dirname, 'public', 'index.html'))
})

var listener = app.listen(process.env.PORT || 8080, function(){
    console.log('app listen at ' + listener.address().port);
})