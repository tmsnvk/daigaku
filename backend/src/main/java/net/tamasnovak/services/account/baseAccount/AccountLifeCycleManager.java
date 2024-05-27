package net.tamasnovak.services.account.baseAccount;

public interface AccountLifeCycleManager<T> {
  void create(T requestBody);
}
