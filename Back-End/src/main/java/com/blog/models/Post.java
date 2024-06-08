package com.blog.models;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class Post {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id", nullable = false)
    private Long id;
    @Column(length = 100)
    private String title;
    @Column(length = 20000)
    private String content;
    private Date publishedDate;
    private Integer likes = 0;
    @ManyToOne
    @JoinColumn(name = "author_id")
    private User author;
    @OneToMany(cascade = CascadeType.ALL)
    private List<Comment> comments = new ArrayList<>();
    @ElementCollection
    private List<String> tags = new ArrayList<>();
    @ManyToMany
    private List<User> likedBy = new ArrayList<>();
}
