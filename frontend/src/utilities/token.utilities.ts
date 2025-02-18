/**
 * Copyright © [Daigaku].
 *
 * @author tmsnvk
 */

/**
 * Defines the properties of a decoded JWT token string.
 */
interface JwtPayload {
  exp: number;
  iat: number;
  [key: string]: unknown;
}

/**
 * Decodes a base64-encoded JWT token and returns the payload.
 *
 * @param token The JWT token string.
 * @returns the decoded payload object.
 */
const decodeAuthToken = (token: string): JwtPayload => {
  const base64Url = token.split('.')[1];
  const base64 = base64Url.replace('-', '+').replace('_', '/');
  const decodedString = atob(base64);

  return JSON.parse(decodedString);
};

/**
 * Checks if the JWT token has expired.
 *
 * @param token The JWT token string.
 * @returns true if the token is expired, false otherwise.
 */
export const isAuthTokenExpired = (token: string): boolean => {
  try {
    const decoded: JwtPayload = decodeAuthToken(token);
    const expirationTime: number = decoded.exp * 1000;
    const currentTime: number = Date.now();

    return currentTime >= expirationTime;
  } catch (error) {
    return true;
  }
};
