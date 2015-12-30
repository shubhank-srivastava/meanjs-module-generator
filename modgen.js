var async = require('async'),
	fs = require('fs-extra'),
	glob = require("glob"),
	src = process.argv[2],
	dests = process.argv.slice(3),
	module_PATH =  './modules/',
	str1 = src.slice(0, src.length-1),
	str2 = src.charAt(0).toUpperCase() + src.slice(1, src.length-1),
	reg1 = new RegExp(str1, 'g'),
	reg2 = new RegExp(str2, 'g');

async.each(dests, function(dest, callback){
	var matchers = {};
	matchers[src.slice(0, src.length-1)] = dest.slice(0, dest.length-1);
	matchers[src.charAt(0).toUpperCase() + src.slice(1, src.length-1)] = dest.charAt(0).toUpperCase() + dest.slice(1, dest.length-1);

	fs.copy(module_PATH+src , module_PATH+dest, function (err) {
	  if (err) {
	    console.error(err);
	  } else {
	    glob(module_PATH+dest+"/**/*.js", {}, function (er, files) {
		  	files.forEach(function(file){
		  		fs.readFile(file, 'utf-8', function(err, data){
		  			if(err) console.log(err);
		  			else{
		  				data = data.replace(reg1, matchers[str1]);
		  				data = data.replace(reg2, matchers[str2]);
		  				newName = file.replace(reg1, matchers[str1]);
		  				fs.writeFileSync(file, data);
		  				fs.rename(file, newName, function(err){
		  					if(err) console.log(err);
		  				});
		  			}
		  		});
		  	});
		});
		glob(module_PATH+dest+"/**/*.html", {}, function (er, files) {
		  	files.forEach(function(file){
		  		fs.readFile(file, 'utf-8', function(err, data){
		  			if(err) console.log(err);
		  			else{
		  				data = data.replace(reg1, matchers[str1]);
		  				data = data.replace(reg2, matchers[str2]);
		  				newName = file.replace(reg1, matchers[str1]);
		  				fs.writeFileSync(file, data);
		  				fs.rename(file, newName, function(err){
		  					if(err) console.log(err);
		  				});
		  			}
		  		});
		  	});
		});
	  }
	});
}, function(err){
	if(err) console.log(err);
	else
		process.exit(0);
});