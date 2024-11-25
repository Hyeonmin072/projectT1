package com.gamesnap.backend.entity;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

import jakarta.persistence.*;
import lombok.Getter;

@Entity
@Getter
public class Member {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "m_id")
    private Integer id;

    @Column(name = "m_name")
    private String name;

    @Column(name = "m_email")
    private String email;

    @Column(name = "m_password")
    private String password;

    @Column(name = "m_image")
    private String image;

    @Column(name = "m_content")
    private String content;

    @Column(name = "m_tel")
    private String tel;

    @Column(name = "m_createdate")
    private LocalDate createdate;

    @OneToMany(mappedBy = "member", cascade = CascadeType.ALL)
    private List<MemberGame> memberGames = new ArrayList<>();

    //나의 친구목록
    @OneToMany(mappedBy = "firstMember", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Friend> friends = new ArrayList<>();

    public Member() {
    }

    public Member(String email, String password, String name, String tel) {
        this.email = email;
        this.password = password;
        this.name = name;
        this.tel = tel;
        this.createdate = LocalDate.now();
    }


    public void MemberUpdateContent(String content){
        this.content = content;
    }

    public void MemberUpdateName(String name){
        this.name = name;
    }

    public void MemberUpdateImage(String image){
        this.image = image;
    }

    public void MemberDeleteImage(){this.image = null;}

    // 친구 추가 메서드
    public void addFriend(Member friend) {
        Friend friendship = new Friend(this, friend); // 현재 멤버의 친구 관계 생성
        Friend reverseFriendship = new Friend(friend, this); // 친구 멤버의 친구 관계 생성

        this.friends.add(friendship);  // 현재 멤버의 친구 리스트에 추가
        friend.getFriends().add(reverseFriendship); // 친구 멤버의 친구 리스트에 추가
    }

    // 친구 제거 메서드
    public void removeFriend(Member friend) {
        Friend friendship = findFriendship(this, friend); // 현재 멤버의 친구 관계 찾기
        Friend reverseFriendship = findFriendship(friend, this); // 친구 멤버의 반대 친구 관계 찾기

        this.friends.remove(friendship);  // 현재 멤버의 친구 리스트에서 제거
        friend.getFriends().remove(reverseFriendship); // 친구 멤버의 친구 리스트에서 제거
    }

    // 친구 관계 찾기 메서드
    private Friend findFriendship(Member member, Member friend) {
        for (Friend friendship : member.getFriends()) {
            if (friendship.getSecondMember().getId() == friend.getId()) {
                return friendship;
            }
        }
        throw new IllegalStateException("친구관계 찾기 실패");
    }
}
