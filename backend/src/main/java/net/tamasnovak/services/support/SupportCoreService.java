package net.tamasnovak.services.support;

import net.tamasnovak.entities.base.support.BaseSupportEntity;

public interface SupportCoreService<T extends BaseSupportEntity> {
  T getByUuid(String uuid);
}
