/**
 * @prettier
 */

/**
 * Copyright © [Daigaku].
 *
 * @author tmsnvk
 */

export const registerPendingAccountParameters = [
  { firstName: 'Student', lastName: 'User', email: 'new@student.net', institute: 1, role: 1 },
  { firstName: 'Mentor', lastName: 'User', email: 'new@mentor.net', institute: 1, role: 0 },
];

export const logInParameters = [
  { email: 'student@test.net', password: '1', userType: 'student' },
  { email: 'mentor@test.net', password: '1', userType: 'mentor' },
  { email: 'insadmin@test.net', password: '1', userType: 'institution admin' },
  { email: 'sysadmin@test.net', password: '1', userType: 'system admin' },
];

export const resetPasswordParameters = [
  { email: 'student@test.net', userType: 'student' },
  { email: 'mentor@test.net', userType: 'mentor' },
  { email: 'insadmin@test.net', userType: 'institution admin' },
];
