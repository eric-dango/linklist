
module.exports = function(req, res, next) {
	return res.status().send();

	next();
}