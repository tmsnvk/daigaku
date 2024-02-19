package net.tamasnovak.controllers.university;

import net.tamasnovak.dtos.university.UniversityOptionDto;
import net.tamasnovak.entities.University;
import net.tamasnovak.services.university.UniversityService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping(path = "/api/universities")
public class UniversityController {
  public final UniversityService universityService;

  @Autowired
  public UniversityController(UniversityService universityService) {
    this.universityService = universityService;
  }

  @GetMapping(value = "", produces = "application/json")
  @ResponseStatus(HttpStatus.OK)
  public ResponseEntity<List<UniversityOptionDto>> findUser() {
    List<University> universities = universityService.findAll();

    List<UniversityOptionDto> universityOptions = new ArrayList<>();

    universities.forEach((university -> {
      UniversityOptionDto universityOptionDto = new UniversityOptionDto(
        university.getUuid(),
        university.getName(),
        university.getAbbreviation(),
        university.getCountry()
      );

      universityOptions.add(universityOptionDto);
    }));

    return new ResponseEntity<>(universityOptions, HttpStatus.OK);
  }
}
