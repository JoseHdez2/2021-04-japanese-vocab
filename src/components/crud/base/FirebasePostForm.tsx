import Form from "@rjsf/core";
import { toast } from "react-toastify";
import { useState } from "react";
import * as React from "react";

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

export const FirebasePostForm = ({
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
