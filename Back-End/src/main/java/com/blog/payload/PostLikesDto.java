package com.blog.payload;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class PostLikesDto {
    private Integer likes;
    private boolean isLiked;
}
