import "./styles.css";
import { useState, useEffect } from "react";
import { Card, Jumbotron } from "react-bootstrap";
import { Record } from "./components/Record";
import { JapaneseWord } from "./components/JapaneseWord";
import { DNDList } from "./components/DNDList.js";
import { SaveJsonButton } from "./components/SaveJsonButton";
import { StatsDiv } from "./components/StatsDiv";
import wordsJson from "./data/words.json";
import { kanjiCsv } from "./data/kanji.csv";
import { csv } from "csvtojson";

const loadData = (url) =>
  fetch("https://api.jsonbin.io/b/605512787ffeba41c07e34c2").then((response) => response.json());

const loadKanji = () => {
  csv()
    .fromString(kanjiCsv)
    .then((jsonObj) => {
      console.log(jsonObj);
    });
};

const loadWords = () => new Promise(() => wordsJson);

export default function App() {
  const [isLoaded, setLoaded] = useState(false);
  const [data, setData] = useState(null);
  const [words, setWords] = useState(null);
  const [items, setItems] = useState(null);

  useEffect(() => {
    async function loadDataAsync() {
      try {
        let data = await loadData();
        setData(data);
      } catch (e) {
        console.warn(e);
      } finally {
        setLoaded(true);
      }
    }

    loadDataAsync();
  }, []);

  useEffect(() => {
    console.log("words:" + wordsJson);
    setWords(wordsJson);
  }, []);

  useEffect(() => {
    setItems(data?.records.map((item, ind) => new Object({ ...item, id: ind.toString() })));
  }, [data]);

  const deleteItem = (id) => {
    console.log(`Deleting id ${id}.`);
    setItems(items.filter((item) => item.id !== id));
  };

  const myMapFn = (item) => <Record record={item} onDelete={deleteItem} />;
  const wordMapFn = (item) => <JapaneseWord item={item} />;

  const wordFilterFn = (item) => item.id !== 0;

  return (
    <div className="App" style={{ margin: "1rem auto" }}>
      <Jumbotron>
        <h1>Japanese Vocab</h1>
        <p>
          Tool for <strong>learning</strong> Japanese vocabulary.
        </p>
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
        <DNDList items={words || []} setItems={setWords} mapFunction={wordMapFn} />
      </Card>
      <h2>Web Interactions</h2>
      <Card
        style={{
          overflowY: "scroll",
          height: "30rem",
          width: "80%",
          margin: "auto"
        }}
      >
        <DNDList items={items || []} setItems={setItems} mapFunction={myMapFn} />
      </Card>
      <SaveJsonButton json={items} filename="interactions" />
    </div>
  );
}
