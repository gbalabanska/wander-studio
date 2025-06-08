package com.wanderstudio.errors;

public class UnauthorizedTripAccessException extends RuntimeException {

    public UnauthorizedTripAccessException(String message) {
        super(message);
    }

    public UnauthorizedTripAccessException(String message, Throwable cause) {
        super(message, cause);
    }
}
