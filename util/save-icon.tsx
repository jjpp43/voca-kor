import * as React from "react";
import Svg, { SvgProps, Path } from "react-native-svg";
const saveSvg = (props: SvgProps) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={28}
    height={28}
    fill="none"
    viewBox="0 0 36 36"
    {...props}
  >
    <Path
      fill="#000"
      d="M25.875 4.781h-15.75A1.969 1.969 0 0 0 8.156 6.75V31.5a.844.844 0 0 0 1.291.716L18 26.872l8.554 5.344a.844.844 0 0 0 1.29-.716V6.75a1.969 1.969 0 0 0-1.968-1.969Zm.281 25.196-7.71-4.818a.844.844 0 0 0-.895 0l-7.707 4.818V6.75a.281.281 0 0 1 .281-.281h15.75a.281.281 0 0 1 .281.281v23.227Z"
    />
  </Svg>
);
export default saveSvg;
