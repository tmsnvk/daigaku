package net.tamasnovak.services.account.baseAccount;

public interface AccountLifeCycleService<T> {
  void create(T requestBody);
}
