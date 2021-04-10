import { useState, useEffect } from "react";
import { Button, Card, Form } from "react-bootstrap";
import { DNDList } from "./DNDList";
import { ImageSearch } from "./ImageSearch";

export const MediaCrud = ({ db }) => {
  const [mediaWorks, setMediaWorks] = useState(null);
  const [searchText, setSearchText] = useState("");
  const [isOld, setOld] = useState(false);

  useEffect(() => {
    db.collection("mediaWorks")
      .get()
      .then((querySnapshot) => {
        setMediaWorks(querySnapshot.docs.map((doc) => doc.data()));
      });
    setOld(false);
  }, [isOld]);

  const mediaWorkFilter = (item) => item?.title?.toLowerCase().includes(searchText.toLowerCase());

  return (
    <Card style={{ margin: "10px", boxShadow: "5px" }}>
      <h3>Media Works</h3>
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
          items={mediaWorks || []}
          setItems={setMediaWorks}
          mapFunction={workMapFn}
          filterFn={mediaWorkFilter}
        />
      </Card>
      <Card style={{ margin: "10px", padding: "10px", background: "#efe" }}>
        <MediaWorkPostForm db={db} setOld={setOld} />
      </Card>
    </Card>
  );
};

const workMapFn = (item) => <MediaWork item={item} />;

const MediaWork = ({ item }) => (
  <div style={{ display: "grid", gridTemplateColumns: "100px auto" }} key={item.id}>
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

const MediaWorkPostForm = ({ db, setOld }) => {
  const [title, setTitle] = useState("");
  const [japaneseTitle, setJapaneseTitle] = useState("");
  const [literalTitle, setLiteralTitle] = useState("");
  const [coverUrl, setCoverUrl] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    db.collection("mediaWorks")
      .add({
        title: title,
        japaneseTitle: japaneseTitle,
        literalTitle: literalTitle,
        coverUrl: coverUrl
      })
      .then((docRef) => {
        console.log("Document written with ID: ", docRef.id);
        setTitle("");
        setJapaneseTitle("");
        setLiteralTitle("");
        setCoverUrl("");
        setOld(true);
      })
      .catch((error) => {
        console.error("Error adding document: ", error);
      });
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group inline="true" controlId="tangoForm.ControlInput2">
        <Form.Label>japanese title</Form.Label>
        <Form.Control
          placeholder="星のカービィ"
          value={japaneseTitle}
          onChange={(e) => setJapaneseTitle(e.target.value)}
        />
      </Form.Group>
      <Form.Group inline="true" controlId="tangoForm.ControlInput1">
        <Form.Label>title</Form.Label>
        <Form.Control
          placeholder="Kirby's Dream Land"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </Form.Group>
      <Form.Group inline="true" controlId="tangoForm.ControlInput2">
        <Form.Label>literal title</Form.Label>
        <Form.Control
          placeholder="Kirby of the Stars"
          value={japaneseTitle}
          onChange={(e) => setJapaneseTitle(e.target.value)}
        />
      </Form.Group>
      <Form.Group inline="true" controlId="tangoForm.ControlInput3">
        <Form.Label>cover url</Form.Label>
        <Form.Control
          placeholder="https://upload.wikimedia.org/wikipedia/en/c/c2/Kirby_boxart.png"
          value={coverUrl}
          onChange={(e) => setCoverUrl(e.target.value)}
        />
      </Form.Group>
      <ImageSearch />
      {title || japaneseTitle || coverUrl ? (
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
