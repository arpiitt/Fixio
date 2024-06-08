package com.blog.controllers;

import com.blog.exceptions.PostNotFoundException;
import com.blog.models.User;
import com.blog.payload.PostDto;
import com.blog.payload.PostLikesDto;
import com.blog.services.PostService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@AllArgsConstructor
@RequestMapping("/api/posts")
public class PostController {
    private final PostService postService;

    @GetMapping("/post-{id}")
    public ResponseEntity<PostDto> getPost(@PathVariable Long id) throws PostNotFoundException {
        return ResponseEntity.ok(postService.getPost(id));
    }

    @GetMapping("/all")
    public ResponseEntity<List<PostDto>> getPosts() {
        return ResponseEntity.ok(postService.getPosts());
    }

    @PostMapping("/add-post")
    public ResponseEntity<String> addPost(@AuthenticationPrincipal User user, @RequestBody PostDto postDto) {
        postService.addPost(user, postDto);
        return ResponseEntity.ok("Post Added Successfully");
    }

    @PostMapping("/post-{id}/like")
    public ResponseEntity<String> likePost(@AuthenticationPrincipal User user, @PathVariable Long id) throws PostNotFoundException {
        postService.likePost(user, id);
        return ResponseEntity.ok("Post Liked Successfully");
    }

    @PostMapping("/post-{id}/unlike")
    public ResponseEntity<String> unlikePost(@AuthenticationPrincipal User user, @PathVariable Long id) throws PostNotFoundException {
        postService.unlikePost(user, id);
        return ResponseEntity.ok("Post Unliked Successfully");
    }

    @GetMapping("/post-{id}/get-likes")
    public ResponseEntity<PostLikesDto> getLikes(@AuthenticationPrincipal User user, @PathVariable Long id) throws PostNotFoundException {
        return ResponseEntity.ok(postService.getLikes(user, id));
    }

    @ExceptionHandler(PostNotFoundException.class)
    public ResponseEntity<String> handlePostNotFound(PostNotFoundException exception) {
        return new ResponseEntity<>(exception.getMessage(), HttpStatus.NOT_FOUND);
    }
}
