package net.tamasnovak.controllers.application;

import net.tamasnovak.dtos.application.ApplicationDto;
import net.tamasnovak.entities.account.Account;
import net.tamasnovak.services.application.application.ApplicationService;
import net.tamasnovak.utilities.authenticationFacade.AuthenticationFacade;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(path = "/api/applications")
public class ApplicationController {
  private final ApplicationService applicationService;
  private final AuthenticationFacade authenticationFacade;

  @Autowired
  public ApplicationController(ApplicationService applicationService, AuthenticationFacade authenticationFacade) {
    this.applicationService = applicationService;
    this.authenticationFacade = authenticationFacade;
  }

  @RequestMapping(
    value = "/{uuid}",
    method = RequestMethod.GET,
    produces = MediaType.APPLICATION_JSON_VALUE
  )
  public ResponseEntity<ApplicationDto> getByUuid(@PathVariable("uuid") String uuid) {
    Account authAccount = authenticationFacade.getAuthenticatedAccount();
    ApplicationDto application = applicationService.findByUuid(uuid, authAccount.getUuid());

    return ResponseEntity
      .status(HttpStatus.OK)
      .body(application);
  }
}
