import chai from "chai";
import chaiHttp from "chai-http";
import mocha from "mocha";
import fs from "fs";
import path from "path";
import app from "../app";

chai.use(chaiHttp);
const expect = chai.expect;

describe("Task Api", () => {
  before(async () => {});
  it("insert a new task", (done) => {
    chai
      .request(app)
      .post("/api/task")
      .field("_id", 1)
      .field("title", "GitHub Clone")
      .field("description", "Example of GitHub")
      .attach(
        "file",
        fs.readFileSync(path.join(__dirname, "./image-1701039179697.jpg")),
        "image.jpg"
      )
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.have.property("name", "GitHub Clone");
        expect(res.body).to.have.property("description", "Example of GitHub");
        done();
      });
  });
  it("get one task", (done) => {
    chai
      .request(app)
      .get("/api/task/1")
      .end((err, res) => {
        expect(res).to.have.status(200);
        done();
      });
  });
  it("delete one task", (done) => {
    chai
      .request(app)
      .delete("/api/task/1")
      .end((err, res) => {
        expect(res).to.have.status(200);
        done();
      });
  });
  it("put one task", (done) => {
    chai
      .request(app)
      .put("/api/task/1")
      .field("title", "Twitter Clone")
      .field("description", "Example of Twitter")
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.have.property("name", "Twitter Clone");
        expect(res.body).to.have.property("description", "Example of Twitter");
        done();
      });
  });
});
