import * as React from "react";
import Svg, { SvgProps, Path } from "react-native-svg";
const menuSvg = (props: SvgProps) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={36}
    height={36}
    fill="none"
    {...props}
  >
    <Path
      fill="#000"
      d="M31.219 18a.843.843 0 0 1-.844.844H5.625a.844.844 0 1 1 0-1.688h24.75a.843.843 0 0 1 .844.844ZM5.625 9.844h24.75a.844.844 0 1 0 0-1.688H5.625a.844.844 0 1 0 0 1.688Zm24.75 16.312H5.625a.844.844 0 1 0 0 1.688h24.75a.843.843 0 1 0 0-1.688Z"
    />
  </Svg>
);
export default menuSvg;
