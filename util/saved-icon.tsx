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
      d="M34.5 6h-21a3 3 0 0 0-3 3v33a1.5 1.5 0 0 0 2.295 1.271L24 36.268l11.207 7.003A1.5 1.5 0 0 0 37.5 42V9a3 3 0 0 0-3-3Z"
    />
  </Svg>
);
export default saveSvg;
