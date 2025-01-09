import { expect, it } from "vitest";
import { Equal, Expect } from "../helpers/type-utils";

type Fn<T> = () => T;
type GenObj<T> = {
  run: Fn<T>;
};

function runGenerator<T>(generator: Fn<T>): T;
function runGenerator<T>(generator: GenObj<T>): T;
function runGenerator<T>(generator: Fn<T> | GenObj<T>): T {
  if (typeof generator === "function") {
    return generator();
  }
  return generator.run();
}

it("Should accept an object where the generator is a function", () => {
  const result = runGenerator({
    run: () => "hello",
  });

  expect(result).toBe("hello");

  type test1 = Expect<Equal<typeof result, string>>;
});

it("Should accept an object where the generator is a function", () => {
  const result = runGenerator(() => "hello");

  expect(result).toBe("hello");

  type test1 = Expect<Equal<typeof result, string>>;
});
