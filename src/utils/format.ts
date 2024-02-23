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

export function eventKey(str: string) {
  return str.replace(/\s+/g, '').toUpperCase();
}

export function shortenFBLink(link: string) {
  if (link)
    return link
      .replace(/(http:\/\/|https:\/\/)/, '') // Remove http:// or https://
      .replace('www.', '') // Remove www.
      .replace('facebook.com', 'fb.com'); // Replace facebook.com with fb.com
  return link;
}
