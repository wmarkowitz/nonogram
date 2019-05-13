import React from "react";
import { Box, Flex } from "grid-styled";
import { RowBox } from "../../styles";

const BoardRow = ({ lst, width }) => (
  <Flex>
    {Array(width)}
    {Array(width)
      .fill("")
      .map((_, ind) => {
        return <RowBox key={ind} />;
      })}
  </Flex>
);

export default BoardRow;
