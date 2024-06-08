package com.blog.exceptions;

public class EmailAlreadyExists extends Throwable {
    @Override
    public String getMessage() {
        return "Email Already Exists";
    }
}
