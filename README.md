
## The Problem

Winston creates may execute logging callbacks before file streams have
been flushed, and creates file streams asynchronously but executes the
close methods synchronously, and as a result, the following messages may
note be logged to file:

	logger.info("This message may not be saved to file.",
		function(){process.exit()})

and:

	logger.info("This message probably won't be saved to file.")
	logger.close()
	process.exit()

## The solution

`winston-log-and-exit` is a patch which adds a `log_and_exit()` (or
equivalently `logAndExit()`) method to Winston, which can be used
with Winston's default logger like so:

	var winston = require('winston');
	require('winston-log-and-exit');

	// add a file transport to winston's default logger
	winston.add(winston.transports.File, { filename: 'somefile.log' });

	winston.log_and_exit("info","This message *will* be included in the log files.",0)
	winston.info("info","This message *might* be included in the log files.")
	process.nextTick(winston.info("info","This message probably won't be included in the log files.")
	setTimeout(winston.info("info","This message almost certianly won't be included in the log files."),100)

and with a user-instantiated logger like so:

	var winston = require('winston');
	require('winston-log-and-exit');

	var logger = new (winston.Logger)({
		transports: [
			new (winston.transports.Console)(),
			new (winston.transports.File)({ filename: 'somefile.log' })
		]
	});

	logger.log_and_exit("info","This message *will* be included in the log files.",0)
	logger.info("info","This message *might* be included in the log files.")
	process.nextTick(logger.info("info","This message probably won't be included in the log files.")
	setTimeout(logger.info("info","This message almost certianly won't be included in the log files."),100)


This can also be used to ensure that uncaught exceptions are logged:

	require('winston-log-and-exit');
	process.on('uncaughtException', function (err) {
		// use `winston` or your own Logger instance as appropriate
		winston.error("Uncaught Exception",err);
		winston.log_and_exit("info","bye",1);
	});
