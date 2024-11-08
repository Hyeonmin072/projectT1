package com.gamesnap.backend.service;

import com.gamesnap.backend.entity.Video;
import com.gamesnap.backend.repository.VideoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Random;

@Service
public class VideoService {

    @Autowired
    private VideoRepository videoRepository;


    public List<Video> getRandomVideos() {
        // 전체 비디오 목록을 가져옵니다.
        List<Video> videos = videoRepository.findAll();

        // 비디오가 없다면 빈 리스트를 반환
        if (videos.isEmpty()) {
            return List.of();
        }

        // 랜덤하게 비디오를 여러 개 선택할 리스트
        List<Video> randomVideos = new ArrayList<>();
        Random random = new Random();

        // 중복되지 않도록 비디오를 랜덤하게 선택
        while (randomVideos.size() < 1) {
            int randomIndex = random.nextInt(videos.size());
            Video video = videos.get(randomIndex);

            // 이미 리스트에 포함된 비디오가 아니면 추가
            if (!randomVideos.contains(video)) {
                randomVideos.add(video);
            }
        }

        return randomVideos;
    }

    public Video findId(Integer videoId){return videoRepository.findById(videoId).orElse(null);}

}
