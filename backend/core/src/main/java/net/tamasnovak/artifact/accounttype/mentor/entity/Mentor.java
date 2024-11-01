/**
 * Copyright © [Daigaku].
 * This file contains proprietary code.
 * Unauthorized copying, modification, or distribution of this file, whether in whole or in part is prohibited.
 *
 * @author tmsnvk
 */

package net.tamasnovak.artifact.accounttype.mentor.entity;

import java.util.ArrayList;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import net.tamasnovak.artifact.account.account.entity.Account;
import net.tamasnovak.artifact.accounttype.common.entity.BaseAccountType;
import net.tamasnovak.artifact.accounttype.student.entity.Student;
import net.tamasnovak.artifact.support.institution.entity.Institution;

/**
 * Entity class that represents the mentors database table.
 *
 * @since 0.0.1
 */
@Entity
@Table(name = "mentors")
public final class Mentor extends BaseAccountType {
  @OneToMany(mappedBy = "mentor")
  @JsonManagedReference(value = "mentor-student_reference")
  private List<Student> students;

  @ManyToOne
  @JoinColumn(name = "institution_id", nullable = false)
  @JsonBackReference(value = "institution-mentor_reference")
  private Institution institution;

  protected Mentor() {
    // Not public as it should not be initialised blank.
    // Cannot be private or package-private as it is an @Entity class.
  }

  private Mentor(Account account) {
    super(account);
    this.students = new ArrayList<>();
  }

  /**
   * The default mentor creator method.
   *
   * @param account The user's account.
   * @return {@link Mentor}
   */
  public static Mentor createMentor(final Account account) {
    return new Mentor(account);
  }
}
