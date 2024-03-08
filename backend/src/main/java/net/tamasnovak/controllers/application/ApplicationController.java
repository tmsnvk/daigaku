package net.tamasnovak.controllers.application;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(path = "/api/applications")
@RequiredArgsConstructor
public final class ApplicationController {

}
