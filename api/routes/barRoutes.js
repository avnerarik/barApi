'use strict';
module.exports = function(app) {
	var bar = require('../controllers/barController');
	
	app.get('/', bar.getlistorder);
	app.get('/orders', bar.getlistorder);
	app.post('/placeorder', bar.placeorder);
	app.get('/cancelorder/:id', bar.cancelorder);
	app.get('/saveorder',bar.saveorder);
	app.get('/shiftorders',bar.shiftorders);
	
};