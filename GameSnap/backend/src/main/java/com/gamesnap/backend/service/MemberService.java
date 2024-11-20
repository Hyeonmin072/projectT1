package com.gamesnap.backend.service;

import java.util.*;

import com.gamesnap.backend.dto.MemberResponseDto;
import com.gamesnap.backend.dto.MemberSimpleDto;
import com.gamesnap.backend.dto.UpdateProfileRequestDto;
import com.gamesnap.backend.dto.UpdateProfileResponseDto;
import com.gamesnap.backend.entity.Friend;
import com.gamesnap.backend.entity.Game;
import com.gamesnap.backend.entity.MemberGame;
import com.gamesnap.backend.repository.GameRepository;
import com.gamesnap.backend.repository.MemberGameRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.gamesnap.backend.entity.Member;
import com.gamesnap.backend.repository.MemberRepository;


@Service
@Transactional
@Slf4j
public class MemberService {

    @Autowired
    private GameRepository gameRepository;
    @Autowired
    private MemberGameRepository memberGameRepository;
    @Autowired
    private MemberRepository memberRepository;
//    @Autowired
//    private ImageService imageService;

    public ResponseEntity<MemberResponseDto> login(String email, String password) {
        MemberResponseDto memberResponseDto;
        Optional<Member> result = memberRepository.findByEmail(email);//로그인 시, 회원이 가입이 되어 있는지 확인

        if (result.isEmpty()) { //이 이메일로 가입한 회원 없음, 로그인 실패!
            return ResponseEntity.status(401).body(null);
        }

        Member member = result.get(); //멤버를 꺼냄
        if (member.getPassword().equals(password)) {//입력받은 패스워드가 이메일로 찾은 회원의 이메일과 같으면 성공
            List<Integer> gamesId = getMemberGameId(member);
            List<String> gamesName = getMemberGameName(member);


            memberResponseDto = new MemberResponseDto(member.getId(),member.getEmail(),member.getPassword(),member.getName(),member.getTel(),member.getImage(),member.getContent(),
                    gamesId,gamesName
            );
            return ResponseEntity.ok(memberResponseDto);
        } else { // 아니면 실패
            return ResponseEntity.status(401).body(null);
        }
    }

    public String register(Member member) {

        Optional<Member> result = memberRepository.findByEmail(member.getEmail());
        Member checkMember=null;
        if(result.isPresent()){
            checkMember = result.get();
        }


        String email = member.getEmail();
        String password = member.getPassword();
        String name = member.getName();
        String tel = member.getTel();


        if(email == null && !email.matches("^[A-Za-z0-9+_.-]+@(.+)$")){
            return "유효하지 않은 이메일입니다.";
        }
        if(password == null && password.length() < 8){
            return "비밀번호는 최소 8자 이상이어야 합니다.";
        }
        if(name == null || name.isEmpty()){
            return "이름을 입력해야 합니다.";
        }
        if(tel == null || tel.isEmpty()){
            return "전화번호를 입력해야 합니다.";
        }
        if(checkMember != null &&  checkMember.getEmail().equals(email)){
            return "이미 사용중인 이메일입니다.";
        }

        this.memberRepository.save(member);
        return null;
    }

    public ResponseEntity<Map<String, Object>> nameCheck(String name) {
        Optional<Member> result = memberRepository.findByName(name);

        Map<String, Object> response = new HashMap<>();
        if (result.isEmpty()) { // 중복되는 닉네임이 없으므로 사용 가능
            response.put("available", true);
            response.put("message", "사용 가능한 닉네임입니다.");
        } else { // 닉네임이 중복됨
            response.put("available", false);
            response.put("message", "이미 존재하는 이름입니다.");
        }
        return ResponseEntity.ok(response);
    }

    public ResponseEntity<UpdateProfileResponseDto> updateProfile(UpdateProfileRequestDto updateProfileRequestDto) {
        // ID로 회원을 찾기
        Member member = findId(updateProfileRequestDto.getId());
        //기존에 있던 해당 멤버가 좋아하는 게임 리스트 찾기
        List<MemberGame> prevMemberGameList = memberGameRepository.findAllByMember(member);
        // 응답으로보내는 용도
        List<Integer> gameIdList = new ArrayList<>();
        List<String> gameNameList = new ArrayList<>();

        // 기존 선호게임 리스트가
        // 요청이 들어온 선호게임 리스트에 포함이 안되면 삭제하기
        for (MemberGame prevMemberGame : prevMemberGameList){
            int prevMemberGameId = prevMemberGame.getGame().getId();
            if(!updateProfileRequestDto.getLikeGamesId().contains(prevMemberGameId)){
                memberGameRepository.delete(prevMemberGame);
            }else{
                gameIdList.add(prevMemberGame.getGame().getId());
                gameNameList.add(prevMemberGame.getGame().getName());
            }
        }

        // 요청이 들어온 선호 게임 리스트가
        // 기존 리스트에 포함이 안되어있으면 추가하기
        for(Integer GameId  : updateProfileRequestDto.getLikeGamesId()){
            Game game = gameRepository.findById(GameId).orElse(null);
            if(!memberGameRepository.findByGameAndMember(game,member).isPresent()){
                MemberGame memberGame = new MemberGame(member,game);
                memberGameRepository.save(memberGame);
                gameIdList.add(game.getId());
                gameNameList.add(game.getName());
            }
        }

        // memberUpdate 메서드 호출하여 회원 정보 업데이트
        member.MemberUpdate(
                updateProfileRequestDto.getName(),
                updateProfileRequestDto.getContent());


        UpdateProfileResponseDto responseDto = new UpdateProfileResponseDto(member.getName(),
                member.getContent(),
                gameIdList,
                gameNameList);
        return ResponseEntity.status(200).body(responseDto);

    }



    // 회원 정보 저장 메소드
    public Member save(Member member) {
        return memberRepository.save(member);
    }

    // 회원 정보 조회 메소드
    public Member findId(Integer memberId) {
        return memberRepository.findById(memberId).orElse(null); // Optional 처리
    }
    // 멤버 객체로 멤버게임 아이디 찾기 메소드
    public List<Integer> getMemberGameId(Member member){
        List<Integer> data = new ArrayList<>();
        for (MemberGame memberGame : member.getMemberGames()){
            data.add(memberGame.getGame().getId());
        }
        return data;
    }
    // 멤버 객체로 멤버게임 이름 찾기 메소드
    public List<String> getMemberGameName(Member member){
        List<String> data = new ArrayList<>();
        for (MemberGame memberGame : member.getMemberGames()){
            data.add(memberGame.getGame().getName());
        }
        return data;
    }

    public List<MemberSimpleDto> searchFriendsByName(String memberName, Integer myId) {
        List<Member> findResult = memberRepository.findByNameContaining(memberName);
        if (findResult.isEmpty()) {
            return List.of();
        }



        List<MemberSimpleDto> memberSimpleDtos = new ArrayList<>();
        for (Member member : findResult) {
            MemberSimpleDto memberSimpleDto = new MemberSimpleDto(member.getId(), member.getName());
            memberSimpleDtos.add(memberSimpleDto);
            if(myId == member.getId()){
                memberSimpleDtos.remove(memberSimpleDto);
            }
        }
        return memberSimpleDtos;
    }

    public List<MemberSimpleDto> searchFriend(Integer myId) {
        Optional<Member> optionalMember = memberRepository.findById(myId);
        if (optionalMember.isEmpty()) {
            return List.of();
        }
        Member member = optionalMember.get();
        List<Friend> friends = member.getFriends();

        List<MemberSimpleDto> memberSimpleDtos = new ArrayList<>();

        for (Friend friend : friends) {
            MemberSimpleDto memberSimpleDto = new MemberSimpleDto(friend.getSecondMember().getId(), friend.getSecondMember().getName());
            memberSimpleDtos.add(memberSimpleDto);
        }

        return memberSimpleDtos;
    }

    public ResponseEntity<String> addFriend(Integer myId, Integer friendId) {
        Optional<Member> optionalFirstMember = memberRepository.findById(myId);
        Optional<Member> optionalSecondMember = memberRepository.findById(friendId);
        if (optionalFirstMember.isEmpty() || optionalSecondMember.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("조회 오류");
        }
        Member firstMember = optionalFirstMember.get();
        Member secondMember = optionalSecondMember.get();

        List<Friend> friends = firstMember.getFriends();

        for (Friend friend : friends) {
            if (friend.getSecondMember() == secondMember) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("이미 친구 추가가 되어있음");
            }
        }

        firstMember.addFriend(secondMember);

        return ResponseEntity.ok("친구 추가를 완료했어요!");
    }

    public ResponseEntity<String> deleteFriend(Integer myId, Integer friendId) {
        Optional<Member> optionalFirstMember = memberRepository.findById(myId);
        Optional<Member> optionalSecondMember = memberRepository.findById(friendId);
        if (optionalFirstMember.isEmpty() || optionalSecondMember.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("조회 오류");
        }
        Member firstMember = optionalFirstMember.get();
        Member secondMember = optionalSecondMember.get();

        firstMember.removeFriend(secondMember);

        return ResponseEntity.ok("친구 삭제를 완료했어요!");
    }
}
