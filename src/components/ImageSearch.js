import { useState, useEffect } from "react";
import { Button, Card, Form } from "react-bootstrap";
import { DNDList } from "./DNDList";

export const ImageSearch = () => {
  return (
    <div>
      <div>
        <span>🔎 Search: </span>
        <input style={{ width: "60%", margin: "auto" }}></input>
      </div>
    </div>
  );
};
