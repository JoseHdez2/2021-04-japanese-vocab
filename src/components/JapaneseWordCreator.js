import { useState } from "react";

const JapaneseWordCreator = ({ db, user }) => {
  const [kanji, setKanji] = useState(null);
  const [hiragana, setHiragana] = useState(null);
  const [meaning, setMeaning] = useState(null);

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "20% 40% 40%",
        margin: "auto"
      }}
    >
      <div>
        <span>Kanji:</span>
        <input></input>
      </div>
      <div>
        <span>Hiragana:</span>
        <input></input>
      </div>
      <div>
        <span>Meaning:</span>
        <input></input>
      </div>
    </div>
  );
};
