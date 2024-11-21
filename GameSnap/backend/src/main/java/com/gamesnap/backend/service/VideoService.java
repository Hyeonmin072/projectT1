package com.gamesnap.backend.service;

import com.amazonaws.services.s3.AmazonS3Client;
import com.amazonaws.services.s3.model.ObjectMetadata;
import com.gamesnap.backend.dto.LikeStatusResponseDto;
import com.gamesnap.backend.entity.Game;
import com.gamesnap.backend.entity.Member;
import com.gamesnap.backend.entity.Video;
import com.gamesnap.backend.entity.VideoLike;
import com.gamesnap.backend.repository.GameRepository;
import com.gamesnap.backend.repository.MemberRepository;
import com.gamesnap.backend.repository.VideoLikeRepository;
import com.gamesnap.backend.repository.VideoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.*;

@Service
public class VideoService {

    @Autowired
    private AmazonS3Client amazonS3Client;
    @Value("${cloud.aws.s3.bucket}")
    private String bucket;
    @Autowired
    private MemberService memberService;
    @Autowired
    private GameService gameService;
    @Autowired
    private VideoLikeRepository videoLikeRepository;
    @Autowired
    private GameRepository gameRepository;
    @Autowired
    private VideoRepository videoRepository;
    @Autowired
    private MemberRepository memberRepository;


    public List<Video> getRandomVideos() {

        // 전체 비디오 목록을 가져옵니다.
        List<Video> responseVideos = videoRepository.findAll();

        // 비디오가 없다면 빈 리스트를 반환
        if (responseVideos.isEmpty()) {
            return List.of();
        }

        // 랜덤하게 비디오를 여러 개 선택할 리스트
        Set<Video> randomVideos = new HashSet<>();
        Random random = new Random();

        // 중복되지 않도록 비디오를 랜덤하게 선택
        while (randomVideos.size() < 3) {
            int randomIndex = random.nextInt(responseVideos.size());
            Video video = responseVideos.get(randomIndex);

            // 이미 리스트에 포함된 비디오가 아니면 추가
            randomVideos.add(video);

        }

        return new ArrayList<>(randomVideos);
    }

    public List<Video> getPreferenceRandomVideos(List<Integer> gamesId) {


        // 선호 게임의 전체 비디오 목록을 가져옵니다.
        List<Video> responseVideos = new ArrayList<>();
        for (int i = 0; i < gamesId.size(); i++) {
            Optional<Game> findGame = gameRepository.findById(gamesId.get(i));
            if(findGame.isPresent()){
                Game game = findGame.get();
                List<Video> videos = videoRepository.findByGame(game);
                responseVideos.addAll(videos);
            }
        }



        // 비디오가 없다면 빈 리스트를 반환
        if (responseVideos.isEmpty()) {
            return List.of();
        }

        // 랜덤하게 비디오를 여러 개 선택할 리스트
        Set<Video> randomVideos = new HashSet<>();
        Random random = new Random();

        // 중복되지 않도록 비디오를 랜덤하게 선택
        while (randomVideos.size() < 2) {
            int randomIndex = random.nextInt(responseVideos.size());
            Video video = responseVideos.get(randomIndex);

            // 이미 리스트에 포함된 비디오가 아니면 추가
            randomVideos.add(video);

        }

        return new ArrayList<>(randomVideos);
    }
    public ResponseEntity<String> uploadFile(MultipartFile file, String fileUrl, String fileName, Integer userId){
        Member member = memberService.findId(userId);
        Game game = gameService.findId(3);
        try{
            ObjectMetadata metadata = new ObjectMetadata();
            metadata.setContentType(file.getContentType());
            metadata.setContentLength(file.getSize());
            amazonS3Client.putObject(bucket,fileName,file.getInputStream(),metadata);

//            Video video = new Video(fileName,"테스트영상",fileUrl,10,member,game);
//            videoRepository.save(video);

            return ResponseEntity.ok(fileUrl);
        }catch (IOException e){
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }



    public Video findId(Integer videoId){return videoRepository.findById(videoId).orElse(null);}

}
