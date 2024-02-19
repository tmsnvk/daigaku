package net.tamasnovak.entities;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.validation.constraints.PastOrPresent;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.sql.Timestamp;

@Entity
@Table(name = "countries")
@Getter
@Setter
@NoArgsConstructor
public final class Country {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name = "id", updatable = false, nullable = false)
  private int id;

  @Column(name = "uuid")
  @org.hibernate.validator.constraints.UUID
  private java.util.UUID uuid;

  @Column(name = "created_at", updatable = false)
  @PastOrPresent
  private Timestamp createdAt;

  @Column(name = "last_updated_at")
  @PastOrPresent
  private Timestamp lastUpdatedAt;

  @Column(name = "name")
  private String name;

  public Country(String name) {
    this.name = name;
  }
}
