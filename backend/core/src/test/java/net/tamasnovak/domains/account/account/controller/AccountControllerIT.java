package net.tamasnovak.domains.account.account.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import net.tamasnovak.domains.account.account.dto.LoginRequest;
import net.tamasnovak.domains.account.account.dto.ClientAuthContext;
import net.tamasnovak.domains.account.account.dto.LoginResponse;
import net.tamasnovak.domains.account.account.service.AccountService;
import net.tamasnovak.security.authentication.facade.AuthenticationFacade;
import org.junit.jupiter.api.AfterEach;
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

import java.util.Collections;

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

  @AfterEach
  void tearDown() {}

  @Nested
  @DisplayName("findUser() method tests")
  class FindUserMethodTests {
    @Test
    @Description("Returns HttpStatus.OK status and ClientAuthContextDto if no exceptions were thrown.")
    public void shouldReturnHttpStatusOkAndClientAuthContextDto_IfNoExceptionsWereThrown() throws Exception {
      User userDetails = new User("test@user.net", "hashedPassword", Collections.emptyList());
      Mockito.when(authenticationFacade.getUserContext()).thenReturn(userDetails);

      ClientAuthContext clientAuthContext = new ClientAuthContext(
        "test@user.net",
        "Student",
        "ROLE_STUDENT"
      );
      Mockito.when(accountService.getClientAuthContextDto(userDetails.getUsername())).thenReturn(clientAuthContext);

      mockMvc.perform(MockMvcRequestBuilders.get("/api/accounts/me"))
        .andExpect(MockMvcResultMatchers.status().isOk());
    }
  }

  @Nested
  @DisplayName("loginUser() method tests")
  class LoginUserMethodTests {
    @Test
    @Description("Returns HttpStatus.OK status and LoginReturnDto if no exceptions were thrown.")
    public void shouldReturnHttpStatusOkAndLoginReturnDto_IfNoExceptionsWereThrown() throws Exception {
      LoginRequest requestBody = new LoginRequest(
        "test@user.net",
        "hashedPassword"
      );

      Authentication authentication = new UsernamePasswordAuthenticationToken(
        "test@user.net",
        "hashedPassword",
        Collections.singletonList(new SimpleGrantedAuthority("ROLE_STUDENT"))
      );
      Mockito.when(authenticationFacade.authenticateUser(requestBody.email(), requestBody.password())).thenReturn(authentication);

      LoginResponse loginResponse = Mockito.mock(LoginResponse.class);
      Mockito.when(accountService.getLoginReturnDto(requestBody, authentication)).thenReturn(loginResponse);

      mockMvc.perform(MockMvcRequestBuilders.post("/api/accounts/login")
        .content(objectMapper.writeValueAsString(requestBody))
        .contentType(MediaType.APPLICATION_JSON))
        .andExpect(MockMvcResultMatchers.status().isOk());
    }

    @Test
    @Description("HttpStatus.BAD_REQUEST status is correctly asserted if there is invalid data in RequestBody's fields.")
    public void shouldReturnHttpStatusBadRequest_IfMethodArgumentNotValidExceptionWasThrownInRequestBody() throws Exception {
      LoginRequest requestBody = new LoginRequest(
        "invalid@email",
        ""
      );

      mockMvc.perform(MockMvcRequestBuilders.post("/api/accounts/login")
        .content(objectMapper.writeValueAsString(requestBody))
        .contentType(MediaType.APPLICATION_JSON))
        .andExpect(MockMvcResultMatchers.status().isBadRequest());
    }
  }
}
