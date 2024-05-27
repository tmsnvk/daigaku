package net.tamasnovak.services.status;

import net.tamasnovak.dtos.status.StatusSelectOptionView;
import net.tamasnovak.entities.base.status.BaseStatusEntity;

import java.util.List;

public interface CoreStatusService<T extends BaseStatusEntity> {
  T getByUuid(String uuid);
  T getByName(String statusName);
  List<StatusSelectOptionView> getAllSelectOptionViews();
}
