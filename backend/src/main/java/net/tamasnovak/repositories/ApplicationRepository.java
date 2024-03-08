package net.tamasnovak.repositories;

import net.tamasnovak.entities.application.Application;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ApplicationRepository extends JpaRepository<Application, Integer> {

}
