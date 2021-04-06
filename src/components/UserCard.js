import { Card } from "react-bootstrap";

export const UserCard = ({ photoUrl, name, email }) => (
  <Card
    style={{
      display: "grid",
      gridTemplateColumns: "100px auto",
      maxWidth: "500px",
      margin: "auto",
      padding: "3px"
    }}
  >
    <img src={photoUrl} style={{ width: "96px", height: "96px", background: "black" }} alt=""></img>
    <div style={{ margin: "15px" }}>
      <h5>{name}</h5>
      <span style={{ color: "gray" }}>{email}</span>
    </div>
  </Card>
);
