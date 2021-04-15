export const s = (s: string) => {
  let result = s;
  const replaceMap = new Map();
  replaceMap.set(/’/g, "'");
  replaceMap.set(/‘|’/g, "'");
  replaceMap.set(/“|”/g, '"');
  replaceMap.set(/\s/g, " ");

  replaceMap.forEach((newString, old) => {
    result = result.replace(old, newString);
  });

  return result;
};
export const isMatch = (a: string, b: string) => s(a) == s(b);
export const isMismatch = (a: string, b: string) =>
  a && b && a.length && b.length && s(a) != s(b);

const escapeRegExp = (string: string) =>
  string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

export const someOfItIsCorrect = (a: string, b: string) =>
  isMismatch(a, b) && new RegExp(`^${escapeRegExp(s(b))}`).test(s(a));

export const notYetInput = (a: string, b: string) =>
  !a || !b || !a.length || !b.length;
