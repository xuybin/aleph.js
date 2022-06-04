import { assertEquals } from "std/testing/asserts.ts";
import { applyImportMap, restoreUrl, toLocalPath } from "../server/helpers.ts";

Deno.test("server/helper.ts", async (t) => {
  await t.step("toLocalPath", () => {
    assertEquals(toLocalPath("https://foo.com/lib@0.1.0?action"), "/-/foo.com/lib@0.1.0?action");
    assertEquals(toLocalPath("https://deno.land/x/aleph@0.1.0/"), "/-/deno.land/x/aleph@0.1.0");
    assertEquals(toLocalPath("http://foo.com/bar?lang=us-en"), "/-/http_foo.com/bar?lang=us-en");
    assertEquals(toLocalPath("http://foo.com:8080/bar"), "/-/http_foo.com_8080/bar");
    assertEquals(toLocalPath("file://foo/bar/"), "file://foo/bar/");
    assertEquals(toLocalPath("/foo/bar/"), "/foo/bar/");
  });

  await t.step("restoreUrl", () => {
    assertEquals(restoreUrl("/-/foo.com/lib@0.1.0?action"), "https://foo.com/lib@0.1.0?action");
    assertEquals(restoreUrl("/-/deno.land/x/aleph@0.1.0"), "https://deno.land/x/aleph@0.1.0");
    assertEquals(restoreUrl("/-/http_foo.com/bar?lang=us-en"), "http://foo.com/bar?lang=us-en");
    assertEquals(restoreUrl("/-/http_foo.com_8080/bar"), "http://foo.com:8080/bar");
  });

  await t.step("applyImportMap", () => {
    const importMap = {
      __filename: "",
      imports: {
        "aleph": "https://deno.land/x/aleph/mod.ts",
        "aleph/": "https://deno.land/x/aleph/",
      },
      scopes: {},
    };
    assertEquals(applyImportMap("aleph", importMap), "https://deno.land/x/aleph/mod.ts");
    assertEquals(
      applyImportMap("aleph/framework/react/mod.ts", importMap),
      "https://deno.land/x/aleph/framework/react/mod.ts",
    );
  });
});
