import chai from "chai";
import chaiHttp from "chai-http";
import fs from "fs";
import path from "path";
import app from "../app";

chai.use(chaiHttp);
const expect = chai.expect;

describe("Configuration Api", () => {
  before(async () => {});
  it("insert a new configuration", (done) => {
    chai
      .request(app)
      .post("/api/configuration")
      .field("_id", 1)
      .field("night_mode", true)
      .field("list_mode", true)
      .attach(
        "file",
        fs.readFileSync(path.join(__dirname, "./image-1701039179697.jpg")),
        "image.jpg"
      )
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.have.property("night_mode", true);
        expect(res.body).to.have.property("description", true);
        done();
      });
  });
  it("get one configuration", (done) => {
    chai
      .request(app)
      .get("/api/configuration/1")
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.have.property("night_mode", true);
        expect(res.body).to.have.property("description", true);
        done();
      });
  });
  it("delete one configuration", (done) => {
    chai
      .request(app)
      .delete("/api/configuration/1")
      .end((err, res) => {
        expect(res).to.have.status(200);
        done();
      });
  });
  it("put one configuration", (done) => {
    chai
      .request(app)
      .put("/api/configuration/1")
      .field("_id", 1)
      .field("night_mode", false)
      .field("list_mode", false)
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.have.property("night_mode", true);
        expect(res.body).to.have.property("description", true);
        done();
      });
  });
});