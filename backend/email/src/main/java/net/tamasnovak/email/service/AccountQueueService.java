package net.tamasnovak.email.service;

import net.tamasnovak.rabbitmq.models.emailQueue.PendingAccountConfirmationQueue;

public interface AccountQueueService {
	void onPendingAccountRegistration(PendingAccountConfirmationQueue queueDto);
}
