package com.informationsystem.library.handler;

import com.informationsystem.library.model.APIRoutes;
import com.informationsystem.library.model.Role;

import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.Getter;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationSuccessHandler;

import java.io.IOException;
import java.util.Collection;

public class CustomAuthenticationSuccessHandler implements AuthenticationSuccessHandler {

    private final String USER_SUCCESSFUL_URL = APIRoutes.EMPLOYEE_BIN_CONTROLLER_MAPPING + "/data?page=0&results=10";

    private final String ADMIN_SUCCESSFUL_URL = APIRoutes.ADMIN_CONTROLLER_MAPPING + "/detailed_history/all?page=0&results=10";

    @Getter
    private SimpleUrlAuthenticationSuccessHandler userSuccessHandler =
            new SimpleUrlAuthenticationSuccessHandler(USER_SUCCESSFUL_URL);

    @Getter
    private SimpleUrlAuthenticationSuccessHandler adminSuccessHandler =
            new SimpleUrlAuthenticationSuccessHandler(ADMIN_SUCCESSFUL_URL);

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response,
                                        Authentication authentication) throws IOException, ServletException {
        Collection<? extends GrantedAuthority> authorities = authentication.getAuthorities();
        String authorityName = "";
        for(final GrantedAuthority grantedAuthority : authorities){
            authorityName = grantedAuthority.getAuthority();
        }
        if (authorityName.equals(Role.ADMIN.name()))
            adminSuccessHandler.onAuthenticationSuccess(request, response, authentication);
        else
            userSuccessHandler.onAuthenticationSuccess(request, response, authentication);
    }

}
