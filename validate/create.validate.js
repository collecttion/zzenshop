module.exports.upload = function(req, res, next){
	var errors = [];

	if (!req.body.name){
		errors.push('Name is requiresd');
	}

	if (!req.file){
		errors.push('Please upload a file');
	}

	if(errors.length){
		res.render('create', {
			errors:errors,
			values:req.body
		});
			return;
	}
	next();
};