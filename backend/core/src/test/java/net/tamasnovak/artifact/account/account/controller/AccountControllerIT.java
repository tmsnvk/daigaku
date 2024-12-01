/**
 * Copyright © [Daigaku].
 * This file contains proprietary code.
 * Unauthorized copying, modification, or distribution of this file, whether in whole or in part is prohibited.
 *
 * @author tmsnvk
 */

package net.tamasnovak.artifact.account.account.controller;

import java.util.Collections;

import com.fasterxml.jackson.databind.ObjectMapper;
import net.tamasnovak.artifact.account.account.dto.AuthContextResponse;
import net.tamasnovak.artifact.account.account.dto.LoginRequest;
import net.tamasnovak.artifact.account.account.dto.LoginResponse;
import net.tamasnovak.artifact.account.account.service.AccountService;
import net.tamasnovak.security.authentication.facade.AuthenticationFacade;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.context.annotation.Description;
import org.springframework.http.MediaType;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;

import static org.mockito.Mockito.when;

@WebMvcTest(controllers = AccountController.class)
@AutoConfigureMockMvc(addFilters = false)
class AccountControllerIT {
  @Autowired
  private MockMvc mockMvc;

  @Autowired
  private ObjectMapper objectMapper;

  @MockBean
  private AuthenticationFacade authenticationFacade;

  @MockBean
  private AccountService accountService;

  @Nested
  @DisplayName("fetchAuthContextResponse() method tests")
  class FetchAuthContextResponseITests {
    @Test
    @Description("Returns HttpStatus.OK status and AuthContextResponse instance if no exceptions were thrown.")
    public void shouldReturnHttpStatusOkAndAuthContextResponse_IfNoExceptionsWereThrown() throws Exception {
      User userDetails = new User("test@user.net", "hashedPassword", Collections.emptyList());
      when(authenticationFacade.getUserContext()).thenReturn(userDetails);

      AuthContextResponse authContextResponse = new AuthContextResponse("test@user.net", "Student", "ROLE_STUDENT");
      when(accountService.fetchAuthContextResponse(userDetails.getUsername())).thenReturn(authContextResponse);

      mockMvc.perform(MockMvcRequestBuilders.get("/api/v1/accounts/me"))
             .andExpect(MockMvcResultMatchers.status().isOk());
    }
  }

  @Nested
  @DisplayName("logInUser() method tests")
  class LogInUserITests {
    @Test
    @Description("Returns HttpStatus.OK status and LoginResponse instance if no exceptions were thrown.")
    public void shouldReturnHttpStatusOkAndLoginResponse_IfNoExceptionsWereThrown() throws Exception {
      LoginRequest requestBody = new LoginRequest("test@user.net", "hashedPassword");

      Authentication authentication = new UsernamePasswordAuthenticationToken("test@user.net", "hashedPassword",
        Collections.singletonList(new SimpleGrantedAuthority("ROLE_STUDENT")));
      when(authenticationFacade.authenticateUser(requestBody.email(), requestBody.password())).thenReturn(authentication);

      LoginResponse loginResponse = Mockito.mock(LoginResponse.class);
      when(accountService.fetchLoginResponse(requestBody, authentication)).thenReturn(loginResponse);

      mockMvc.perform(MockMvcRequestBuilders.post("/api/v1/accounts/log-in")
                                            .content(objectMapper.writeValueAsString(requestBody))
                                            .contentType(MediaType.APPLICATION_JSON))
             .andExpect(MockMvcResultMatchers.status().isOk());
    }

    @Test
    @Description("HttpStatus.BAD_REQUEST status is correctly asserted if there is invalid data in the requestBody's fields.")
    public void shouldReturnHttpStatusBadRequest_IfMethodArgumentNotValidExceptionWasThrownInRequestBody() throws Exception {
      LoginRequest requestBody = new LoginRequest("invalid@email", "");

      mockMvc.perform(MockMvcRequestBuilders.post("/api/v1/accounts/log-in")
                                            .content(objectMapper.writeValueAsString(requestBody))
                                            .contentType(MediaType.APPLICATION_JSON))
             .andExpect(MockMvcResultMatchers.status().isBadRequest());
    }
  }
}
