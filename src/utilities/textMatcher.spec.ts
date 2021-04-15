import { isMatch, someOfItIsCorrect } from "./textMatcher";

test("isMatch", () => {
  expect(isMatch("a", "a")).toBeTruthy();
  expect(isMatch("a", "b")).toBeFalsy();

  expect(
    isMatch(
      "“Didn’t she say ‘I like red best’ when I asked her wine preferences?”",
      "\"Didn't she say 'I like red best' when I asked her wine preferences?\""
    )
  ).toBeTruthy();
});

test("someOfItIsCorrect", () => {
  expect(someOfItIsCorrect("ab", "a")).toBeTruthy();
  expect(someOfItIsCorrect("ab", "b")).toBeFalsy();
});
