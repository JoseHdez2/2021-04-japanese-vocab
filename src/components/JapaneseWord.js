import { Badge, Button, Tooltip, Popover, OverlayTrigger } from "react-bootstrap";
import styled from "styled-components";

export const JapaneseWord = ({ item }) => (
  <div key={item.id}>
    {item.word}
    {" - "}
    <small> {item.hiragana}</small>
    {" - "}
    {item.meaning}
  </div>
);
