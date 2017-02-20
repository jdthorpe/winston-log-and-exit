/// <reference path="./typings.d.ts"/>

winston = require('winston')
winston.defaults

winston.log_and_exit = 
winston.logAndExit =  function(level,msg,code_or_callback){
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
                        if(typeof code_or_callback === 'function')
                            code_or_callback()
                        else
					   	    process.exit(code_or_callback);
				   	}
			   	});
			   	self.default.transports[k]._stream.end();
		   	}
	   	});
	   	if (numFlushes === 0) {
            if(typeof code_or_callback === 'function')
                code_or_callback()
            else
                process.exit(code_or_callback);
	   	}
   	});
}

winston.Logger.prototype.log_and_exit = 
winston.Logger.prototype.logAndExit =  function(level,msg,code_or_callback){
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
                        if(typeof code_or_callback === 'function')
                            code_or_callback()
                        else
					   	    process.exit(code_or_callback);
				   	}
			   	});
			   	self.transports[k]._stream.end();
		   	}
	   	});
	   	if (numFlushes === 0) {
            if(typeof code_or_callback === 'function')
                code_or_callback()
            else
                process.exit(code_or_callback);
	   	}
   	});
}

delete module.exports

