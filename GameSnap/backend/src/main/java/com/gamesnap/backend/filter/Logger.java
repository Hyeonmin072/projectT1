package com.gamesnap.backend.filter;

import jakarta.servlet.*;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;
import org.springframework.web.util.ContentCachingRequestWrapper;
import org.springframework.web.util.ContentCachingResponseWrapper;

import java.io.IOException;
import java.nio.charset.StandardCharsets;

@Slf4j
@Component
public class Logger implements Filter {
    @Override
    public void init(FilterConfig filterConfig) throws ServletException {
        Filter.super.init(filterConfig);
    }

    @Override
    public void doFilter(ServletRequest servletRequest, ServletResponse servletResponse, FilterChain filterChain) throws IOException, ServletException {

        var req = new ContentCachingRequestWrapper((HttpServletRequest) servletRequest);
        var res = new ContentCachingResponseWrapper((HttpServletResponse) servletResponse);


        // 다음 필터 혹은 서블릿으로 요청 전달
        filterChain.doFilter(req,res);

        // 요청 로그
        logRequest(req);

        // 응답 로그
        logResponse(res);

        // 응답 본문 클라이언트에 전달
        res.copyBodyToResponse();

    }

    // 요청 로그 생성
    public void logRequest(ContentCachingRequestWrapper req) throws IOException {
        StringBuilder headers = new StringBuilder();

        req.getHeaderNames().asIterator().forEachRemaining(header -> {
            headers.append("[").append(header).append(" : ").append(req.getHeader(header));
        });

        String requestBody = new String(req.getContentAsByteArray(), StandardCharsets.UTF_8);

        log.info(">>>>>>>>>> uri: {}, method: {}, headers: {}, body: {}",
                req.getRequestURI(), req.getMethod(), headers, requestBody);
    }

    // 응답 로그 생성
    public void logResponse(ContentCachingResponseWrapper res) {
        StringBuilder headers = new StringBuilder();
        res.getHeaderNames().forEach(header -> {
            headers.append("[").append(header).append(" : ").append(res.getHeader(header));
        });

        String responseBody = new String(res.getContentAsByteArray(), StandardCharsets.UTF_8);

        log.info("<<<<<<<<<< Status: {}, HeaderNames: {}, headers: {}, body: {}",
                res.getStatus(), res.getHeaderNames(), headers, responseBody);

    }

    @Override
    public void destroy() {
        Filter.super.destroy();
    }
}
