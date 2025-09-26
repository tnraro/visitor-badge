import { expect, test } from "bun:test";

test("asd", async () => {
  await fetch("http://localhost:3000/badge?uid=53");
});
