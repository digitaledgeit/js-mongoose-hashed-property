var crypto = require('crypto');

/**
 * Generate a password hash
 * @param   {String} password
 * @param   {Object} [options]
 * @param   {String} [options.salt]
 * @param   {Number} [options.saltlen]
 * @param   {Number} [options.iterations]
 * @returns {String}
 */
function hash(password, options) {

	var
		salt,
		saltlen,
		iterations,
		hashedPassword
	;

	if (options && options.salt) {
		salt    = options.salt;
		saltlen = options.salt.length;
	} else {
		saltlen = options && options.saltlen || 64;
		salt    = crypto.randomBytes(saltlen);
	}

	iterations = options && options.iterations || 10000;
	hashedPassword = crypto.pbkdf2Sync(password, salt , iterations, saltlen);

	return 'pkdf2$'+iterations+'$'+salt.toString('hex')+'$'+hashedPassword.toString('hex');
}

/**
 * Verify a password generates the same hash
 * @param   {String} password
 * @param   {String} hashedPassword
 * @returns {Boolean}
 */
function verify(password, hashedPassword) {
	var split = hashedPassword.split('$');

	//TODO: validate params

	var
		salt = new Buffer(split[2], 'hex'),
		saltlen = salt.length,
		iterations = Number(split[1])
	;

	var options = {
		salt:         salt,
		saltlen:      saltlen,
		iterations:   iterations
	};

	var verifiedPassword = hash(password, options);

	//perform the comparison in a constant time to avoid timing attacks - see http://carlos.bueno.org/2011/10/timing.html
	if (hashedPassword.length === verifiedPassword.length) {
		var diff = 0;
		for (var i=0; i<hashedPassword.length; ++i) {
			diff |= hashedPassword.charCodeAt(i) ^ verifiedPassword.charCodeAt(i);
		}
		return diff === 0
	} else {
		return false;
	}

}

module.exports = hash;
module.exports.verify = verify;
