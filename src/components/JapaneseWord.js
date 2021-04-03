import {
  Badge,
  Button,
  Tooltip,
  Popover,
  OverlayTrigger
} from "react-bootstrap";
import styled from "styled-components";

export const JapaneseWord = ({ item }) => (
  <div key={item.id}>
    <Kanji variant={wordType[item.type]}>{item.word}</Kanji>
    {" | "}
    <Hiragana> {item.hiragana}</Hiragana>
    <strong>
      {" | "}
      {item.meaning}
    </strong>
  </div>
);

const wordType = {
  noun: "secondary",
  verb: "danger",
  adjective: "primary",
  adverb: "success"
};

const Word = styled.span`
  font-size: 1.2em;
`;

const Kanji = styled(Badge)`
  ${Word};
  color: ${(props) => (props.variant === "secondary" ? "yellow" : "white")};
`;

const Hiragana = styled(Word)`
  background-color: lightgray;
`;
