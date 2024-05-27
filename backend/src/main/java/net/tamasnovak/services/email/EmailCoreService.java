package net.tamasnovak.services.email;

import net.tamasnovak.dtos.email.NewEmailDto;

public interface EmailCoreService {
  void sendSimpleEmail(NewEmailDto newEmailDto);
}
