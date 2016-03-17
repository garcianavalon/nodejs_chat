var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var conversationSchema = new Schema({
  professional:  String,
  user: String,
  messages: [{ body: String, date: Date, from: String }]
});


mongoose.connect('mongodb://localhost/test');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
});