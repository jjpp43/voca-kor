import * as React from "react";
import Svg, { SvgProps, Path } from "react-native-svg";
const speakerSvg = (props: SvgProps) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={36}
    height={36}
    fill="none"
    {...props}
  >
    <Path
      fill="#000"
      d="M22.871 3.742a.843.843 0 0 0-.888.091l-9.898 7.698h-6.46A1.969 1.969 0 0 0 3.656 13.5v9a1.969 1.969 0 0 0 1.969 1.969h6.46l9.898 7.698a.844.844 0 0 0 1.36-.667v-27a.845.845 0 0 0-.472-.758Zm-1.215 26.032-8.763-6.816a.844.844 0 0 0-.518-.177h-6.75a.281.281 0 0 1-.281-.281v-9a.281.281 0 0 1 .281-.281h6.75c.187 0 .37-.063.518-.177l8.763-6.817v23.55Zm7.313-15.149v6.75a.844.844 0 0 1-1.688 0v-6.75a.843.843 0 1 1 1.688 0Zm4.5-2.25v11.25a.843.843 0 1 1-1.688 0v-11.25a.843.843 0 1 1 1.688 0Z"
    />
  </Svg>
);
export default speakerSvg;
