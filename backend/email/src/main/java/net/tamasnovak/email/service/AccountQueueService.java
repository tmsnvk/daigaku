package net.tamasnovak.email.service;

import net.tamasnovak.rabbitmq.models.emailQueue.PendingAccountConfirmationQueueDto;

public interface AccountQueueService {
	void onPendingAccountRegistration(PendingAccountConfirmationQueueDto queueDto);
}
