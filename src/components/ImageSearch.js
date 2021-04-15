import { useState, useEffect } from "react";
import { Button, Card, Form } from "react-bootstrap";
import { DNDList } from "./crud/base/DNDList";
import { GoogleImageSearch } from "./GoogleImageSearch";

const imageSearch = new GoogleImageSearch(
  "AIzaSyC1p596Mrz_lbwwp2JTT8XC4nhCd4zN94w",
  "17bc016f8a5099bdc"
);

export const ImageSearch = () => {
  const [imageSearchText, setImageSearchText] = useState(
    ""
  );
  const [resultUrls, setResultUrls] = useState([]);

  function logResults(error, results) {
    if (error) {
      console.error(error);
    } else {
      console.log(JSON.stringify(results, null, "  "));
    }
  }

  const handleKeyUp = (event) => {
    if (event.key === "enter") {
      search();
    }
  };

  const search = () => {
    imageSearch
      .getImageUrls(imageSearchText)
      .then((res) => {
        setResultUrls(res);
      });
  };

  return (
    <div>
      <Card>
        <span>🔎 Search Image: </span>
        <Card style={{ display: "flow" }}>
          <input
            style={{ width: "60%", margin: "auto" }}
            value={imageSearchText}
            onKeyUp={handleKeyUp}
            onChange={(e) =>
              setImageSearchText(e.target.value)
            }
          ></input>
          <Button onClick={search}>Search</Button>
        </Card>
        <Card
          style={{
            display: "flow",
            height: "300px",
            overflowX: "scroll"
          }}
        >
          {resultUrls.map((im, i) => (
            <img
              key={i.toString()}
              alt=""
              src={im}
              style={{ height: "300px" }}
            />
          ))}
        </Card>
      </Card>
    </div>
  );
};
