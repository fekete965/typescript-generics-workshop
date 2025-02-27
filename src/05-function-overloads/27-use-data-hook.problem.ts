import { it } from "vitest";
import { Equal, Expect } from "../helpers/type-utils";

type UseDataResult<T> = {
  getData: () => T;
};

// You'll need to use function overloads to figure this out!
function useData<T>(params: {
  fetchData: () => Promise<T>;
  initialData: T;
}): UseDataResult<T>;
function useData<T>(params: {
  fetchData: () => Promise<T>;
}): UseDataResult<undefined | T>;
function useData<T>(params: {
  fetchData: () => Promise<T>;
  initialData?: T;
}): UseDataResult<undefined | T> | UseDataResult<T> {
  let data = params.initialData;

  params.fetchData().then((d) => {
    data = d;
  });

  return {
    getData: () => data,
  };
}

it("Should return undefined if no initial data is passed", () => {
  const numData = useData({
    fetchData: () => Promise.resolve(1),
  });

  const data = numData.getData();

  type Test1 = Expect<Equal<typeof data, number | undefined>>;
});

it("Should NOT return undefined if initial data is passed", () => {
  const numData = useData({
    fetchData: () => Promise.resolve(1),
    initialData: 2,
  });

  const data = numData.getData();

  type Test1 = Expect<Equal<typeof data, number>>;
});
