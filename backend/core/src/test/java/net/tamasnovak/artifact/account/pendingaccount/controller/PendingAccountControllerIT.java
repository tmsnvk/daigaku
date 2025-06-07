/**
 * Copyright © [Daigaku].
 *
 * @author tmsnvk
 */

package net.tamasnovak.artifact.account.pendingaccount.controller;

import java.util.UUID;

import com.fasterxml.jackson.databind.ObjectMapper;
import net.tamasnovak.artifact.account.pendingaccount.dto.CreatePendingAccountPayload;
import net.tamasnovak.artifact.account.pendingaccount.service.PendingAccountService;
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

@WebMvcTest(controllers = PendingAccountController.class)
@AutoConfigureMockMvc(addFilters = false)
class PendingAccountControllerIT {
  @Autowired
  private MockMvc mockMvc;

  @Autowired
  private ObjectMapper objectMapper;

  @MockBean
  private PendingAccountService pendingAccountService;

  private final String validUuidString = UUID.randomUUID().toString();

  @Nested
  @DisplayName("registerUser() method tests")
  class RegisterUserITests {
    @Test
    @Description("HttpStatus.CREATED status is correctly asserted if no exceptions were thrown.")
    public void shouldReturnHttpStatusCreated_IfNoExceptionsWereThrown() throws Exception {
      CreatePendingAccountPayload requestBody = new CreatePendingAccountPayload("Student", "Test User", "student@test.net",
        validUuidString, validUuidString);

      mockMvc.perform(MockMvcRequestBuilders.post("/api/v1/pending-accounts/create")
                                            .content(objectMapper.writeValueAsString(requestBody))
                                            .contentType(MediaType.APPLICATION_JSON))
             .andExpect(MockMvcResultMatchers.status().isCreated());
    }

    @Test
    @Description("HttpStatus.BAD_REQUEST status is correctly asserted if there is invalid data in the requestBody's fields.")
    public void shouldReturnHttpStatusBadRequest_IfMethodArgumentNotValidExceptionWasThrownInRequestBody() throws Exception {
      /**
       * It is not possible to test invalid UUID here as it fails with a Jackson JsonMappingException when the test tries to use the
       * requestBody. However, this would never happen on the running application as the object would come from the frontend.
       * Invalid UUIDs are tested in {@link PendingAccountServiceImplTest} as unit tests.
       */
      CreatePendingAccountPayload requestBody = new CreatePendingAccountPayload("1nv4l1d Student", "", "invalid@email",
        validUuidString, validUuidString);

      mockMvc.perform(MockMvcRequestBuilders.post("/api/v1/pending-accounts/create")
                                            .content(objectMapper.writeValueAsString(requestBody))
                                            .contentType(MediaType.APPLICATION_JSON))
             .andExpect(MockMvcResultMatchers.status().isBadRequest());
    }
  }
}
