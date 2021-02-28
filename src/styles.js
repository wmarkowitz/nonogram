import styled from "styled-components";
import { Box } from "grid-styled";
import { borderLeft } from "styled-system";

export const RowBox = styled(Box)`
  display: flex;
  flex-direction: ${({ flexdirection }) =>
    flexdirection ? flexdirection : "row"};
  align-items: center;

  border: 1px solid black;
  border-left: none;
  min-height: ${({ height }) => (height ? `${height}px` : "25px")};
  min-width: 25px;
  padding: 0 3px;
  ${borderLeft};
  background-color: ${({ theme, highlight }) =>
    highlight ? theme.highlight : "white"};
`;
