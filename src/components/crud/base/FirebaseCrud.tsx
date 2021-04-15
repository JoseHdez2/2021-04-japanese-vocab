import * as React from "react";
import { useState, useEffect } from "react";
import { Button, Card } from "react-bootstrap";
import { DNDList } from "./DNDList";
// import { QuerySnapshot } from "firebase";
import Form from "@rjsf/core";
import { toast } from "react-toastify";

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

const testSchema = {
  title: "Todo",
  type: "object",
  required: ["title"],
  properties: {
    title: {
      type: "string",
      title: "Title",
      default: "A new task"
    },
    done: {
      type: "boolean",
      title: "Done?",
      default: false
    }
  }
};

const FirebasePostForm = ({
  db,
  collectionName,
  schema = testSchema,
  setOld
}: {
  db: any;
  collectionName: string;
  schema: any;
  setOld: any;
}) => {
  const [formData, setFormData] = useState(null);
  const handleSubmit = (e: any) => {
    // e.preventDefault();
    db.collection(collectionName)
      .add(formData)
      .then((docRef: any) => {
        toast("Created!");
        console.log(
          "Document written with ID: ",
          docRef.id
        );
        setOld(true);
      })
      .catch((error: any) => {
        toast("Error!");
        console.error("Error adding document: ", error);
      });
  };

  return (
    <Form
      schema={schema}
      formData={formData}
      onChange={(e) => setFormData(e.formData)}
      onSubmit={handleSubmit}
      onError={() => toast("errors")}
    />
  );
};
