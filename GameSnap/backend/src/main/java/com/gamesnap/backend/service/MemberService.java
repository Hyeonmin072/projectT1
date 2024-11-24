package com.gamesnap.backend.service;

import java.io.IOException;
import java.util.*;

import com.amazonaws.services.s3.AmazonS3Client;
import com.amazonaws.services.s3.model.ObjectMetadata;
import com.gamesnap.backend.dto.*;
import com.gamesnap.backend.entity.*;
import com.gamesnap.backend.repository.*;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;


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
    @Autowired
    private MessageRoomRepository messageRoomRepository;
    @Autowired
    private MessageRepository messageRepository;
    @Autowired
    private MessageRoomMemberRepository messageRoomMemberRepository;
    @Value("${cloud.aws.s3.bucket}")
    private String bucket;
    @Autowired
    private AmazonS3Client amazonS3Client;
    @Autowired
    private FriendRequestRepository friendRequestRepository;

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

    public ResponseEntity<ProfileUpdateGamesResponseDto> updateGames(List<Integer> gamesId, Integer memberId){
        Member member = findId(memberId); // 해당맴버찾기
        List<Integer> responseId = new ArrayList<>();  //응답할 Id
        List<String> responseName = new ArrayList<>(); //응답할 name
        memberGameRepository.deleteAllByMember(member); //기존 맴버게임리스트 전부삭제

        for (int i = 0; i < gamesId.size(); i++) {
            Optional<Game> game = gameRepository.findById(gamesId.get(i));
            if(game.isEmpty()){continue;}

            memberGameRepository.save(new MemberGame(member,game.get())); //디비저장

            responseId.add(game.get().getId());
            responseName.add(game.get().getName());

        }

        ProfileUpdateGamesResponseDto profileUpdateGamesResponseDto = new ProfileUpdateGamesResponseDto(responseId,responseName);
        return ResponseEntity.status(200).body(profileUpdateGamesResponseDto);

    }

    public ResponseEntity<String> updateContent(String content,Integer memberId){
        Member member = findId(memberId);

        member.MemberUpdateContent(content);
        return ResponseEntity.status(200).body(member.getContent());
    }

    public ResponseEntity<String> updateName(String name, Integer memberId){
        Member member = findId(memberId);

        member.MemberUpdateName(name);
        return ResponseEntity.status(200).body(member.getName());
    }

    public ResponseEntity<String> updateImage(MultipartFile file,Integer memberId){
        Member member = findId(memberId);

        String fileName = "Image/"+member.getId()+"/"+file.getOriginalFilename();
        String fileUrl = "https://"+bucket+".s3.ap-northeast-2.amazonaws.com/"+fileName;
        try{
            if(amazonS3Client.doesObjectExist(bucket,member.getImage())){
                amazonS3Client.deleteObject(bucket,member.getImage());
            }

            ObjectMetadata metadata = new ObjectMetadata();
            metadata.setContentType(file.getContentType());
            metadata.setContentLength(file.getSize());
            amazonS3Client.putObject(bucket,fileName,file.getInputStream(),metadata);

            member.MemberUpdateImage(fileUrl);
            return ResponseEntity.status(200).body(fileUrl);
        } catch (IOException e){
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }


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
        //친구와 관련된 채팅방 찾기
        Optional<MessageRoom> optionalFindMessageRoom = messageRoomRepository.findByMembers(myId, friendId);
        if (optionalFindMessageRoom.isPresent()) {
            MessageRoom findMessageRoom = optionalFindMessageRoom.get(); // 채팅방 꺼내기
            findMessageRoom.changeLastMsg(null); //채팅방의 마지막 메시지를 널로 바꿔주면서, 제약조건을 제거한다
            messageRepository.deleteByMessageRoom(findMessageRoom); // 채팅방의 모든 메시지 삭제
            messageRoomMemberRepository.deleteByMessageRoom(findMessageRoom); // 채팅방의 모든 멤버 삭제
            messageRoomRepository.delete(findMessageRoom); // 채팅방 삭제
        }


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

    public ResponseEntity<List<MemberSimpleDto>> searchFriendRequests(Integer myId) {
        Member member = null;
        Optional<Member> optionalMember = memberRepository.findById(myId); // 아이디로 멤버 조회
        if (optionalMember.isEmpty()) { // 찾지 못하면 오류 반환
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(List.of());
        } else { // 찾으면 실제 값 대입
            member = optionalMember.get();
        }

        List<MemberSimpleDto> memberSimpleDtos = friendRequestRepository.findByReceiverId(myId); // 해당 멤버가 받은 친구 요청 찾기

        return ResponseEntity.ok(memberSimpleDtos); // 찾은 결과를 ResponseEntity에 담아 반환
    }

    public ResponseEntity<String> sendFriendRequest(Integer myId, Integer receiveMemberId) { // 친구 요청 보내기
        Member me = null; // 나
        Member targetMember = null; // 보낼 상대
        if (memberRepository.findById(myId).isEmpty() || memberRepository.findById(receiveMemberId).isEmpty()) { // 둘 중 하나를 찾지 못하면 오류 반환
            ResponseEntity.status(HttpStatus.NOT_FOUND).body("유저 조회 중 오류가 발생하였습니다.");
        } else { // 둘 다 성공적으로 찾으면 변수에 실제 값 대입
            me = memberRepository.findById(myId).get();
            targetMember = memberRepository.findById(receiveMemberId).get();
        }

        Optional<FriendRequest> findResult = friendRequestRepository.findBySenderAndReceiver(myId, receiveMemberId);// 이미 요청이 있는지 확인
        log.info("결과값 : {}",findResult);
        if(findResult.isPresent()) { //이미 요청이 있으면 오류 반환
            return ResponseEntity.status(HttpStatus.CONFLICT).body("이미 친구 요청을 보냈습니다.");
        }

        FriendRequest friendRequest = new FriendRequest(me, targetMember); // 요청이 없으므로, 친구 요청 객체 생성

        friendRequestRepository.save(friendRequest); // 객체를 저장

        return ResponseEntity.ok("친구 요청이 완료되었습니다."); // 성공 결과 반환
    }

    public ResponseEntity<String> deleteFriendRequest(Integer myId, Integer sendMemberId) { // 나에게 온 친구 요청 삭제하기
        Member me = null; // 나
        Member sendMember = null; //
        if (memberRepository.findById(myId).isEmpty() || memberRepository.findById(sendMemberId).isEmpty()) { // 둘 중 하나를 찾지 못하면 오류 반환
            ResponseEntity.status(HttpStatus.NOT_FOUND).body("유저 조회 중 오류가 발생하였습니다.");
        } else { // 둘 다 있으면 실제 값 대입
            me = memberRepository.findById(myId).get();
            sendMember = memberRepository.findById(sendMemberId).get();
        }

        Optional<FriendRequest> findResult = friendRequestRepository.findBySenderAndReceiver(sendMemberId, myId);// 해당 friendRequest 찾기

        if (findResult.isEmpty()) { // 찾지 못하면 오류 반환
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("해당 요청을 찾을 수 없습니다.");
        } else { // 찾았다면, 해당 친구 요청 삭제
            friendRequestRepository.delete(findResult.get());
        }


        return ResponseEntity.ok("삭제가 성공적으로 진행되었습니다.");

    }
}
