package net.tamasnovak.services.email;

import net.tamasnovak.dtos.email.NewEmailDto;

public interface EmailSender {
  void sendEmail(NewEmailDto newEmailDto);
}
