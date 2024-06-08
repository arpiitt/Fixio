package com.blog.payload;

import lombok.Builder;
import lombok.Data;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Data
@Builder
public class PostDto {
    private Long id;
    private String title;
    private String content;
    private Date publishedDate;
    private Integer likes = 0;
    private String authorFirstName;
    private String authorLastName;
    private String authorEmail;
    private List<CommentDto> comments = new ArrayList<>();
    private List<String> tags = new ArrayList<>();
    private List<String> likedBy = new ArrayList<>();
}
