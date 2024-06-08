package com.blog.payload;

import lombok.Builder;
import lombok.Data;

import java.util.Date;

@Data
@Builder
public class CommentDto {
    private Long id;
    private String userFirstName;
    private String userLastName;
    private String userEmail;
    private Long postId;
    private String comment;
    private Integer likes = 0;
    private Date date;
}
