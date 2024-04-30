package net.tamasnovak.controllers.account.pendingAccount;

import com.fasterxml.jackson.databind.ObjectMapper;
import net.tamasnovak.dtos.account.request.PendingAccountRegistrationDto;
import net.tamasnovak.repositories.account.PendingAccountRepository;
import net.tamasnovak.services.account.pendingAccount.PendingAccountService;
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
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;

import java.util.UUID;

@WebMvcTest(controllers = PendingAccountController.class)
@AutoConfigureMockMvc(addFilters = false)
class PendingAccountControllerTest {
  @Autowired
  private MockMvc mockMvc;
  @Autowired
  private ObjectMapper objectMapper;
  @MockBean
  private PendingAccountService pendingAccountService;
  @MockBean
  private PendingAccountRepository pendingAccountRepository;

  @AfterEach
  void tearDown() {
    pendingAccountRepository.deleteAll();
    Mockito.reset(pendingAccountService);
  }

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
        UUID.randomUUID().toString()
      );

      mockMvc.perform(MockMvcRequestBuilders.post("/api/pending-accounts/register")
        .content(objectMapper.writeValueAsString(requestBody))
        .contentType(MediaType.APPLICATION_JSON))
        .andExpect(MockMvcResultMatchers.status().isCreated());
    }

    @Test
    @Description("HttpStatus.BAD_REQUEST status is correctly asserted if there is invalid data in RequestBody's fields.")
    public void shouldReturnHttpStatusBadRequest_IfMethodArgumentNotValidExceptionWasThrownInFirstNameField() throws Exception {
      PendingAccountRegistrationDto requestBody = new PendingAccountRegistrationDto(
        "1nv4l1d Student",
        "",
        "invalid@email",
        "UUID.randomUUID().toString()"
      );

      mockMvc.perform(MockMvcRequestBuilders.post("/api/pending-accounts/register")
        .content(objectMapper.writeValueAsString(requestBody))
        .contentType(MediaType.APPLICATION_JSON))
        .andExpect(MockMvcResultMatchers.status().isBadRequest());
    }
  }
}
