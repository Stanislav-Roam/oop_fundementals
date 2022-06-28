/**
 * Polymorphism is the concept that subclasses of a given supertype can all be represented as their supertype while having different implementation for shared public methods
 * Furthermore, subclasses can define their own functionality and override methods and members in a superclass, provided the method signatures match
 * 
 * This can be really useful in scenarios where we prescribe a common interface for a service that may have multiple implementations. E.g sending a txt message, sending an email, saving a file
 * Polymorphism pairs really well with dependency injection in order to swap out services in modules as needed
 */

// a baseline logger that was first implemented at the start of the project
class ConsoleLogger {
    public logToConsole(message: string): void {
        console.log(message);
    }
}

// a new way we found to log to the console thats even better a few months down the line of the project being in PROD
class BetterConsoleLogger extends ConsoleLogger {
    public override logToConsole(message: string): void {
        console.log(`BETTER_LOGGER_METHOD ${message}`);
    }
}

// a service used to consume a logger and log to the console
// this also takes advantage of abstraction to not pay attention to the implementation of a consolelogger and instead just call the shared interface
class LoggerConsumer {
    
    constructor(
        private readonly logger: ConsoleLogger,
    ){}

    public log(message: string) {
        this.logger.logToConsole(message)
    }
}

// create a logger and consumer using the original method
let logger: ConsoleLogger = new ConsoleLogger();
let loggerConsumer: LoggerConsumer = new LoggerConsumer(logger);

loggerConsumer.log("Hello world!"); //Hello world!

// in the future we find a better way to do logging to console, we can use polymorphism to improve the code without changing the LoggerConsumer
let newLogger: BetterConsoleLogger = new BetterConsoleLogger();
loggerConsumer = new LoggerConsumer(newLogger);

loggerConsumer.log("Hello world in a slightly different way!"); //BETTER_LOGGER_METHOD Hello world in a slightly different way!