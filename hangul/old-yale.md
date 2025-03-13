# Modified Yale Romanization System

## Output Format

This bot supports two types of output:

1. **Decomposed Hangul**: Represents all Korean characters as combining jamo.
2. **Composed Hangul**: Represents modern Korean characters as precomposed
   syllables, while keeping others as combining jamo.

## String Processing

- Input string is processed sequentially (greedy) from the beginning.
- Syllables can be separated using period (`.`).
- Tone marks:
  - `;`: High tone (〮)
  - `:`: Rising tone (〯)

## Letter Correspondence Table

### Consonants

| Yale | Hangul            | Initial | Final |
| ---- | ----------------- | ------- | ----- |
| k    | ㄱ                | O       | O     |
| kk   | ㄲ                | O       | O     |
| n    | ㄴ                | O       | O     |
| t    | ㄷ                | O       | O     |
| tt   | ㄸ                | O       | O     |
| l    | ㄹ                | O       | O     |
| m    | ㅁ                | O       | O     |
| p    | ㅂ                | O       | O     |
| pp   | ㅃ                | O       | O     |
| s    | ㅅ                | O       | O     |
| ss   | ㅆ                | O       | O     |
| G    | ㅇ                | O       | O     |
| c    | ㅈ                | O       | O     |
| cc   | ㅉ                | O       | X     |
| ch   | ㅊ                | O       | O     |
| kh   | ㅋ                | O       | O     |
| th   | ㅌ                | O       | O     |
| ph   | ㅍ                | O       | O     |
| h    | ㅎ                | O       | O     |
| `    | (Filler)          | O       | X     |
| ks   | ㄳ                | X       | O     |
| nc   | ㄵ                | O       | O     |
| nh   | ㄶ                | O       | O     |
| lk   | ㄺ                | O       | O     |
| lm   | ㄻ                | O       | O     |
| lp   | ㄼ                | O       | O     |
| ls   | ㄽ                | O       | O     |
| lth  | ㄾ                | X       | O     |
| lph  | ㄿ                | X       | O     |
| lh   | ㅀ                | O       | O     |
| ps   | ㅄ                | O       | O     |
| nk   | &#4371;/&#4549;   | O       | O     |
| nn   | &#4372;/&#4607;   | O       | O     |
| nt   | &#4373;/&#4550;   | O       | O     |
| np   | &#4374;           | O       | X     |
| tk   | &#4375;/&#4554;   | O       | O     |
| ln   | &#4376;/&#4557;   | O       | O     |
| ll   | &#4377;/&#4560;   | O       | O     |
| L    | &#4379;/&#55261;  | O       | O     |
| mp   | &#4380;/&#4572;   | O       | O     |
| M    | &#4381;           | O       | O     |
| pk   | &#4382;           | O       | X     |
| pn   | &#4383;           | O       | X     |
| pt   | &#4384;/&#55267;  | O       | O     |
| psk  | &#4386;           | O       | X     |
| pst  | &#4387;/&#55271;  | O       | O     |
| psp  | &#4388;           | O       | X     |
| pss  | &#4389;           | O       | X     |
| psc  | &#4390;           | O       | X     |
| pc   | &#4391;/&#55272;  | O       | O     |
| pch  | &#4392;/&#55273;  | O       | O     |
| pth  | &#4393;           | O       | X     |
| pph  | &#4394;/&#4580;   | O       | O     |
| P    | &#4395;           | O       | O     |
| PP   | &#4396;           | O       | X     |
| sk   | &#4397;           | O       | O     |
| sn   | &#4398;           | O       | X     |
| st   | &#4399;           | O       | O     |
| sl   | &#4400;           | O       | O     |
| sm   | &#4401;/&#55274;  | O       | O     |
| sp   | &#4402;           | O       | O     |
| spk  | &#4403;           | O       | X     |
| sss  | &#4404;           | O       | X     |
| sG   | &#4405;           | O       | X     |
| sc   | &#4406;/&#55279;  | O       | O     |
| sch  | &#4407;/&#55280;  | O       | O     |
| skh  | &#4408;           | O       | X     |
| sth  | &#4409;/&#55281;  | O       | O     |
| sph  | &#4410;           | O       | X     |
| sh   | &#4411;/&#55282;  | O       | O     |
| s/   | &#4412;           | O       | X     |
| ss/  | &#4413;           | O       | X     |
| s\\  | &#4414;           | O       | X     |
| ss\\ | &#4415;           | O       | X     |
| z    | &#4416;           | O       | O     |
| Gk   | &#4417;           | O       | O     |
| Gt   | &#4418;           | O       | X     |
| Gm   | &#4419;           | O       | X     |
| Gp   | &#4420;           | O       | X     |
| Gs   | &#4421;           | O       | X     |
| Gz   | &#4422;           | O       | X     |
| GG   | &#4423;           | O       | O     |
| Gc   | &#4424;           | O       | X     |
| Gch  | &#4425;           | O       | X     |
| Gth  | &#4426;           | O       | X     |
| Gph  | &#4427;           | O       | X     |
| ng   | &#4428;           | O       | O     |
| cG   | &#4429;           | O       | X     |
| c/   | &#4430;           | O       | X     |
| cc/  | &#4431;           | O       | X     |
| c\\  | &#4432;           | O       | X     |
| cc\\ | &#4433;           | O       | X     |
| chkh | &#4434;           | O       | X     |
| chh  | &#4435;           | O       | X     |
| ch/  | &#4436;           | O       | X     |
| ch\\ | &#4437;           | O       | X     |
| php  | &#4438;           | O       | O     |
| PH   | &#4439;           | O       | O     |
| hh   | &#4440;           | O       | X     |
| q    | &#4441;           | O       | O     |
| kt   | &#4442;           | O       | X     |
| ns   | &#4443;/&#4551;   | O       | O     |
| tl   | &#4446;/&#4555;   | O       | O     |
| tm   | &#43360;          | O       | X     |
| tp   | &#43361;/&#55247; | O       | O     |
| ts   | &#43362;/&#55248; | O       | O     |
| tc   | &#43363;/&#55250; | O       | O     |
| lkk  | &#43365;/&#55253; | O       | O     |
| lt   | &#43366;/&#4558;  | O       | O     |
| ltt  | &#43367;          | O       | X     |
| lP   | &#43371;/&#4565;  | O       | O     |
| lc   | &#43373;          | O       | X     |
| lkH  | &#43374;/&#55254; | O       | O     |
| mk   | &#43375;/&#4570;  | O       | O     |
| mt   | &#43376;          | O       | X     |
| ms   | &#43377;/&#4573;  | O       | O     |
| psth | &#43378;          | O       | X     |
| pkh  | &#43379;          | O       | X     |
| ph   | &#43380;          | O       | X     |
| ssp  | &#43381;          | O       | X     |
| Gl   | &#43382;          | O       | X     |
| Gh   | &#43383;          | O       | X     |
| cch  | &#43384;          | O       | X     |
| thth | &#43385;          | O       | X     |
| phh  | &#43386;          | O       | X     |
| hs   | &#43387;          | O       | X     |
| qq   | &#43388;          | O       | X     |
| ksk  | &#4548;           | X       | O     |
| nz   | &#4552;           | X       | O     |
| nth  | &#4553;           | X       | O     |
| lks  | &#4556;           | X       | O     |
| ltH  | &#4559;           | X       | O     |
| lmk  | &#4561;           | X       | O     |
| lms  | &#4562;           | X       | O     |
| lps  | &#4563;           | X       | O     |
| lpH  | &#4564;           | X       | O     |
| lss  | &#4566;           | X       | O     |
| lz   | &#4567;           | X       | O     |
| lkh  | &#4568;           | X       | O     |
| lq   | &#4569;           | X       | O     |
| ml   | &#4571;           | X       | O     |
| mss  | &#4574;           | X       | O     |
| mz   | &#4575;           | X       | O     |
| mch  | &#4576;           | X       | O     |
| mh   | &#4577;           | X       | O     |
| pl   | &#4579;           | X       | O     |
| pH   | &#4581;           | X       | O     |
| Gkk  | &#4589;           | X       | O     |
| Gkh  | &#4591;           | X       | O     |
| ngs  | &#4593;           | X       | O     |
| ngz  | &#4594;           | X       | O     |
| hn   | &#4597;           | X       | O     |
| hl   | &#4598;           | X       | O     |
| hm   | &#4599;           | X       | O     |
| hp   | &#4600;           | X       | O     |
| kn   | &#4602;           | X       | O     |
| kp   | &#4603;           | X       | O     |
| kch  | &#4604;           | X       | O     |
| kkh  | &#4605;           | X       | O     |
| kH   | &#4606;           | X       | O     |
| kl   | &#4547;           | X       | O     |
| nl   | &#55243;          | X       | O     |
| nch  | &#55244;          | X       | O     |
| ttp  | &#55246;          | X       | O     |
| tsk  | &#55249;          | X       | O     |
| tch  | &#55251;          | X       | O     |
| tth  | &#55252;          | X       | O     |
| llkh | &#55255;          | X       | O     |
| lmh  | &#55256;          | X       | O     |
| lpt  | &#55257;          | X       | O     |
| lpph | &#55258;          | X       | O     |
| lng  | &#55259;          | X       | O     |
| lqh  | &#55260;          | X       | O     |
| mn   | &#55262;          | X       | O     |
| mnn  | &#55263;          | X       | O     |
| mm   | &#55264;          | X       | O     |
| mps  | &#55265;          | X       | O     |
| mc   | &#55266;          | X       | O     |
| plph | &#55268;          | X       | O     |
| pm   | &#55269;          | X       | O     |
| sP   | &#55275;          | X       | O     |
| ssk  | &#55276;          | X       | O     |
| sst  | &#55277;          | X       | O     |
| sz   | &#55278;          | X       | O     |
| zp   | &#55283;          | X       | O     |
| zP   | &#55284;          | X       | O     |
| ngm  | &#55285;          | X       | O     |
| ngh  | &#55286;          | X       | O     |
| cp   | &#55287;          | X       | O     |
| cpp  | &#55288;          | X       | O     |
| cc   | &#55289;          | X       | O     |
| phs  | &#55290;          | X       | O     |
| phth | &#55291;          | X       | O     |

### Vowels

| Yale  | Hangul   |
| ----- | -------- |
| a     | ㅏ       |
| ay    | ㅐ       |
| ya    | ㅑ       |
| yay   | ㅒ       |
| e     | ㅓ       |
| ey    | ㅔ       |
| ye    | ㅕ       |
| yey   | ㅖ       |
| wo    | ㅗ       |
| wa    | ㅘ       |
| way   | ㅙ       |
| woy   | ㅚ       |
| yo    | ㅛ       |
| wu    | ㅜ       |
| we    | ㅝ       |
| wey   | ㅞ       |
| wi    | ㅟ       |
| yu    | ㅠ       |
| u     | ㅡ       |
| uy    | ㅢ       |
| i     | ㅣ       |
| awo   | &#4470;  |
| awu   | &#4471;  |
| yawo  | &#4472;  |
| yayo  | &#4473;  |
| eo    | &#4474;  |
| ewu   | &#4475;  |
| eu    | &#4476;  |
| yewo  | &#4477;  |
| yewu  | &#4478;  |
| woe   | &#4479;  |
| woey  | &#4480;  |
| woyey | &#4481;  |
| wowo  | &#4482;  |
| wowu  | &#4483;  |
| yoya  | &#4484;  |
| yoyay | &#4485;  |
| yoye  | &#4486;  |
| yowo  | &#4487;  |
| yoy   | &#4488;  |
| wua   | &#4489;  |
| wuay  | &#4490;  |
| weu   | &#4491;  |
| wuyey | &#4492;  |
| wuwu  | &#4493;  |
| yua   | &#4494;  |
| yue   | &#4495;  |
| yuey  | &#4496;  |
| yuye  | &#4497;  |
| yuyey | &#4498;  |
| yuwu  | &#4499;  |
| yuy   | &#4500;  |
| uwu   | &#4501;  |
| uu    | &#4502;  |
| uywu  | &#4503;  |
| ia    | &#4504;  |
| iya   | &#4505;  |
| iwo   | &#4506;  |
| iwu   | &#4507;  |
| iu    | &#4508;  |
| io    | &#4509;  |
| o     | &#4510;  |
| oe    | &#4511;  |
| owu   | &#4512;  |
| oy    | &#4513;  |
| oo    | &#4514;  |
| au    | &#4515;  |
| yawu  | &#4516;  |
| yeya  | &#4517;  |
| woya  | &#4518;  |
| woyay | &#4519;  |
| woye  | &#55216; |
| wowoy | &#55217; |
| yoa   | &#55218; |
| yoay  | &#55219; |
| yoe   | &#55220; |
| wuye  | &#55221; |
| wuyy  | &#55222; |
| yuay  | &#55223; |
| yuwo  | &#55224; |
| ua    | &#55225; |
| ue    | &#55226; |
| uey   | &#55227; |
| uwo   | &#55228; |
| iyawo | &#55229; |
| iyay  | &#55230; |
| iye   | &#55231; |
| iyey  | &#55232; |
| iwuy  | &#55233; |
| iyo   | &#55234; |
| iyu   | &#55235; |
| iy    | &#55236; |
| oa    | &#55237; |
| oey   | &#55238; |
