import * as React from "react";
import Svg, { SvgProps, Path } from "react-native-svg";
const saveSvg = (props: SvgProps) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={48}
    height={48}
    fill="none"
    {...props}
  >
    <Path
      fill="#484848"
      d="M34.5 6.375h-21A2.625 2.625 0 0 0 10.875 9v33a1.124 1.124 0 0 0 1.721.954l11.402-7.125 11.406 7.125A1.126 1.126 0 0 0 37.125 42V9A2.625 2.625 0 0 0 34.5 6.375Zm.375 33.594-10.28-6.423a1.125 1.125 0 0 0-1.193 0l-10.277 6.423V9a.375.375 0 0 1 .375-.375h21a.375.375 0 0 1 .375.375v30.97Z"
    />
  </Svg>
);
export default saveSvg;
