var assert    = require('assert');
var mongoose  = require('mongoose');
var plugin    = require('..');

var schema, Model, model;

describe('mongoose-hashed-property', function() {

	before(function(done) {
		mongoose.connect('localhost/test', done);
	});

	beforeEach(function setup(callback) {

		schema = new mongoose.Schema({
			title:  String
		});

		schema.plugin(plugin, {
		});

		Model = mongoose.model('Model', schema);
		model = new Model();

		callback();
	});

	afterEach(function() {

		delete mongoose.models.Model;
		delete mongoose.modelSchemas.Model;

	});

	after(function(done) {
		mongoose.disconnect(done);
	});

	describe('.verifyPassword()', function() {
		it('should return false if no password is set', function() {
			assert(!model.verifyPassword('test'));
		});
	});

});
