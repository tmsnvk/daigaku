/**
 * Copyright © [Daigaku].
 *
 * @author tmsnvk
 */

package net.tamasnovak.configuration.audit;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.domain.AuditorAware;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

/**
 * {@link AuditConfiguration} configuration class.
 */
@Configuration
@EnableJpaAuditing(auditorAwareRef = "auditorProvider")
public class AuditConfiguration {
  /**
   * Instantiates an {@link ApplicationAuditAware} Spring Bean on application start.
   *
   * @return {@link ApplicationAuditAware}.
   */
  @Bean
  public AuditorAware<String> auditorProvider() {
    return new ApplicationAuditAware();
  }
}
