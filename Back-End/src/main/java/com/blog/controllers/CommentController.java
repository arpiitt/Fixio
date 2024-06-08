package com.blog.controllers;

import com.blog.exceptions.PostNotFoundException;
import com.blog.models.User;
import com.blog.payload.CommentDto;
import com.blog.services.CommentService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@AllArgsConstructor
@RequestMapping("/api/comments")
public class CommentController {

    private final CommentService commentService;

    @GetMapping("/post-{postId}")
    public ResponseEntity<List<CommentDto>> getPostComments(@PathVariable Long postId) {
        return ResponseEntity.ok(commentService.getPostComments(postId));
    }

    @PostMapping("/add-comment")
    public ResponseEntity<Boolean> commentOnPost(@AuthenticationPrincipal User user, @RequestBody CommentDto commentDto) throws PostNotFoundException {
        System.out.println(commentDto);
        commentService.commentOnPost(commentDto, user);
        return ResponseEntity.ok(true);
    }

    @ExceptionHandler(PostNotFoundException.class)
    public ResponseEntity<String> handlePostNotFound(PostNotFoundException exception) {
        return new ResponseEntity<>(exception.getMessage(), HttpStatus.NOT_FOUND);
    }
}
