import * as winston from "winston"

declare module "winston"{
    interface Winston {
        log_and_exit:log_and_exit_method;
        logAndExit:log_and_exit_method;
    }

    interface LoggerInstance {
        log_and_exit:log_and_exit_method;
        logAndExit:log_and_exit_method;
    }

    interface log_and_exit_method {
        (level: string, msg: string, exitcode?:number|{():void} ):void;
    }
}

