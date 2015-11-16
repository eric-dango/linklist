module.exports = {
  populate: function (instance, body, userId) {
    if (typeof instance !== 'object') return;
    for (var prop in body) {
      instance[prop] = body[prop];
    }
    if (userId) {
    	instance.userId = userId;
    }
  }
}