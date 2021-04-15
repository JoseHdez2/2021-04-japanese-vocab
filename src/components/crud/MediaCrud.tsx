import * as React from "react";
import { FirebaseCrud } from "./base/FirebaseCrud";

export const MediaCrud = ({ db }) => (
  <FirebaseCrud
    db={db}
    datumToListItem={datumToListItem}
    collectionName="media"
    schema={schema}
  />
);

const datumToListItem = (item: any) => (
  <MediaWork item={item} />
);

const MediaWork = ({ item }) => (
  <div
    style={{
      display: "grid",
      gridTemplateColumns: "100px auto"
    }}
    key={item.id}
  >
    <img style={{ width: "100px" }} src={item.coverUrl} />
    <div style={{ margin: "auto" }}>
      <h4>{item.japaneseTitle}</h4>
      <small>
        ( {item.title}
        {!item.literalTitle ? null : (
          <span>
            ,
            <br /> lit. <i>{item.literalTitle}</i>
          </span>
        )}
        )
      </small>
    </div>
  </div>
);

const schema = {
  title: "Media",
  type: "object",
  required: ["japaneseTitle", "title"],
  properties: {
    japaneseTitle: {
      type: "string",
      title: "Japanese Title",
      default: ""
    },
    title: {
      type: "string",
      title: "Title",
      default: ""
    },
    literalTitle: {
      type: "string",
      title: "Literal Title",
      default: ""
    },
    coverUrl: {
      type: "string",
      title: "Cover URL",
      default: ""
    },
    mediaType: {
      type: "string",
      title: "Media Type",
      enum: ["game", "movie", "series"],
      default: ""
    }
  }
};
