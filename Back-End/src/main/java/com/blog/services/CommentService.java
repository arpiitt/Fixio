package com.blog.services;

import com.blog.exceptions.PostNotFoundException;
import com.blog.models.Comment;
import com.blog.models.Post;
import com.blog.models.User;
import com.blog.payload.CommentDto;
import com.blog.repositories.CommentRepository;
import com.blog.repositories.PostRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
@AllArgsConstructor
public class CommentService {
    private final CommentRepository commentRepository;
    private final PostRepository postRepository;

    public List<CommentDto> getPostComments(Long postId) {
        List<Comment> comments = commentRepository.getCommentsByPostId(postId);
        List<CommentDto> commentDtos = new ArrayList<>();
        for (Comment comment : comments) {
            CommentDto commentDto = CommentDto
                    .builder()
                    .id(comment.getId())
                    .likes(comment.getLikes())
                    .comment(comment.getComment())
                    .userEmail(comment.getUser().getEmail())
                    .userFirstName(comment.getUser().getFirstName())
                    .userLastName(comment.getUser().getLastName())
                    .postId(comment.getPost().getId())
                    .date(comment.getDate())
                    .build();
            commentDtos.add(commentDto);
        }
        return commentDtos;
    }

    public void commentOnPost(CommentDto commentDto, User user) throws PostNotFoundException {
        Optional<Post> optionalPost = postRepository.findById(commentDto.getPostId());
        if (optionalPost.isPresent()) {
            Post post = optionalPost.get();
            post.getComments().add(Comment.builder()
                    .date(new Date())
                    .comment(commentDto.getComment())
                    .user(user)
                    .post(post)
                    .likes(0)
                    .build()
            );
            postRepository.saveAndFlush(post);
        } else throw new PostNotFoundException();
    }
}
