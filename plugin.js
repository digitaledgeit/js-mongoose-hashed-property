var hash = require('./lib/hash.js');

/**
 * Hash password property plugin
 * @param   {Schema}  schema
 * @param   {Object}  [options]
 * @param   {String}  [options.verifyMethod]
 * @param   {String}  [options.passwordProperty]
 * @param   {String}  [options.hashedPasswordProperty]
 */
module.exports = function(schema, options) {
	options                     = options || {};
	var verifyMethod            = options.verifyMethod || 'verifyPassword';
	var passwordProperty        = options.passwordProperty || 'password';
	var hashedPasswordProperty  = options.hashedPasswordProperty || 'hashed_password';
	var saltlen                 = options.saltlen;
	var iterations              = options.iterations;

	//add a property for the hashed value
	var dfn = {};
	dfn[options.hashedPasswordProperty] = 'String';
	schema.add(dfn);

	//add a virtual property for the plaintext value
	schema.virtual(passwordProperty)
		.set(function(value) {
			this[hashedPasswordProperty] = hash(value, {saltlen: saltlen, iterations: iterations});
		})
	;

	schema.methods[verifyMethod] = function(password) {
		if (this[hashedPasswordProperty]) {
			return hash.verify(password, this[hashedPasswordProperty]);
		} else {
			return false;
		}
	};

};
