import "./styles.css";
import { useState, useEffect } from "react";
import {
  Button,
  Card,
  ButtonGroup,
  Tabs,
  Tab
} from "react-bootstrap";
import { csv } from "csvtojson";
import * as googleTTS from "google-tts-api";
import firebase from "firebase";

import wordsJson from "./data/words.json";
import { kanjiCsv } from "./data/kanji.csv";

import { Record } from "./components/Record";
import { JapaneseWordCrud } from "./components/JapaneseWordCrud";
import { MediaCrud } from "./components/MediaCrud";
import { UserCard } from "./components/UserCard";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { KanjiCrud } from "./components/crud/KanjiCrud";

function logResults(error, results) {
  if (error) {
    console.log(error);
  } else {
    console.log(JSON.stringify(results, null, "  "));
  }
}
const firebaseConfig = {
  apiKey: "AIzaSyC1p596Mrz_lbwwp2JTT8XC4nhCd4zN94w",
  authDomain: "japanese-vocab-8bb33.firebaseapp.com",
  projectId: "japanese-vocab-8bb33",
  storageBucket: "japanese-vocab-8bb33.appspot.com",
  messagingSenderId: "845111604595",
  appId: "1:845111604595:web:da527b97c6014455698106"
};

// Initialize Firebase

if (firebase.apps.length === 0) {
  firebase.initializeApp(firebaseConfig);
}

let provider = new firebase.auth.GoogleAuthProvider();
let db = firebase.firestore();

const loadData = (url) =>
  fetch(
    "https://api.jsonbin.io/b/605512787ffeba41c07e34c2"
  ).then((response) => response.json());

const loadKanji = () => {
  csv()
    .fromString(kanjiCsv)
    .then((jsonObj) => {
      console.log(jsonObj);
    });
};

// const loadWords = () => new Promise(() => wordsJson);

export default function App() {
  const [isLoaded, setLoaded] = useState(false);
  const [data, setData] = useState(null);
  const [items, setItems] = useState(null);
  // ---
  const [credential, setCredential] = useState(null);
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);
  // ---

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
    setItems(
      data?.records.map(
        (item, ind) =>
          new Object({ ...item, id: ind.toString() })
      )
    );
  }, [data]);

  const signIn = () => {
    firebase
      .auth()
      .signInWithPopup(provider)
      .then((result) => {
        /** @type {firebase.auth.OAuthCredential} */
        setCredential(result.credential);

        // This gives you a Google Access Token. You can use it to access the Google API.
        setToken(credential.accessToken);
        // The signed-in user info.
        setUser(result.user);
        console.log(result.user);
        // ...
      })
      .catch((error) => {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // The email of the user's account used.
        var email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        var credential = error.credential;
        // ...
        console.error(errorMessage);
      });
  };

  const deleteItem = (id) => {
    console.log(`Deleting id ${id}.`);
    setItems(items.filter((item) => item.id !== id));
  };

  const myMapFn = (item) => (
    <Record record={item} onDelete={deleteItem} />
  );

  const wordFilterFn = (item) => item.id !== 0;

  const menuItems = ["jp-words", "kanji", "vidyagames"];

  return (
    <div className="App" style={{ margin: "1rem auto" }}>
      <Button onClick={signIn}>Sign In</Button>
      <UserCard
        name={user?.displayName}
        email={user?.email}
        photoUrl={user?.photoURL}
      />

      <Tabs defaultActiveKey="words" id="tab-menu">
        <Tab eventKey="words" title="jp words">
          <JapaneseWordCrud db={db} />
        </Tab>
        <Tab eventKey="kanji" title="kanji">
          <KanjiCrud db={db} />
        </Tab>
        <Tab eventKey="media" title="media">
          <MediaCrud db={db}></MediaCrud>
        </Tab>
      </Tabs>
      <ToastContainer
        hideProgressBar={true}
        autoClose={3000}
      />
      {/* <SaveJsonButton json={items} filename="interactions" /> */}
    </div>
  );
}
