const express = require("express");
const cors = require("cors");
const mysql = require("mysql2");
const port = process.env.PORT || 9000;

const app = express();
app.use(cors());
app.use(express.json());

const con = mysql.createConnection({
  host: "sql12.freesqldatabase.com",
  user: "sql12720192",
  password: "w9nFHeNuUH",
  database: "sql12720192",
});

app.post("/save", (req, res) => {
  let data = [req.body.rno, req.body.name, req.body.marks];
  let sql = "insert into student value(?,?,?)";
  con.query(sql, data, (err, result) => {
    if (err) {
      res.send(err);
    } else {
      res.send(result);
    }
  });
});

app.get("/gs", (req, res) => {
  let sql = "select * from student";
  con.query(sql, (err, result) => {
    if (err) {
      res.send(err);
    } else {
      res.send(result);
    }
  });
});

app.delete("/ds", (req, res) => {
  let data = [req.body.rno];
  console.log(data);
  let sql = "delete from student where rno=?";
  con.query(sql, data, (err, result) => {
    if (err) res.send(err);
    else res.send(result);
  });
});

app.put("/us", (req, res) => {
  let data = [req.body.name, req.body.marks, req.body.rno];
  let sql = "update student set name = ?, marks = ? where rno = ?";
  con.query(sql, data, (err, result) => {
    if (err) {
      res.send(err);
    } else {
      res.send(result);
    }
  });
});

app.listen(port, () => {
  console.log("ready @ 9000");
});
