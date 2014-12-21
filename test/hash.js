var assert    = require('assert');
var hash      = require('../lib/hash');

describe('hash', function() {

	describe('hash', function() {

		it('should have four parts', function() {
			var out = hash('password');
			assert.equal(out.split('$').length, 4);
		});

		it('should create a different salt and a different hash each time', function() {
			var password  = 'password';
			assert.notEqual(hash(password), hash(password));
		});

		it('should create the same hash for the same salt and password', function() {
			var salt      = 'salt';
			var password  = 'password';
			var options   = {salt: salt};
			assert.equal(hash(password, options), hash(password, options));
		});

		it('should create a different hash for a different password', function() {

		});

	});

	describe('verify', function() {
		it('should verify a correct password');
		it('should not verify an incorrect password');

		it('should not verify an empty has', function() {
			assert.throws(function() {
				hash.verify('blah', '');
			});
		});
	});

});