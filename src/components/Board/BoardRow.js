import React from "react";
import { Flex } from "grid-styled";
import { RowBox } from "../../styles";

const BoardRow = ({ lst, highlightBox, highlightRow }) => (
  <Flex>
    {lst.map((el, ind) => {
      return (
        <RowBox highlight={highlightRow || ind === highlightBox} key={ind}>
          {el}
        </RowBox>
      );
    })}
  </Flex>
);

export default BoardRow;
