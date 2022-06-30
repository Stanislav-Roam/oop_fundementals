/**
 * The Single Responsibility Principle is really similar to Separation Of Concern
 * Basically a class should only be responsible for a single slice of functionality
 */

// Take the following class:

class DataTransformer {
    public TransformData(data: Object) {
        // transform data and return it
    }

    public GenerateDataReport(data: Object) {
        // summarize data into a report and email it
    }
}

/**
 * 
 * This class currently handles two things, transforming data, and sending data via an email
 * When viewing if a class should have the Single Responsibility Principle applied to it, it needs
 * to be viewed within the context of "A Reason To Change"
 * 
 * The question then is, why would we need to change the DataTransformer in the future?
 * 1: The method for transforming data changes for some reason
 * 2: The format for the report, or the method for sending an email changes
 * 
 * Therefore this class is now responsible for two different things
 * This violates the Single Responsibility Principle and needs to be refactored
 */

{
    class DataTransformer {
        public TransformData(data: Object) {
            // transform data and return it
        }
    }

    class ReportGenerator {    
        public GenerateDataReport(data: Object) {
            // summarize data into a report and email it
        }
    }
}

/**
 * We not have two separate classes, both with only one reason to change
 * The code is now easier to understand, is more maintainable and there is less of a chance of regression
 */
