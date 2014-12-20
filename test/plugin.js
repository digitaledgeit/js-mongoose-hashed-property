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

});

describe('hash', function() {

	describe('hash', function() {
		it('should have four sections');
		it('should create unique salts each time');
		it('should create a different hash for a different password');
		it('should create the same hash for the same salt and password');
	});

	describe('verify', function() {
		it('should verify a correct password');
		it('should not verify an incorrect password');
	});

});