import { SvgIcon, useTheme } from '@mui/material';
import type { SVGProps } from 'react';
import { grey } from '@mui/material/colors';
// import theme from '../theme';

function CompartmentIcon(props: SVGProps<SVGSVGElement>) {
  const colorLight = '#627D98';
  const colorDark = '#AEB6BF';
  const theme = useTheme();
  const isDarkMode = theme.palette.mode === 'dark';

  return (
    <SvgIcon
      sx={{
        fontSize: '24px',
        marginRight: '10px',
        // color: 'grey[500]',
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
          fill={isDarkMode ? colorDark : colorLight}
          stroke="none"
          {...props}
        >
          <path
            d="M1446 4647 c-64 -37 -76 -71 -76 -224 l0 -132 303 -3 c348 -5 362 -7
453 -90 49 -46 65 -72 168 -284 l114 -233 1034 -3 c1189 -4 1087 5 1194 -102
106 -106 98 -38 102 -958 l3 -798 126 0 c151 0 195 15 231 79 l22 39 0 1002
c0 999 0 1002 -21 1040 -11 20 -35 45 -52 56 -31 18 -70 19 -1027 24 l-995 5
-50 24 c-95 47 -127 92 -251 347 l-114 234 -562 0 -563 0 -39 -23z"
          />
          <path
            d="M805 3981 c-45 -11 -74 -32 -98 -71 -20 -32 -22 -48 -22 -170 l0
-135 315 -5 315 -5 52 -27 c91 -48 115 -82 243 -338 l120 -240 1037 -2 1038
-3 56 -26 c66 -31 121 -85 158 -154 l26 -50 3 -807 2 -808 136 0 c155 0 184 9
224 67 l25 37 3 1040 c1 573 0 1051 -3 1063 l-5 22 -1038 3 -1037 3 -49 23
c-108 49 -125 72 -257 335 -67 133 -127 245 -133 249 -14 10 -1071 8 -1111 -1z"
          />
          <path
            d="M80 3281 c-19 -10 -45 -36 -57 -57 l-23 -39 0 -1311 0 -1311 23 -33
c12 -18 35 -43 50 -54 l28 -21 1761 -3 c1746 -2 1762 -2 1803 18 26 13 49 34
63 59 l22 39 -2 1058 -3 1059 -1045 5 -1045 5 -63 34 c-35 19 -77 51 -93 70
-17 20 -81 141 -144 269 l-114 232 -563 0 c-529 0 -565 -1 -598 -19z m2675
-2111 c62 -30 85 -78 85 -180 0 -94 -16 -139 -63 -172 -42 -30 -113 -34 -157
-10 -56 30 -80 83 -80 174 0 110 26 163 95 194 42 19 72 17 120 -6z m516 -11
c47 -33 59 -67 59 -172 0 -81 -3 -99 -23 -128 -44 -67 -135 -88 -197 -46 -57
38 -72 68 -78 150 -7 111 24 183 92 213 40 18 109 10 147 -17z"
          />
        </g>
      </svg>
    </SvgIcon>
  );
}

export default CompartmentIcon;
