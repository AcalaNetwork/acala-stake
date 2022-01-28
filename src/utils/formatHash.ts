export const formatAddress = (hash: string, mini = true) => {
  return mini ? hash.replace(/(\w{6})\w*?(\w{6}$)/, '$1...$2') : hash;
}