import * as React from "react";
import { FirebaseCrud } from "./base/FirebaseCrud";
import ordinal from "ordinal";

export const KanjiCrud = ({ db }) => (
  <FirebaseCrud
    db={db}
    datumToListItem={kanjiToListItem}
    collectionName="kanji"
    schema={schema}
  />
);

const kanjiToListItem = (k: Kanji) => (
  <div>
    {k.character}
    {k.hiragana ? ` - (${k.hiragana})` : null}
    {k.grade ? ` - (${ordinal(k.grade)} grade)` : null}
  </div>
);

interface Kanji {
  character: string;
  hiragana?: string;
  grade?: number;
}

const schema = {
  title: "Kanji",
  type: "object",
  required: ["character"],
  properties: {
    character: {
      type: "string",
      title: "Character",
      default: "今"
    },
    hiragana: {
      type: "string",
      title: "Hiragana",
      default: "いま"
    },
    grade: {
      type: "number",
      title: "Grade",
      enum: [1, 2, 3, 4, 5, 6]
    }
  }
};
