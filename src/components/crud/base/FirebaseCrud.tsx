import * as React from "react";
import { useState, useEffect } from "react";
import { Button, Card } from "react-bootstrap";
import { DNDList } from "./DNDList";
import { FirebasePostForm } from "./FirebasePostForm";

const defaultMapFunction = (item: any) => (
  <div>{JSON.stringify(item)}</div>
);

export const FirebaseCrud = ({
  db,
  collectionName,
  datumToListItem = defaultMapFunction,
  schema
}: {
  db: any;
  collectionName: string;
  filterItem: any;
  datumToListItem: any;
  schema: any;
}) => {
  const [items, setItems] = useState(null);
  const [searchText, setSearchText] = useState("");
  const [isOld, setOld] = useState(true);

  useEffect(() => {
    db.collection(collectionName)
      .get()
      .then((querySnapshot: any) => {
        setItems(
          querySnapshot.docs.map((doc: any) => {
            const data = doc.data();
            data.id = doc.id;
            return data;
          })
        );
      })
      .catch((err: any) => console.error(err));
    setOld(false);
  }, [isOld]);

  useEffect(() => console.log(items), [items]);

  const defaultFilterItem = (item: any) =>
    JSON.stringify(item)
      .toLowerCase()
      .includes(searchText.toLowerCase());

  return (
    <Card style={{ margin: "10px", boxShadow: "5px" }}>
      <h3>{collectionName}</h3>
      <div>
        <span>🔎 Search: </span>
        <input
          style={{ width: "60%", margin: "auto" }}
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        ></input>
      </div>
      <Card
        style={{
          overflowY: "scroll",
          margin: "10px",
          height: "30rem"
        }}
      >
        <DNDList
          items={items || []}
          setItems={setItems}
          mapFunction={datumToListItem}
          filterFn={defaultFilterItem}
        />
      </Card>
      <Card
        style={{
          margin: "10px",
          padding: "10px",
          background: "#efe"
        }}
      >
        <FirebasePostForm
          db={db}
          setOld={setOld}
          schema={schema}
          collectionName={collectionName}
        />
      </Card>
    </Card>
  );
};
const mapFunction = (item: any) => (
  <div>{JSON.stringify(item)}</div>
);
