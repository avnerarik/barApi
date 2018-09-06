'use strict';

var products = [
  { id:1, name: 'Pizza', price: '5' },
  { id:2, name: 'Soda', price: '10' },
  { id:3, name: 'Beer', price: '15' }
];
var shopcar = [];

function calcCost(){
	var cost = 0;
	var length = shopcar.length;
	for(var i=0;i < length;i++){
		cost = cost + parseFloat(shopcar[i].price);
	}
	return cost;
}

exports.getlistorder = function(req, res){
	var cost = calcCost();
	
	res.render('index',{ products: products, shopcar:shopcar, cost:cost });
};

exports.placeorder = function(req, res){
	var obj = {};
	obj.id = req.body.indx;
	obj.name = req.body.name;
	obj.price = req.body.price;
	
	shopcar.push(obj);
	
	var cost = calcCost();
	
	res.render('index',{ products: products, shopcar:shopcar, cost:cost });
};

exports.cancelorder = function(req, res) {
	var obj = req.params.id;
	
	shopcar.splice(obj,1);
	
	var cost = calcCost();
	
	res.render('index',{ products: products, shopcar:shopcar, cost:cost });
};

exports.saveorder = function(req,res){
	
	var d = new Date();
	shopcar.oid = d.getTime();
	var order = JSON.stringify(shopcar);
	
	var shiftData = req.session;
	if(!shiftData.archive){
		shiftData.archive = [];
	}
	
	shiftData.archive.push(order);
	
	var cost = 0;
	shopcar = [];
	
	console.log("archive",req.session.archive);			
	
	res.render('index',{ products: products, shopcar:shopcar, cost:cost });
}

exports.shiftorders = function(req,res){
	var shiftData = req.session;
	var list = [];
	if(shiftData.archive) {
		var length = shiftData.archive.length;
		for(var i=0;i<length;i++){
			var temp = JSON.parse(shiftData.archive[i]);
			list.push(temp);
		}
	}
	
	res.render('shift',{ shiftorders: list });
}