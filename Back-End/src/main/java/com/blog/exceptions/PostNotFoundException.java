package com.blog.exceptions;

public class PostNotFoundException extends Throwable {
    @Override
    public String getMessage() {
        return "Post Not Found";
    }
}
