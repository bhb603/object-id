import { assertEquals } from "@std/assert";

import objectId from "./objectId.ts";

Deno.test("objectId", async (t: Deno.TestContext) => {
  await t.step("it generates unique object ids", () => {
    const n = 10000;
    const objectIds = new Set<string>();

    for (let i = 0; i < n; i++) {
      const id = objectId.objectId();
      assertEquals(id.length, 24);

      if (objectIds.has(id)) {
        throw new Error(`duplicate object id: ${id}`);
      }

      objectIds.add(id);
    }

    assertEquals(objectIds.size, n);
  });

  await t.step("it generates object ids from timestamps", () => {
    const ts = 1568419200;
    const id = objectId.fromTimestamp(ts);
    assertEquals(id.length, 24);
    assertEquals(id.slice(0, 8), "5d7c2d80");
  });

  await t.step("it parses timestamps from object ids", () => {
    const id = "66bfa490d7e78d115668762d";
    const timestamp = objectId.parseTimestamp(id);
    assertEquals(timestamp, 1723835536);
  });
});
