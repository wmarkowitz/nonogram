import React from "react";
import { Box, Flex } from "grid-styled";
import { RowBox } from "../../styles";

const VerticalNumbers = ({ lst, highlightIndex }) => (
  <Flex id="verticalRow" flexdirection="row">
    {lst.map((arr, ind) => (
      <RowBox
        key={ind}
        flexdirection="column"
        highlight={highlightIndex === ind}
      >
        {arr.map((el, ind) => (
          <Box key={ind}>{el}</Box>
        ))}
      </RowBox>
    ))}
  </Flex>
);

export default VerticalNumbers;
