//package com.gamesnap.backend.service;
//
//import org.springframework.beans.factory.annotation.Value;
//import org.springframework.stereotype.Service;
//import org.springframework.web.multipart.MultipartFile;
//
//import java.io.File;
//import java.io.IOException;
//import java.nio.file.Files;
//import java.nio.file.Paths;
//import java.nio.file.StandardCopyOption;
//
//@Service
//public class ImageService {
//
//    @Value("${upload.path}")  // application.properties에서 경로를 설정
//    private String uploadDir;
//
//    public String saveImage(MultipartFile file) throws IOException {
//        // 저장할 파일 경로 설정
//        String fileName = System.currentTimeMillis() + "_" + file.getOriginalFilename();
//        String filePath = uploadDir + File.separator + fileName;
//
//        // 파일 저장
//        File destinationFile = new File(filePath);
//        Files.copy(file.getInputStream(), Paths.get(destinationFile.getAbsolutePath()), StandardCopyOption.REPLACE_EXISTING);
//
//        // 저장된 파일의 URL 반환 (localhost 기준)
//        return "/images/" + fileName;
//    }
//}
