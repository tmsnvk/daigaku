package net.tamasnovak.repositories;

import net.tamasnovak.entities.Country;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CountryRepository extends JpaRepository<Country, Integer> {
  List<Country> findAll();
}
