package net.tamasnovak.services.account.baseAccount;

public interface AccountLifeCycle<T> {
  void createAccount(T requestBody);
}
