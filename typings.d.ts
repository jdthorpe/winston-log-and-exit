import * as Winston from "winston"

declare module "Winston" {

    namespace winston {
        export interface LoggerInstance{
            log_and_exit:log_and_exit_method
            logAndExit:log_and_exit_method
        }
        export interface Winston{
            log_and_exit:log_and_exit_method
            logAndExit:log_and_exit_method
        }
        interface log_and_exit_method {
            (level: string, msg: string, exitcode?:number ):void;
        }
    }

}
