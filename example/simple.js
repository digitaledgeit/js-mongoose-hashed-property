var mongoose    = require('mongoose');
var plugin      = require('..');

mongoose.connect('localhost/test');

var schema = new mongoose.Schema({
	title:  String
});

schema.plugin(plugin, {});

var Model = mongoose.model('Model', schema);
var model = new Model();

model.password = 'password';

console.log(model.verifyPassword('password'));
console.log(model.verifyPassword('test'));

mongoose.disconnect();