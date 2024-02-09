package net.tamasnovak.dtos.account;

import net.tamasnovak.dtos.account.response.AccountDataDto;
import net.tamasnovak.security.JwtResponse;

public record AccountLoginReturnDto(
  AccountDataDto accountDataDto,
  JwtResponse jwtResponse
) {}
