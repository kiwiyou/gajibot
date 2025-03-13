import { match, P } from "@gabriel/ts-pattern";
import { Bot, InlineQueryResultBuilder } from "@grammy/core";
import { limit } from "@grammy/ratelimiter";
import { Option } from "effect";
import { idHash } from "../util/hash.ts";

// [yale, hangul, is normalization meaningful]
type LetterCorrespondence = [string, string, boolean];
const lengthDescComparator = (
  a: LetterCorrespondence,
  b: LetterCorrespondence,
) => b[0].length - a[0].length;

const CHOSEONG_FILLER = "\u115F";
const SYLLABLE_SEPARATOR = ".";

const COMPATIBILITY_JAMO = new Map<string, string>([
  ["\u1100", "ㄱ"],
  ["\u1101", "ㄲ"],
  ["\u1102", "ㄴ"],
  ["\u1103", "ㄷ"],
  ["\u1104", "ㄸ"],
  ["\u1105", "ㄹ"],
  ["\u1106", "ㅁ"],
  ["\u1107", "ㅂ"],
  ["\u1108", "ㅃ"],
  ["\u1109", "ㅅ"],
  ["\u110A", "ㅆ"],
  ["\u110B", "ㅇ"],
  ["\u110C", "ㅈ"],
  ["\u110D", "ㅉ"],
  ["\u110E", "ㅊ"],
  ["\u110F", "ㅋ"],
  ["\u1110", "ㅌ"],
  ["\u1111", "ㅍ"],
  ["\u1112", "ㅎ"],
  ["\u1161", "ㅏ"],
  ["\u1162", "ㅐ"],
  ["\u1163", "ㅑ"],
  ["\u1164", "ㅒ"],
  ["\u1165", "ㅓ"],
  ["\u1166", "ㅔ"],
  ["\u1167", "ㅕ"],
  ["\u1168", "ㅖ"],
  ["\u1169", "ㅗ"],
  ["\u116A", "ㅘ"],
  ["\u116B", "ㅙ"],
  ["\u116C", "ㅚ"],
  ["\u116D", "ㅛ"],
  ["\u116E", "ㅜ"],
  ["\u116F", "ㅝ"],
  ["\u1170", "ㅞ"],
  ["\u1171", "ㅟ"],
  ["\u1172", "ㅠ"],
  ["\u1173", "ㅡ"],
  ["\u1174", "ㅢ"],
  ["\u1175", "ㅣ"],
  ["\u11A8", "ㄱ"],
  ["\u11A9", "ㄲ"],
  ["\u11AA", "ㄳ"],
  ["\u11AB", "ㄴ"],
  ["\u11AC", "ㄵ"],
  ["\u11AD", "ㄶ"],
  ["\u11AE", "ㄷ"],
  ["\u11AF", "ㄹ"],
  ["\u11B0", "ㄺ"],
  ["\u11B1", "ㄻ"],
  ["\u11B2", "ㄼ"],
  ["\u11B3", "ㄽ"],
  ["\u11B4", "ㄾ"],
  ["\u11B5", "ㄿ"],
  ["\u11B6", "ㅀ"],
  ["\u11B7", "ㅁ"],
  ["\u11B8", "ㅂ"],
  ["\u11B9", "ㅄ"],
  ["\u11BA", "ㅅ"],
  ["\u11BB", "ㅆ"],
  ["\u11BC", "ㅇ"],
  ["\u11BD", "ㅈ"],
  ["\u11BE", "ㅊ"],
  ["\u11BF", "ㅋ"],
  ["\u11C0", "ㅌ"],
  ["\u11C1", "ㅍ"],
  ["\u11C2", "ㅎ"],
]);

const CHOSEONG = Array<LetterCorrespondence>(
  ["`", CHOSEONG_FILLER, false],
  ["k", "\u1100", true],
  ["kk", "\u1101", true],
  ["n", "\u1102", true],
  ["t", "\u1103", true],
  ["tt", "\u1104", true],
  ["l", "\u1105", true],
  ["m", "\u1106", true],
  ["p", "\u1107", true],
  ["pp", "\u1108", true],
  ["s", "\u1109", true],
  ["ss", "\u110A", true],
  ["G", "\u110B", true],
  ["c", "\u110C", true],
  ["cc", "\u110D", true],
  ["ch", "\u110E", true],
  ["kh", "\u110F", true],
  ["th", "\u1110", true],
  ["ph", "\u1111", true],
  ["h", "\u1112", true],
  ["nk", "\u1113", false],
  ["nn", "\u1114", false],
  ["nt", "\u1115", false],
  ["np", "\u1116", false],
  ["tk", "\u1117", false],
  ["ln", "\u1118", false],
  ["ll", "\u1119", false],
  ["lh", "\u111A", false],
  ["L", "\u111B", false],
  ["mp", "\u111C", false],
  ["M", "\u111D", false],
  ["pk", "\u111E", false],
  ["pn", "\u111F", false],
  ["pt", "\u1120", false],
  ["ps", "\u1121", false],
  ["psk", "\u1122", false],
  ["pst", "\u1123", false],
  ["psp", "\u1124", false],
  ["pss", "\u1125", false],
  ["psc", "\u1126", false],
  ["pc", "\u1127", false],
  ["pch", "\u1128", false],
  ["pth", "\u1129", false],
  ["pph", "\u112A", false],
  ["P", "\u112B", false],
  ["PP", "\u112C", false],
  ["sk", "\u112D", false],
  ["sn", "\u112E", false],
  ["st", "\u112F", false],
  ["sl", "\u1130", false],
  ["sm", "\u1131", false],
  ["sp", "\u1132", false],
  ["spk", "\u1133", false],
  ["sss", "\u1134", false],
  ["sG", "\u1135", false],
  ["sc", "\u1136", false],
  ["sch", "\u1137", false],
  ["skh", "\u1138", false],
  ["sth", "\u1139", false],
  ["sph", "\u113A", false],
  ["sh", "\u113B", false],
  ["s/", "\u113C", false],
  ["ss/", "\u113D", false],
  ["s\\", "\u113E", false],
  ["ss\\", "\u113F", false],
  ["z", "\u1140", false],
  ["Gk", "\u1141", false],
  ["Gt", "\u1142", false],
  ["Gm", "\u1143", false],
  ["Gp", "\u1144", false],
  ["Gs", "\u1145", false],
  ["Gz", "\u1146", false],
  ["GG", "\u1147", false],
  ["Gc", "\u1148", false],
  ["Gch", "\u1149", false],
  ["Gth", "\u114A", false],
  ["Gph", "\u114B", false],
  ["ng", "\u114C", false],
  ["cG", "\u114D", false],
  ["c/", "\u114E", false],
  ["cc/", "\u114F", false],
  ["c\\", "\u1150", false],
  ["cc\\", "\u1151", false],
  ["chkh", "\u1152", false],
  ["chh", "\u1153", false],
  ["ch/", "\u1154", false],
  ["ch\\", "\u1155", false],
  ["php", "\u1156", false],
  ["PH", "\u1157", false],
  ["hh", "\u1158", false],
  ["q", "\u1159", false],
  ["kt", "\u115A", false],
  ["ns", "\u115B", false],
  ["nc", "\u115C", false],
  ["nh", "\u115D", false],
  ["tl", "\u115E", false],
  ["tm", "\uA960", false],
  ["tp", "\uA961", false],
  ["ts", "\uA962", false],
  ["tc", "\uA963", false],
  ["lk", "\uA964", false],
  ["lkk", "\uA965", false],
  ["lt", "\uA966", false],
  ["ltt", "\uA967", false],
  ["lm", "\uA968", false],
  ["lp", "\uA969", false],
  ["lpp", "\uA96A", false],
  ["lP", "\uA96B", false],
  ["ls", "\uA96C", false],
  ["lc", "\uA96D", false],
  ["lkH", "\uA96E", false],
  ["mk", "\uA96F", false],
  ["mt", "\uA970", false],
  ["ms", "\uA971", false],
  ["psth", "\uA972", false],
  ["pkh", "\uA973", false],
  ["ph", "\uA974", false],
  ["ssp", "\uA975", false],
  ["Gl", "\uA976", false],
  ["Gh", "\uA977", false],
  ["cch", "\uA978", false],
  ["thth", "\uA979", false],
  ["phh", "\uA97A", false],
  ["hs", "\uA97B", false],
  ["qq", "\uA97C", false],
).toSorted(lengthDescComparator);

const JUNGSEONG = Array<LetterCorrespondence>(
  ["a", "\u1161", true],
  ["ay", "\u1162", true],
  ["ya", "\u1163", true],
  ["yay", "\u1164", true],
  ["e", "\u1165", true],
  ["ey", "\u1166", true],
  ["ye", "\u1167", true],
  ["yey", "\u1168", true],
  ["wo", "\u1169", true],
  ["wa", "\u116A", true],
  ["way", "\u116B", true],
  ["woy", "\u116C", true],
  ["yo", "\u116D", true],
  ["wu", "\u116E", true],
  ["we", "\u116F", true],
  ["wey", "\u1170", true],
  ["wi", "\u1171", true],
  ["yu", "\u1172", true],
  ["u", "\u1173", true],
  ["uy", "\u1174", true],
  ["i", "\u1175", true],
  ["awo", "\u1176", false],
  ["awu", "\u1177", false],
  ["yawo", "\u1178", false],
  ["yayo", "\u1179", false],
  ["eo", "\u117A", false],
  ["ewu", "\u117B", false],
  ["eu", "\u117C", false],
  ["yewo", "\u117D", false],
  ["yewu", "\u117E", false],
  ["woe", "\u117F", false],
  ["woey", "\u1180", false],
  ["woyey", "\u1181", false],
  ["wowo", "\u1182", false],
  ["wowu", "\u1183", false],
  ["yoya", "\u1184", false],
  ["yoyay", "\u1185", false],
  ["yoye", "\u1186", false],
  ["yowo", "\u1187", false],
  ["yoy", "\u1188", false],
  ["wua", "\u1189", false],
  ["wuay", "\u118A", false],
  ["weu", "\u118B", false],
  ["wuyey", "\u118C", false],
  ["wuwu", "\u118D", false],
  ["yua", "\u118E", false],
  ["yue", "\u118F", false],
  ["yuey", "\u1190", false],
  ["yuye", "\u1191", false],
  ["yuyey", "\u1192", false],
  ["yuwu", "\u1193", false],
  ["yuy", "\u1194", false],
  ["uwu", "\u1195", false],
  ["uu", "\u1196", false],
  ["uywu", "\u1197", false],
  ["ia", "\u1198", false],
  ["iya", "\u1199", false],
  ["iwo", "\u119A", false],
  ["iwu", "\u119B", false],
  ["iu", "\u119C", false],
  ["io", "\u119D", false],
  ["o", "\u119E", false],
  ["oe", "\u119F", false],
  ["owu", "\u11A0", false],
  ["oy", "\u11A1", false],
  ["oo", "\u11A2", false],
  ["au", "\u11A3", false],
  ["yawu", "\u11A4", false],
  ["yeya", "\u11A5", false],
  ["woya", "\u11A6", false],
  ["woyay", "\u11A7", false],
  ["woye", "\uD7B0", false],
  ["wowoy", "\uD7B1", false],
  ["yoa", "\uD7B2", false],
  ["yoay", "\uD7B3", false],
  ["yoe", "\uD7B4", false],
  ["wuye", "\uD7B5", false],
  ["wuyy", "\uD7B6", false],
  ["yuay", "\uD7B7", false],
  ["yuwo", "\uD7B8", false],
  ["ua", "\uD7B9", false],
  ["ue", "\uD7BA", false],
  ["uey", "\uD7BB", false],
  ["uwo", "\uD7BC", false],
  ["iyawo", "\uD7BD", false],
  ["iyay", "\uD7BE", false],
  ["iye", "\uD7BF", false],
  ["iyey", "\uD7C0", false],
  ["iwuy", "\uD7C1", false],
  ["iyo", "\uD7C2", false],
  ["iyu", "\uD7C3", false],
  ["iy", "\uD7C4", false],
  ["oa", "\uD7C5", false],
  ["oey", "\uD7C6", false],
).toSorted(lengthDescComparator);

const JONGSEONG = Array<LetterCorrespondence>(
  ["k", "\u11A8", true],
  ["kk", "\u11A9", true],
  ["ks", "\u11AA", true],
  ["n", "\u11AB", true],
  ["nc", "\u11AC", true],
  ["nh", "\u11AD", true],
  ["t", "\u11AE", true],
  ["l", "\u11AF", true],
  ["lk", "\u11B0", true],
  ["lm", "\u11B1", true],
  ["lp", "\u11B2", true],
  ["ls", "\u11B3", true],
  ["lth", "\u11B4", true],
  ["lph", "\u11B5", true],
  ["lh", "\u11B6", true],
  ["m", "\u11B7", true],
  ["p", "\u11B8", true],
  ["ps", "\u11B9", true],
  ["s", "\u11BA", true],
  ["ss", "\u11BB", true],
  ["G", "\u11BC", true],
  ["c", "\u11BD", true],
  ["ch", "\u11BE", true],
  ["kh", "\u11BF", true],
  ["th", "\u11C0", true],
  ["ph", "\u11C1", true],
  ["h", "\u11C2", true],
  ["kl", "\u11C3", false],
  ["ksk", "\u11C4", false],
  ["nk", "\u11C5", false],
  ["nt", "\u11C6", false],
  ["ns", "\u11C7", false],
  ["nz", "\u11C8", false],
  ["nth", "\u11C9", false],
  ["tk", "\u11CA", false],
  ["tl", "\u11CB", false],
  ["lks", "\u11CC", false],
  ["ln", "\u11CD", false],
  ["lt", "\u11CE", false],
  ["ltH", "\u11CF", false],
  ["ll", "\u11D0", false],
  ["lmk", "\u11D1", false],
  ["lms", "\u11D2", false],
  ["lps", "\u11D3", false],
  ["lpH", "\u11D4", false],
  ["lP", "\u11D5", false],
  ["lss", "\u11D6", false],
  ["lz", "\u11D7", false],
  ["lkh", "\u11D8", false],
  ["lq", "\u11D9", false],
  ["mk", "\u11DA", false],
  ["ml", "\u11DB", false],
  ["mp", "\u11DC", false],
  ["ms", "\u11DD", false],
  ["mss", "\u11DE", false],
  ["mz", "\u11DF", false],
  ["mch", "\u11E0", false],
  ["mh", "\u11E1", false],
  ["M", "\u11E2", false],
  ["pl", "\u11E3", false],
  ["pph", "\u11E4", false],
  ["pH", "\u11E5", false],
  ["P", "\u11E6", false],
  ["sk", "\u11E7", false],
  ["st", "\u11E8", false],
  ["sl", "\u11E9", false],
  ["sp", "\u11EA", false],
  ["z", "\u11EB", false],
  ["Gk", "\u11EC", false],
  ["Gkk", "\u11ED", false],
  ["GG", "\u11EE", false],
  ["Gkh", "\u11EF", false],
  ["ng", "\u11F0", false],
  ["ngs", "\u11F1", false],
  ["ngz", "\u11F2", false],
  ["php", "\u11F3", false],
  ["PH", "\u11F4", false],
  ["hn", "\u11F5", false],
  ["hl", "\u11F6", false],
  ["hm", "\u11F7", false],
  ["hp", "\u11F8", false],
  ["q", "\u11F9", false],
  ["kn", "\u11FA", false],
  ["kp", "\u11FB", false],
  ["kch", "\u11FC", false],
  ["kkh", "\u11FD", false],
  ["kH", "\u11FE", false],
  ["nn", "\u11FF", false],
  ["nl", "\uD7CB", false],
  ["nch", "\uD7CC", false],
  ["tt", "\uD7CD", false],
  ["ttp", "\uD7CE", false],
  ["tp", "\uD7CF", false],
  ["ts", "\uD7D0", false],
  ["tsk", "\uD7D1", false],
  ["tc", "\uD7D2", false],
  ["tch", "\uD7D3", false],
  ["tth", "\uD7D4", false],
  ["lkk", "\uD7D5", false],
  ["lkH", "\uD7D6", false],
  ["llkh", "\uD7D7", false],
  ["lmh", "\uD7D8", false],
  ["lpt", "\uD7D9", false],
  ["lpph", "\uD7DA", false],
  ["lng", "\uD7DB", false],
  ["lqh", "\uD7DC", false],
  ["L", "\uD7DD", false],
  ["mn", "\uD7DE", false],
  ["mnn", "\uD7DF", false],
  ["mm", "\uD7E0", false],
  ["mps", "\uD7E1", false],
  ["mc", "\uD7E2", false],
  ["pt", "\uD7E3", false],
  ["plph", "\uD7E4", false],
  ["pm", "\uD7E5", false],
  ["pp", "\uD7E6", false],
  ["pst", "\uD7E7", false],
  ["pc", "\uD7E8", false],
  ["pch", "\uD7E9", false],
  ["sm", "\uD7EA", false],
  ["sP", "\uD7EB", false],
  ["ssk", "\uD7EC", false],
  ["sst", "\uD7ED", false],
  ["sz", "\uD7EE", false],
  ["sc", "\uD7EF", false],
  ["sch", "\uD7F0", false],
  ["sth", "\uD7F1", false],
  ["sh", "\uD7F2", false],
  ["zp", "\uD7F3", false],
  ["zP", "\uD7F4", false],
  ["ngm", "\uD7F5", false],
  ["ngh", "\uD7F6", false],
  ["cp", "\uD7F7", false],
  ["cpp", "\uD7F8", false],
  ["cc", "\uD7F9", false],
  ["phs", "\uD7FA", false],
  ["phth", "\uD7FB", false],
).toSorted(lengthDescComparator);

const joinSyllable = (
  letters: [string] | [string, string] | [string, string, string],
  normalizable: boolean,
) => {
  if (normalizable) {
    return match(letters)
      .with([P.select()], (choseong) => COMPATIBILITY_JAMO.get(choseong)!)
      .with(
        [CHOSEONG_FILLER, P.select()],
        (jungseong) => COMPATIBILITY_JAMO.get(jungseong)!,
      )
      .otherwise((letters) => letters.join("").normalize("NFC"));
  } else {
    return letters.join("");
  }
};

const parseSyllable = (
  text: string,
  cursor: number,
  normalize: boolean,
): Option.Option<{ syllable: string; nextCursor: number }> => {
  const choseongMatch = CHOSEONG.find((choseong) =>
    text.startsWith(choseong[0], cursor)
  );
  if (choseongMatch) {
    const jungseongMatch = JUNGSEONG.find((jungseong) =>
      text.startsWith(jungseong[0], cursor + choseongMatch[0].length)
    );
    if (jungseongMatch) {
      const jongseongMatch = JONGSEONG.find((jongseong) =>
        text.startsWith(
          jongseong[0],
          cursor + choseongMatch[0].length + jungseongMatch[0].length,
        )
      );
      if (jongseongMatch) {
        return Option.some({
          syllable: joinSyllable(
            [
              choseongMatch[1],
              jungseongMatch[1],
              jongseongMatch[1],
            ],
            normalize && choseongMatch[2] && jungseongMatch[2] &&
              jongseongMatch[2],
          ),
          nextCursor: cursor + choseongMatch[0].length +
            jungseongMatch[0].length + jongseongMatch[0].length,
        });
      }
      return Option.some({
        syllable: joinSyllable(
          [choseongMatch[1], jungseongMatch[1]],
          normalize &&
            (choseongMatch[1] === CHOSEONG_FILLER ? true : choseongMatch[2]) &&
            jungseongMatch[2],
        ),
        nextCursor: cursor + choseongMatch[0].length + jungseongMatch[0].length,
      });
    }
    if (choseongMatch[1] !== CHOSEONG_FILLER) {
      return Option.some({
        syllable: joinSyllable(
          [choseongMatch[1]],
          normalize && choseongMatch[2],
        ),
        nextCursor: cursor + choseongMatch[0].length,
      });
    }
  }
  return Option.none();
};

const HIGH_TONE = "\u302E";
const RISING_TONE = "\u302F";

export const oldYaleToHangul = (text: string, normalize: boolean) => {
  let prevEnd = 0;
  let current = 0;
  let hangul = "";
  while (current < text.length) {
    if (text.startsWith(";", current)) {
      hangul += text.slice(prevEnd, current);
      hangul += HIGH_TONE;
      prevEnd = current = current + 1;
    } else if (text.startsWith(":", current)) {
      hangul += text.slice(prevEnd, current);
      hangul += RISING_TONE;
      prevEnd = current = current + 1;
    } else if (text.startsWith(SYLLABLE_SEPARATOR, current)) {
      const lookahead = parseSyllable(text, current + 1, normalize);
      if (Option.isSome(lookahead)) {
        hangul += text.slice(prevEnd, current);
        hangul += lookahead.value.syllable;
        prevEnd = current = lookahead.value.nextCursor;
      } else {
        current++;
      }
    } else {
      const syllable = parseSyllable(text, current, normalize);
      if (Option.isSome(syllable)) {
        hangul += text.slice(prevEnd, current);
        hangul += syllable.value.syllable;
        prevEnd = current = syllable.value.nextCursor;
      } else {
        current++;
      }
    }
  }
  hangul += text.slice(prevEnd);
  return hangul;
};

export const oldYaleToHangulHandler = (bot: Bot) => {
  bot.use(limit({
    timeFrame: 1000,
    limit: 2,
    keyGenerator: (ctx) => ctx.inlineQuery?.from.id.toString(),
  }));
  bot.on("inline_query", async (ctx) => {
    if (ctx.inlineQuery.query.trim().length === 0) return;
    const decomposed = oldYaleToHangul(ctx.inlineQuery.query, false);
    const composed = oldYaleToHangul(ctx.inlineQuery.query, true);
    await ctx.answerInlineQuery([
      InlineQueryResultBuilder.article(
        await idHash(`dh:${decomposed}`),
        "Decomposed Hangul",
        {
          description: decomposed,
        },
      ).text(decomposed),
      InlineQueryResultBuilder.article(
        await idHash(`ch:${composed}`),
        "Composed Hangul",
        {
          description: composed,
        },
      ).text(composed),
    ]);
  });
};
