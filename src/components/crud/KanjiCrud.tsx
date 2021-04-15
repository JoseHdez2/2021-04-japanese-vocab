import * as React from "react";
import { FirebaseCrud } from "./base/FirebaseCrud";

export const KanjiCrud = ({ db }) => (
  <FirebaseCrud
    db={db}
    datumToListItem={kanjiToListItem}
    collectionName="kanji"
    schema={kanjiSchema}
  />
);

const kanjiToListItem = (k: Kanji) => (
  <div>
    {k.character}
    {k.hiragana ? ` - (${k.hiragana})` : null}
  </div>
);

interface Kanji {
  character: string;
  hiragana?: string;
}

const kanjiSchema = {
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
    }
  }
};
