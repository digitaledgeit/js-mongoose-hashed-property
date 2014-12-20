var hash = require('./lib/hash.js');

/**
 * Hash property plugin
 * @param   {Schema}  schema
 * @param   {Object}  [options]
 */
module.exports = function(schema, options) {
	options                     = options || {};
	var verifyMethod            = options.verifyMethod || 'verifyPassword';
	var passwordProperty        = options.passwordProperty || 'password';
	var hashedPasswordProperty  = options.hashedPasswordProperty || 'hashed_password';

	//add a property for the hashed value
	var dfn = {};
	dfn[options.hashedPasswordProperty] = 'String';
	schema.add(dfn);

	//add a virtual property for the plaintext value
	schema.virtual(passwordProperty)
		.set(function(value) {
			this[hashedPasswordProperty] = hash(value);
		})
	;

	schema.methods[verifyMethod] = function(password) {
		return hash.verify(password, this[hashedPasswordProperty]);
	};

};
