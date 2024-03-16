package net.tamasnovak.dtos.account.access;

import net.tamasnovak.dtos.account.response.AccountDataDto;

public record AccountGetMeDto(
  AccountDataDto accountDataDto,
  String accountRole
) {}
