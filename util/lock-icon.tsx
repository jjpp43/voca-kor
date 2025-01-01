import * as React from "react";
import Svg, { SvgProps, Path } from "react-native-svg";
const lockSvg = (props: SvgProps) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={20}
    height={20}
    fill="none"
    {...props}
  >
    <Path
      fill="#000"
      d="M16.25 6.406h-2.656V4.375a3.594 3.594 0 0 0-7.188 0v2.031H3.75A1.094 1.094 0 0 0 2.656 7.5v8.75a1.094 1.094 0 0 0 1.094 1.094h12.5a1.094 1.094 0 0 0 1.094-1.094V7.5a1.094 1.094 0 0 0-1.094-1.094ZM7.344 4.375a2.656 2.656 0 1 1 5.312 0v2.031H7.344V4.375Zm9.062 11.875a.156.156 0 0 1-.156.156H3.75a.156.156 0 0 1-.156-.156V7.5a.156.156 0 0 1 .156-.156h12.5a.156.156 0 0 1 .156.156v8.75Z"
    />
  </Svg>
);
export default lockSvg;
