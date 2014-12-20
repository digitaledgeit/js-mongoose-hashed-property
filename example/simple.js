var mongoose    = require('mongoose');
var plugin      = require('..');

mongoose.connect('localhost/test');

var schema = new mongoose.Schema({
	title:  String
});

schema.plugin(plugin);

var Model = mongoose.model('Model', schema);
var model = new Model();

//set a password
model.password = 'password';

//verify a password is correct
console.log(model.verifyPassword('password')); //true
console.log(model.verifyPassword('test')); //false

//the hashed value stored in the data store
console.log(model.hashed_password);

mongoose.disconnect();