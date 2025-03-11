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

console.log(
  oldYaleToHangul(
    "syeyG.cwong GeG.cyeyG hwun.min.cyeng.qum.na.las.mal.sso.mi.tyung.kwik.Gey.tal.Ga.mwun.ccoG.Gwa.lwo.se.lu.so.mos.ti.Ga.ni.hol.ssoy.Gi.len.cyen.cho.lwo.Ge.lin.poyk.syeng.Gi.ni.lu.kwo.cye.hwolq.pay.Gi.sye.two.mo.chom.nay.cey.ptu.tul.si.le.phye.ti.mwot.holq.nwo.mi.ha.ni.la.nay.i.lol.GwiG.ho.Gya.Ge.Gyes.pi.ne.kye.say.lwo.su.mul.Gye.tulp.ccoG.lol.moyng.ko.nwo.ni.sa.lom.ma.ta.hoy.GGye.swu.Pi.ni.kye.nal.lo.pswu.mey.ppyen.qan.kuy.ho.kwo.cye.holq.sto.lo.mi.ni.la",
    true,
  ),
);
