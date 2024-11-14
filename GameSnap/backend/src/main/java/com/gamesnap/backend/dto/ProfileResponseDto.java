package com.gamesnap.backend.dto;


public class ProfileResponseDto {
    private Integer id;
    private String image;
    private String name;
    private String email;
    private String tel;
    private Integer genres;
    private String password;

    public ProfileResponseDto(Integer id, String image, String name, String email, String tel, Integer genre, String password) {
        this.id = id;
        this.image = image;
        this.name = name;
        this.email = email;
        this.tel = tel;
        this.genres = genre;
        this.password = password;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getTel() {
        return tel;
    }

    public void setTel(String tel) {
        this.tel = tel;
    }

    public Integer getGenres() {
        return genres;
    }

    public void setGenres(Integer genre) {
        this.genres = genre;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    


}
