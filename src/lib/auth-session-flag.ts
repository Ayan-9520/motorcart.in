/** Set true before programmatic sign-out to avoid "session expired" UX. */
let intentionalSignOut = false;

export function setIntentionalSignOut(value: boolean) {
  intentionalSignOut = value;
}

export function getIntentionalSignOut() {
  return intentionalSignOut;
}
