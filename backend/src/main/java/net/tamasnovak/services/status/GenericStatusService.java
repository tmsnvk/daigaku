package net.tamasnovak.services.status;

import net.tamasnovak.dtos.status.StatusSelectOptionView;
import net.tamasnovak.entities.base.status.BaseStatusEntity;

import java.util.List;

public interface GenericStatusService<T extends BaseStatusEntity> {
  T getStatusByUuid(String uuid);
  List<StatusSelectOptionView> getAllSelectOptionViews();
}
