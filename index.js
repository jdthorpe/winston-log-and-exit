// --------------------------------------------------------------------------------
// Programmer: Jason Thorpe
// Date        1/20/2017 9:10:12 AM
// Language:   javascript
// Purpose:    
// Comments:   
// --------------------------------------------------------------------------------


winston = require('winston')
winston.defaults

winston.log_and_exit = 
winston.logAndExit =  function(level,msg,code){
	var self = this;
	this.log(level,msg, function(err) {
	   	var numFlushes = 0;
	   	var numFlushed = 0;
	   	Object.keys(self.default.transports).forEach(function(k) {
		   	if (self.default.transports[k]._stream) {
			   	numFlushes += 1;
			   	self.default.transports[k]._stream.once("finish", function() {
				   	numFlushed += 1;
				   	if (numFlushes === numFlushed) {
					   	process.exit(code);
				   	}
			   	});
			   	self.default.transports[k]._stream.end();
		   	}
	   	});
	   	if (numFlushes === 0) {
		   	process.exit(code);
	   	}
   	});
}

winston.Logger.prototype.log_and_exit = 
winston.Logger.prototype.logAndExit =  function(level,msg,code){
	var self = this;
	this.log(level,msg, function(err) {
	   	var numFlushes = 0;
	   	var numFlushed = 0;
	   	Object.keys(self.transports).forEach(function(k) {
		   	if (self.transports[k]._stream) {
			   	numFlushes += 1;
			   	self.transports[k]._stream.once("finish", function() {
				   	numFlushed += 1;
				   	if (numFlushes === numFlushed) {
					   	process.exit(code);
				   	}
			   	});
			   	self.transports[k]._stream.end();
		   	}
	   	});
	   	if (numFlushes === 0) {
		   	process.exit(code);
	   	}
   	});
}

delete module.exports
