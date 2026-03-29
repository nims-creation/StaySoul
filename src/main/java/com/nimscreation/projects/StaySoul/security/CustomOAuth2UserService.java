package com.nimscreation.projects.StaySoul.security;

import com.nimscreation.projects.StaySoul.entity.User;
import com.nimscreation.projects.StaySoul.entity.enums.Roles;
import com.nimscreation.projects.StaySoul.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;

import java.util.Set;

@Service
@RequiredArgsConstructor
@Slf4j
public class CustomOAuth2UserService extends DefaultOAuth2UserService {

    private final UserRepository userRepository;

    @Override
    public OAuth2User loadUser(OAuth2UserRequest userRequest) throws OAuth2AuthenticationException {
        OAuth2User oAuth2User = super.loadUser(userRequest);

        String email = oAuth2User.getAttribute("email");
        String name = oAuth2User.getAttribute("name");

        log.info("OAuth2 login attempt for email: {}", email);

        // Find existing user or create a new one
        User user = userRepository.findByEmail(email).orElse(null);

        if (user == null) {
            log.info("Creating new user from OAuth2 login: {}", email);
            User newUser = new User();
            newUser.setEmail(email);
            newUser.setName(name);
            newUser.setPassword(""); // OAuth users don't need a password
            newUser.setRoles(Set.of(Roles.GUEST));
            userRepository.save(newUser);
        }

        return oAuth2User;
    }
}
