export function hiddenEmail(email: string) {
  const [username, domain] = email.split('@');
  let hiddenUsername = `${username.slice(0, 2)}***${username.slice(-2)}`;
  let missingChars = username.length - 4;
  let aterish = '*'.repeat(missingChars);
  if (username.length <= 4) {
    missingChars = username.length - 1;
    aterish = '*'.repeat(missingChars);
    hiddenUsername = `${username.slice(0, 1)}${aterish}`;
  } else {
    hiddenUsername = `${username.slice(0, 2)}${aterish}${username.slice(-2)}`;
  }
  return `${hiddenUsername}@${domain}`;
}
