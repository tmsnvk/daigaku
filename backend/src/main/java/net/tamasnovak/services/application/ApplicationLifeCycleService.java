package net.tamasnovak.services.application;

import net.tamasnovak.entities.account.Account;

public interface ApplicationLifeCycleService<R, T, U> {
  R create(Account account, T requestBody);
  R updateByUuid(String applicationUuid, U requestBody);
}
