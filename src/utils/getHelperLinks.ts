type HelperLinkTypes = 'connect-wallet';

const helperLinks = new Map<HelperLinkTypes, string>([
  ['connect-wallet', 'https://wiki.karura.app']
]);

export function getHelperLink (type: HelperLinkTypes) {
  return helperLinks.get(type);
}