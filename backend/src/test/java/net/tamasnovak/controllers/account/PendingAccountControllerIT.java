package net.tamasnovak.controllers.account;

import com.fasterxml.jackson.databind.ObjectMapper;
import net.tamasnovak.dtos.account.request.PendingAccountRegistrationDto;
import net.tamasnovak.repositories.account.baseAccount.PendingAccountRepository;
import net.tamasnovak.services.account.baseAccount.pendingAccount.PendingAccountService;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.context.annotation.Description;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;

import java.util.UUID;

@WebMvcTest(controllers = PendingAccountController.class)
@AutoConfigureMockMvc(addFilters = false)
class PendingAccountControllerIT {
  @Autowired
  private MockMvc mockMvc;

  @Autowired
  private ObjectMapper objectMapper;

  @MockBean
  private PendingAccountService pendingAccountService;

  @MockBean
  private PendingAccountRepository pendingAccountRepository;

  private final String validUuidString = UUID.randomUUID().toString();

  @Nested
  @DisplayName("register() method tests")
  class RegisterMethodIntegrationTests {
    @Test
    @Description("HttpStatus.CREATED status is correctly asserted if no exceptions were thrown.")
    public void shouldReturnHttpStatusCreated_IfNoExceptionsWereThrown() throws Exception {
      PendingAccountRegistrationDto requestBody = new PendingAccountRegistrationDto(
        "Student",
        "Test User",
        "student@test.net",
        validUuidString,
        validUuidString
      );

      mockMvc.perform(MockMvcRequestBuilders.post("/api/pending-accounts/register")
        .content(objectMapper.writeValueAsString(requestBody))
        .contentType(MediaType.APPLICATION_JSON))
        .andExpect(MockMvcResultMatchers.status().isCreated());
    }

    @Test
    @Description("HttpStatus.BAD_REQUEST status is correctly asserted if there is invalid data in requestBody's fields.")
    public void shouldReturnHttpStatusBadRequest_IfMethodArgumentNotValidExceptionWasThrownInRequestBody() throws Exception {
      PendingAccountRegistrationDto requestBody = new PendingAccountRegistrationDto(
        "1nv4l1d Student",
        "",
        "invalid@email",
        "validUuidString",
        "validUuidString"
      );

      mockMvc.perform(MockMvcRequestBuilders.post("/api/pending-accounts/register")
        .content(objectMapper.writeValueAsString(requestBody))
        .contentType(MediaType.APPLICATION_JSON))
        .andExpect(MockMvcResultMatchers.status().isBadRequest());
    }
  }
}
