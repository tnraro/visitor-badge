import { expect, test } from "bun:test";
import { put } from "./user";

test("get", async () => {
  expect(put("1")).toStrictEqual({ count: 0 });
  expect(put("1")).toStrictEqual({ count: 1 });
  expect(put("0")).toStrictEqual({ count: 0 });
});
