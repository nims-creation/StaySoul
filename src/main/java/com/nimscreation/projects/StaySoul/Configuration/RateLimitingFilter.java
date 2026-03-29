package com.nimscreation.projects.StaySoul.Configuration;

import io.github.bucket4j.Bandwidth;
import io.github.bucket4j.Bucket;
import jakarta.servlet.*;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.core.annotation.Order;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.time.Duration;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

@Component
@Order(1)
public class RateLimitingFilter implements Filter {

    private final Map<String, Bucket> bucketCache = new ConcurrentHashMap<>();

    private Bucket createNewBucket() {
        Bandwidth limit = Bandwidth.builder()
                .capacity(50)
                .refillGreedy(50, Duration.ofMinutes(1))
                .build();
        return Bucket.builder().addLimit(limit).build();
    }

    private Bucket resolveBucket(String clientIp) {
        return bucketCache.computeIfAbsent(clientIp, key -> createNewBucket());
    }

    @Override
    public void doFilter(ServletRequest servletRequest, ServletResponse servletResponse, FilterChain filterChain)
            throws IOException, ServletException {

        HttpServletRequest httpRequest = (HttpServletRequest) servletRequest;
        HttpServletResponse httpResponse = (HttpServletResponse) servletResponse;

        String clientIp = getClientIp(httpRequest);
        Bucket bucket = resolveBucket(clientIp);

        if (bucket.tryConsume(1)) {
            // Add rate limit headers
            httpResponse.addHeader("X-Rate-Limit-Remaining",
                    String.valueOf(bucket.getAvailableTokens()));
            filterChain.doFilter(servletRequest, servletResponse);
        } else {
            httpResponse.setStatus(HttpStatus.TOO_MANY_REQUESTS.value());
            httpResponse.setContentType("application/json");
            httpResponse.getWriter().write(
                    "{\"error\": \"Too many requests. Please try again later.\", \"status\": 429}"
            );
        }
    }

    private String getClientIp(HttpServletRequest request) {
        String xForwardedFor = request.getHeader("X-Forwarded-For");
        if (xForwardedFor != null && !xForwardedFor.isEmpty()) {
            return xForwardedFor.split(",")[0].trim();
        }
        return request.getRemoteAddr();
    }
}
