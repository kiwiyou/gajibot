import { assertEquals } from "jsr:@std/assert";
import { oldYaleToHangul } from "./old-yale.ts";

Deno.test("normalizable choseong", () => {
  assertEquals(oldYaleToHangul("ch", true), "\u314A");
});

Deno.test("normalizable choseong-jungseong", () => {
  assertEquals(oldYaleToHangul("hay", true), "\uD574");
});

Deno.test("normalizable choseong-jungseong-jongseong", () => {
  assertEquals(oldYaleToHangul("phwoG", true), "\uD401");
});

Deno.test("not normalizable choseong", () => {
  assertEquals(oldYaleToHangul("sk", true), "\u112D");
});

Deno.test("not normalizable choseong-jungseong", () => {
  assertEquals(oldYaleToHangul("ss\\yoyay", true), "\u113F\u1185");
});

Deno.test("not normalizable choseong-jungseong-jongseong", () => {
  assertEquals(oldYaleToHangul("PHuywungz", true), "\u1157\u1197\u11F2");
});

Deno.test("normalizable filler-jungseong", () => {
  assertEquals(oldYaleToHangul("`wo", true), "\u3157");
});

Deno.test("skip standalone filler", () => {
  assertEquals(oldYaleToHangul("`", true), "`");
});

Deno.test("front separator", () => {
  assertEquals(oldYaleToHangul(".ch", true), "\u314A");
});

Deno.test("middle separator", () => {
  assertEquals(oldYaleToHangul("ch.ch", true), "\u314A\u314A");
});

Deno.test("back separator", () => {
  assertEquals(oldYaleToHangul("ch.", true), "\u314A.");
});
