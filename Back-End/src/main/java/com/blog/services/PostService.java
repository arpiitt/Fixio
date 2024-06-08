package com.blog.services;

import com.blog.exceptions.PostNotFoundException;
import com.blog.models.Post;
import com.blog.models.User;
import com.blog.payload.CommentDto;
import com.blog.payload.PostDto;
import com.blog.payload.PostLikesDto;
import com.blog.repositories.PostRepository;
import com.blog.repositories.UserRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Service
@AllArgsConstructor
public class PostService {

    private final PostRepository postRepository;
    private final UserRepository userRepository;

    public PostDto getPost(Long id) throws PostNotFoundException {
        Post post = postRepository.findById(id)
                .orElseThrow(PostNotFoundException::new);
        return PostDto
                .builder()
                .authorFirstName(post.getAuthor().getFirstName())
                .authorLastName(post.getAuthor().getLastName())
                .authorEmail(post.getAuthor().getEmail())
                .content(post.getContent())
                .title(post.getTitle())
                .likes(post.getLikes())
                .publishedDate(post.getPublishedDate())
                .id(post.getId())
                .tags(post.getTags())
                .comments(new ArrayList<>())
                .likedBy(post.getLikedBy().stream().map(User::getUsername).toList())
                .comments(post.getComments().stream().map(comment ->
                        CommentDto.builder()
                                .postId(comment.getPost().getId())
                                .userEmail(comment.getUser().getEmail())
                                .userFirstName(comment.getUser().getFirstName())
                                .userLastName(comment.getUser().getLastName())
                                .likes(comment.getLikes())
                                .comment(comment.getComment())
                                .date(comment.getDate())
                                .id(comment.getId()).build()).toList())
                .build();
    }

    public void addPost(User user, PostDto postDto) {
        Post post = Post
                .builder()
                .content(postDto.getContent())
                .publishedDate(new Date())
                .title(postDto.getTitle())
                .likes(0)
                .tags(postDto.getTags())
                .author(user)
                .likedBy(new ArrayList<>())
                .build();
        postRepository.saveAndFlush(post);
    }

    public List<PostDto> getPosts() {
        List<Post> posts = postRepository.findAllByOrderByPublishedDateDesc();
        List<PostDto> postDtos = new ArrayList<>();
        for (Post post : posts) {
            PostDto postDto = PostDto.builder()
                    .content(post.getContent())
                    .publishedDate(post.getPublishedDate())
                    .title(post.getTitle())
                    .authorEmail(post.getAuthor().getEmail())
                    .authorFirstName(post.getAuthor().getFirstName())
                    .authorLastName(post.getAuthor().getLastName())
                    .likes(post.getLikes())
                    .tags(post.getTags())
                    .id(post.getId())
                    .likedBy(post.getLikedBy().stream().map(User::getUsername).toList())
                    .comments(post.getComments().stream().map(comment ->
                            CommentDto.builder()
                                    .postId(comment.getPost().getId())
                                    .userEmail(comment.getUser().getEmail())
                                    .userFirstName(comment.getUser().getFirstName())
                                    .userLastName(comment.getUser().getLastName())
                                    .likes(comment.getLikes())
                                    .comment(comment.getComment())
                                    .date(comment.getDate())
                                    .id(comment.getId()).build()).toList())
                    .build();
            postDtos.add(postDto);
        }
        return postDtos;
    }

    public void likePost(User user, Long postId) throws PostNotFoundException {
        Post post = postRepository.findById(postId)
                .orElseThrow(PostNotFoundException::new);
        boolean liked = false;
        for (User user1 : post.getLikedBy()) {
            if (user1.getUsername().equals(user.getUsername())) {
                liked = true;
                break;
            }
        }
        if (!liked) {
            post.getLikedBy().add(user);
            post.setLikes(post.getLikes() + 1);
        }
        postRepository.saveAndFlush(post);
    }


    public void unlikePost(User user, Long postId) throws PostNotFoundException {
        Post post = postRepository.findById(postId)
                .orElseThrow(PostNotFoundException::new);
        for (User user1 : post.getLikedBy()) {
            if (user1.getUsername().equals(user.getUsername())) {
                post.getLikedBy().remove(user1);
                post.setLikes(post.getLikes() - 1);
                break;
            }
        }
        postRepository.saveAndFlush(post);
    }

    public PostLikesDto getLikes(User user, Long postId) throws PostNotFoundException {
        Post post = postRepository.findById(postId)
                .orElseThrow(PostNotFoundException::new);
        PostLikesDto postLikesDto = PostLikesDto
                .builder()
                .likes(post.getLikes()).build();
        postLikesDto.setLiked(false);
        for (User user1 : post.getLikedBy()) {
            if (user1.getUsername().equals(user.getUsername())) {
                postLikesDto.setLiked(true);
            }
        }
        return postLikesDto;
    }
}
