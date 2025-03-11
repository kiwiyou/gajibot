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
  - `H`: High tone (〮)
  - `R`: Rising tone (〯)

## Letter Correspondence Table

### Consonants

| Yale | Hangul   | Initial | Final |
| ---- | -------- | ------- | ----- |
| k    | ㄱ       | O       | O     |
| kk   | ㄲ       | O       | O     |
| n    | ㄴ       | O       | O     |
| t    | ㄷ       | O       | O     |
| tt   | ㄸ       | O       | X     |
| l    | ㄹ       | O       | O     |
| m    | ㅁ       | O       | O     |
| p    | ㅂ       | O       | O     |
| pp   | ㅃ       | O       | X     |
| s    | ㅅ       | O       | O     |
| ss   | ㅆ       | O       | O     |
| G    | ㅇ       | O       | O     |
| c    | ㅈ       | O       | O     |
| cc   | ㅉ       | O       | X     |
| ch   | ㅊ       | O       | O     |
| kh   | ㅋ       | O       | O     |
| th   | ㅌ       | O       | O     |
| ph   | ㅍ       | O       | O     |
| h    | ㅎ       | O       | O     |
| `    | (Filler) | O       | X     |
| ks   | ㄳ       | X       | O     |
| nc   | ㄵ       | X       | O     |
| nh   | ㄶ       | X       | O     |
| lk   | ㄺ       | X       | O     |
| lm   | ㄻ       | X       | O     |
| lp   | ㄼ       | X       | O     |
| ls   | ㄽ       | X       | O     |
| lth  | ㄾ       | X       | O     |
| lph  | ㄿ       | X       | O     |
| lh   | ㅀ       | X       | O     |
| ps   | ㅄ       | X       | O     |
| nk   | &#4371;  | O       | O     |
| nn   | &#4372;  | O       | O     |
| nt   | &#4373;  | O       | O     |
| np   | &#4374;  | O       | X     |
| tk   | &#4375;  | O       | O     |
| ln   | &#4376;  | O       | O     |
| ll   | &#4377;  | O       | O     |
| lh   | &#4378;  | O       | O     |
| L    | &#4379;  | O       | X     |
| mp   | &#4380;  | O       | O     |
| M    | &#4381;  | O       | O     |
| pk   | &#4382;  | O       | X     |
| pn   | &#4383;  | O       | X     |
| pt   | &#4384;  | O       | X     |
| ps   | &#4385;  | O       | X     |
| psk  | &#4386;  | O       | X     |
| pst  | &#4387;  | O       | X     |
| psp  | &#4388;  | O       | X     |
| pss  | &#4389;  | O       | X     |
| psc  | &#4390;  | O       | X     |
| pc   | &#4391;  | O       | X     |
| pch  | &#4392;  | O       | X     |
| pth  | &#4393;  | O       | X     |
| pph  | &#4394;  | O       | X     |
| P    | &#4395;  | O       | O     |
| PP   | &#4396;  | O       | X     |
| sk   | &#4397;  | O       | O     |
| sn   | &#4398;  | O       | X     |
| st   | &#4399;  | O       | O     |
| sl   | &#4400;  | O       | O     |
| sm   | &#4401;  | O       | X     |
| sp   | &#4402;  | O       | O     |
| spk  | &#4403;  | O       | X     |
| sss  | &#4404;  | O       | X     |
| sG   | &#4405;  | O       | X     |
| sc   | &#4406;  | O       | X     |
| sch  | &#4407;  | O       | X     |
| skh  | &#4408;  | O       | X     |
| sth  | &#4409;  | O       | X     |
| sph  | &#4410;  | O       | X     |
| sh   | &#4411;  | O       | X     |
| s/   | &#4412;  | O       | X     |
| ss/  | &#4413;  | O       | X     |
| s\\  | &#4414;  | O       | X     |
| ss\\ | &#4415;  | O       | X     |
| z    | &#4416;  | O       | O     |
| Gk   | &#4417;  | O       | O     |
| Gt   | &#4418;  | O       | X     |
| Gm   | &#4419;  | O       | X     |
| Gp   | &#4420;  | O       | X     |
| Gs   | &#4421;  | O       | X     |
| Gz   | &#4422;  | O       | X     |
| GG   | &#4423;  | O       | O     |
| Gc   | &#4424;  | O       | X     |
| Gch  | &#4425;  | O       | X     |
| Gth  | &#4426;  | O       | X     |
| Gph  | &#4427;  | O       | X     |
| ng   | &#4428;  | O       | O     |
| cG   | &#4429;  | O       | X     |
| c/   | &#4430;  | O       | X     |
| cc/  | &#4431;  | O       | X     |
| c\\  | &#4432;  | O       | X     |
| cc\\ | &#4433;  | O       | X     |
| chkh | &#4434;  | O       | X     |
| chh  | &#4435;  | O       | X     |
| ch/  | &#4436;  | O       | X     |
| ch\\ | &#4437;  | O       | X     |
| php  | &#4438;  | O       | O     |
| PH   | &#4439;  | O       | O     |
| hh   | &#4440;  | O       | X     |
| q    | &#4441;  | O       | O     |
| kt   | &#4442;  | O       | X     |
| ns   | &#4443;  | O       | O     |
| nc   | &#4444;  | O       | O     |
| nh   | &#4445;  | O       | O     |
| tl   | &#4446;  | O       | O     |
| ksk  | &#4548;  | X       | O     |
| nz   | &#4552;  | X       | O     |
| nth  | &#4553;  | X       | O     |
| lks  | &#4556;  | X       | O     |
| lt   | &#4558;  | X       | O     |
| ltH  | &#4559;  | X       | O     |
| lmk  | &#4561;  | X       | O     |
| lms  | &#4562;  | X       | O     |
| lps  | &#4563;  | X       | O     |
| lpH  | &#4564;  | X       | O     |
| lP   | &#4565;  | X       | O     |
| lss  | &#4566;  | X       | O     |
| lz   | &#4567;  | X       | O     |
| lkh  | &#4568;  | X       | O     |
| lq   | &#4569;  | X       | O     |
| mk   | &#4570;  | X       | O     |
| ml   | &#4571;  | X       | O     |
| mp   | &#4572;  | X       | O     |
| ms   | &#4573;  | X       | O     |
| mss  | &#4574;  | X       | O     |
| mz   | &#4575;  | X       | O     |
| mch  | &#4576;  | X       | O     |
| mh   | &#4577;  | X       | O     |
| pl   | &#4579;  | X       | O     |
| pph  | &#4580;  | X       | O     |
| pH   | &#4581;  | X       | O     |
| Gkk  | &#4589;  | X       | O     |
| Gkh  | &#4591;  | X       | O     |
| ngs  | &#4593;  | X       | O     |
| ngz  | &#4594;  | X       | O     |
| hn   | &#4597;  | X       | O     |
| hl   | &#4598;  | X       | O     |
| hm   | &#4599;  | X       | O     |
| hp   | &#4600;  | X       | O     |
| kn   | &#4602;  | X       | O     |
| kp   | &#4603;  | X       | O     |
| kch  | &#4604;  | X       | O     |
| kkh  | &#4605;  | X       | O     |
| kH   | &#4606;  | X       | O     |

### Vowels

| Yale  | Hangul  |
| ----- | ------- |
| a     | ㅏ      |
| ay    | ㅐ      |
| ya    | ㅑ      |
| yay   | ㅒ      |
| e     | ㅓ      |
| ey    | ㅔ      |
| ye    | ㅕ      |
| yey   | ㅖ      |
| wo    | ㅗ      |
| wa    | ㅘ      |
| way   | ㅙ      |
| woy   | ㅚ      |
| yo    | ㅛ      |
| wu    | ㅜ      |
| we    | ㅝ      |
| wey   | ㅞ      |
| wi    | ㅟ      |
| yu    | ㅠ      |
| u     | ㅡ      |
| uy    | ㅢ      |
| i     | ㅣ      |
| awo   | &#4470; |
| awu   | &#4471; |
| yawo  | &#4472; |
| yayo  | &#4473; |
| eo    | &#4474; |
| ewu   | &#4475; |
| eu    | &#4476; |
| yewo  | &#4477; |
| yewu  | &#4478; |
| woe   | &#4479; |
| woey  | &#4480; |
| woyey | &#4481; |
| wowo  | &#4482; |
| wowu  | &#4483; |
| yoya  | &#4484; |
| yoyay | &#4485; |
| yoye  | &#4486; |
| yowo  | &#4487; |
| yoy   | &#4488; |
| wua   | &#4489; |
| wuay  | &#4490; |
| weu   | &#4491; |
| wuyey | &#4492; |
| wuwu  | &#4493; |
| yua   | &#4494; |
| yue   | &#4495; |
| yuey  | &#4496; |
| yuye  | &#4497; |
| yuyey | &#4498; |
| yuwu  | &#4499; |
| yuy   | &#4500; |
| uwu   | &#4501; |
| uu    | &#4502; |
| uywu  | &#4503; |
| ia    | &#4504; |
| iya   | &#4505; |
| iwo   | &#4506; |
| iwu   | &#4507; |
| iu    | &#4508; |
| io    | &#4509; |
| o     | &#4510; |
| oe    | &#4511; |
| owu   | &#4512; |
| oy    | &#4513; |
| oo    | &#4514; |
| au    | &#4515; |
| yawu  | &#4516; |
| yeya  | &#4517; |
| woya  | &#4518; |
| woyay | &#4519; |
