import "./styles.css";
import { useState, useEffect } from "react";
import { Card, Jumbotron } from "react-bootstrap";
import { Record } from "./components/Record";
import { DNDList } from "./components/DNDList.js";
import { SaveJsonButton } from "./components/SaveJsonButton";
import { StatsDiv } from "./components/StatsDiv";
import { csv } from "csvtojson";

const loadData = (url) =>
  fetch("https://api.jsonbin.io/b/605512787ffeba41c07e34c2").then((response) =>
    response.json()
  );

const loadKanji = () => {
  csv()
    .fromFile("./data/kanji.csv")
    .then((jsonObj) => {
      console.log(jsonObj);
    });
};

export default function App() {
  const [isLoaded, setLoaded] = useState(false);
  const [data, setData] = useState(null);
  const [items, setItems] = useState(null);

  useEffect(() => {
    async function loadDataAsync() {
      try {
        let data = await loadData();
        console.log(data);
        setData(data);
      } catch (e) {
        console.warn(e);
      } finally {
        setLoaded(true);
      }
    }
    // loadKanji();

    loadDataAsync();
  }, []);

  useEffect(() => {
    setItems(
      data?.records.map(
        (item, ind) => new Object({ ...item, id: ind.toString() })
      )
    );
  }, [data]);

  const deleteItem = (id) => {
    console.log(`Deleting id ${id}.`);
    setItems(items.filter((item) => item.id !== id));
  };

  const myMapFn = (item) => <Record record={item} onDelete={deleteItem} />;

  return (
    <div className="App" style={{ margin: "1rem auto" }}>
      <Jumbotron>
        <h1>Learn Japanese</h1>
        <p>Tool for learning japanese.</p>
      </Jumbotron>
      <h2>Japanese Words</h2>
      <Card
        style={{
          overflowY: "scroll",
          height: "30rem",
          width: "80%",
          margin: "auto"
        }}
      >
        <DNDList
          items={items || []}
          setItems={setItems}
          mapFunction={myMapFn}
        />
      </Card>
      <SaveJsonButton json={items} filename="interactions" />
    </div>
  );
}
