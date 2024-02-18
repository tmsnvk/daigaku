package net.tamasnovak.dtos.account.access;

import net.tamasnovak.dtos.account.response.AccountDataDto;

import java.util.List;

public record AccountGetMeDto(
  AccountDataDto accountDataDto,
  List<String> accountRoles
) {}
