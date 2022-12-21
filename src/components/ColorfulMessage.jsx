import React from "react";

const ColorfulMessage = (props) => {
  //ここで{color,message} =propsとすれば以降の文章でprops.が不要になる
  const contentStyle = {
    color: props.color,
    fontSize: "18px"
  };

  return <p style={contentStyle}>{props.message}</p>;
};

export default ColorfulMessage;
