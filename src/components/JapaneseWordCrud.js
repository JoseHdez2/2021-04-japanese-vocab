import { useState, useEffect } from "react";
import { Button, Card, Form } from "react-bootstrap";
import { DNDList } from "./crud/base/DNDList";

export const JapaneseWordCrud = ({ db }) => {
  const [words, setWords] = useState(null);
  const [searchText, setSearchText] = useState("");
  const [isOld, setOld] = useState(false);

  useEffect(() => {
    db.collection("words")
      .get()
      .then((querySnapshot) => {
        setWords(
          querySnapshot.docs.map((doc) => {
            const data = doc.data();
            data.id = doc.id;
            return data;
          })
        );
      });
    setOld(false);
  }, [isOld]);

  const jpWordFilter = (item) => item?.meaning?.toLowerCase().includes(searchText.toLowerCase());

  return (
    <Card style={{ margin: "10px", boxShadow: "5px" }}>
      <h3>Japanese Words</h3>
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
          items={words || []}
          setItems={setWords}
          mapFunction={wordMapFn}
          filterFn={jpWordFilter}
        />
      </Card>
      <Card style={{ margin: "10px", padding: "10px", background: "#efe" }}>
        <JapaneseWordPostForm db={db} setOld={setOld} />
      </Card>
    </Card>
  );
};

const wordMapFn = (item) => <JapaneseWord item={item} />;

const JapaneseWord = ({ item }) => (
  <div key={item.id}>
    {item.word}
    {" - "}
    {!item?.hiragana ? null : (
      <>
        (<small> {item.hiragana} </small>){" - "}
      </>
    )}

    {item.meaning}
  </div>
);

const JapaneseWordPostForm = ({ db, setOld }) => {
  const [word, setWord] = useState("");
  const [hiragana, setHiragana] = useState("");
  const [meaning, setMeaning] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    db.collection("words")
      .add({
        word: word,
        hiragana: hiragana,
        meaning: meaning
      })
      .then((docRef) => {
        console.log("Document written with ID: ", docRef.id);
        setWord("");
        setHiragana("");
        setMeaning("");
        setOld(true);
      })
      .catch((error) => {
        console.error("Error adding document: ", error);
      });
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="tangoForm.ControlInput1">
        <Form.Label>word</Form.Label>
        <Form.Control placeholder="日本語" value={word} onChange={(e) => setWord(e.target.value)} />
      </Form.Group>
      <Form.Group controlId="tangoForm.ControlInput1">
        <Form.Label>hiragana</Form.Label>
        <Form.Control
          placeholder="にほんご"
          value={hiragana}
          onChange={(e) => setHiragana(e.target.value)}
        />
      </Form.Group>
      <Form.Group controlId="tangoForm.ControlInput1">
        <Form.Label>meaning</Form.Label>
        <Form.Control
          placeholder="japanese"
          value={meaning}
          onChange={(e) => setMeaning(e.target.value)}
        />
      </Form.Group>
      {word || hiragana || meaning ? (
        <Button variant="secondary" type="reset">
          Clear
        </Button>
      ) : null}{" "}
      <Button variant="primary" type="submit">
        Create
      </Button>
    </Form>
  );
};
