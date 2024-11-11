package com.gamesnap.backend.service;

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
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class VideoService {


    @Autowired
    private VideoLikeRepository videoLikeRepository;
    @Autowired
    private GameRepository gameRepository;
    @Autowired
    private VideoRepository videoRepository;
    @Autowired
    private MemberRepository memberRepository;


    public List<Video> getRandomVideos(List<Integer> gamesId) {

        List<Video> responseVideos = new ArrayList<>();
        for (int i = 0; i < gamesId.size(); i++) {
            Optional<Game> findGame = gameRepository.findById(gamesId.get(i));
            if(findGame.isPresent()){
                Game game = findGame.get();
                List<Video> videos = videoRepository.findByGame(game);
                responseVideos.addAll(videos);
            }
        }
        // 전체 비디오 목록을 가져옵니다.


        // 비디오가 없다면 빈 리스트를 반환
        if (responseVideos.isEmpty()) {
            return List.of();
        }

        // 랜덤하게 비디오를 여러 개 선택할 리스트
        Set<Video> randomVideos = new HashSet<>();
        Random random = new Random();

        // 중복되지 않도록 비디오를 랜덤하게 선택
        while (randomVideos.size() < 1) {
            int randomIndex = random.nextInt(responseVideos.size());
            Video video = responseVideos.get(randomIndex);

            // 이미 리스트에 포함된 비디오가 아니면 추가
            randomVideos.add(video);

        }

        return new ArrayList<>(randomVideos);
    }



    public Video findId(Integer videoId){return videoRepository.findById(videoId).orElse(null);}

}
