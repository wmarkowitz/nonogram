import React from "react";
import { Flex } from "grid-styled";
import { RowBox } from "../../styles";

const HorizontalNumbers = ({ lst, topRowHeight, highlightIndex }) => {
  return (
    <Flex flexDirection="column">
      <RowBox borderLeft="1px solid black" height={topRowHeight} />
      {lst.map((arr, ind) => (
        <RowBox
          borderLeft="1px solid black"
          highlight={highlightIndex === ind}
          key={ind}
        >
          {arr.map(el => `${el} `)}
        </RowBox>
      ))}
    </Flex>
  );
};

export default HorizontalNumbers;
