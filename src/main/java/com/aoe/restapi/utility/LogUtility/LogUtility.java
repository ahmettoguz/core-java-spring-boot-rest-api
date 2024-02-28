package com.aoe.restapi.utility.LogUtility;

public class LogUtility {
    public static <T> void consoleLog(T message) {
        StackTraceElement[] stackTraceElements = Thread.currentThread().getStackTrace();
        StackTraceElement caller = stackTraceElements[2];
        String fileName = caller.getFileName();
        int lineNumber = caller.getLineNumber();
        System.out.println(fileName + ":" + lineNumber + " - " + message.toString());
    }

    public static String getMessage() {
        // Get the call stack
        StackTraceElement[] stackTrace = Thread.currentThread().getStackTrace();

        // Adjusted index to get the caller's class name
        String callingClassName = stackTrace[3].getClassName();

        // Extract only the class name
        String plainClassName = callingClassName.substring(callingClassName.lastIndexOf('.') + 1);

        // Adjusted index to get the caller's method name
        String callingMethodName = stackTrace[3].getMethodName();

        return "Class: " + plainClassName + ", Method: " + callingMethodName;
    }

}
