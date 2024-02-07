import { SvgIcon } from '@mui/material';
import type { SVGProps } from 'react';

function BoxIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <SvgIcon
      sx={{
        fontSize: '50px',
        marginRight: '25px',
      }}
    >
      <svg
        version="1.0"
        xmlns="http://www.w3.org/2000/svg"
        width="512.000000pt"
        height="512.000000pt"
        viewBox="0 0 512.000000 512.000000"
        preserveAspectRatio="xMidYMid meet"
      >
        <g
          transform="translate(0.000000,512.000000) scale(0.100000,-0.100000)"
          fill="currentColor"
          stroke="none"
          {...props}
        >
          <path
            d="M1885 5099 c-22 -11 -165 -88 -317 -171 -238 -129 -278 -154 -287
-179 -20 -56 22 -107 78 -96 15 3 148 71 296 152 l269 146 253 -253 c139 -139
249 -255 245 -259 -4 -4 -387 -212 -852 -463 l-844 -457 -254 254 -253 254
448 242 c246 133 458 253 471 267 25 28 27 42 11 78 -19 41 -58 48 -115 22
-76 -36 -977 -526 -991 -539 -7 -7 -16 -27 -19 -45 -7 -33 -2 -39 287 -328
l294 -294 -80 -82 c-44 -46 -176 -180 -293 -298 -131 -134 -212 -223 -212
-236 1 -48 27 -67 315 -223 l290 -157 5 -689 c3 -380 9 -697 13 -706 10 -20
-68 24 980 -543 505 -273 926 -496 937 -496 11 0 432 223 937 496 1048 567
970 523 980 543 4 9 10 326 13 706 l5 689 290 157 c288 156 314 175 315 223 0
13 -81 102 -212 236 -117 118 -249 252 -293 298 l-80 82 294 294 c289 289 294
295 287 328 -3 18 -12 38 -19 45 -10 10 -1642 898 -1828 994 -44 23 -66 29
-87 24 -17 -4 -128 -107 -314 -293 l-288 -286 -293 292 c-224 223 -299 292
-318 292 -13 0 -42 -9 -64 -21z m2169 -613 l847 -460 -253 -253 -254 -254
-779 422 c-429 231 -813 439 -854 461 l-73 41 253 253 c140 140 257 253 260
252 3 -2 387 -210 853 -462z m-649 -603 c465 -251 844 -457 843 -459 -2 -1
-382 -207 -845 -458 l-843 -455 -845 456 c-464 252 -843 458 -841 460 4 4
1679 912 1684 912 1 1 383 -204 847 -456z m-1833 -1009 c464 -250 846 -458
850 -462 4 -4 -106 -121 -245 -260 l-252 -252 -853 462 -852 462 252 253 c139
139 254 253 255 253 2 0 382 -205 845 -456z m3076 203 l252 -253 -442 -239
c-244 -132 -455 -252 -470 -267 -33 -32 -35 -56 -7 -92 33 -41 66 -34 211 44
71 39 131 70 134 70 2 0 4 -276 4 -612 l-1 -613 -838 -453 c-461 -248 -841
-452 -845 -452 -3 0 -6 456 -6 1012 l0 1012 248 -246 c136 -135 257 -249 268
-252 12 -4 34 -2 50 4 56 22 603 322 620 341 40 44 7 119 -53 119 -13 0 -149
-67 -301 -150 l-277 -150 -253 253 c-240 240 -252 253 -232 266 24 16 1672
909 1680 910 3 1 119 -113 258 -252z m-3321 -1024 c590 -320 604 -327 636
-317 12 3 133 117 270 252 l247 246 0 -1012 c0 -556 -3 -1012 -6 -1012 -3 0
-383 204 -845 452 l-838 453 -1 613 c0 336 2 612 4 612 3 0 242 -129 533 -287z"
          />
        </g>
      </svg>
    </SvgIcon>
  );
}

export default BoxIcon;
