import chai from "chai";
import chaiHttp from "chai-http";
import app from "../app";

chai.use(chaiHttp);
const expect = chai.expect;

describe("UserTask Api", () => {
  before(async () => {});
  it("insert a new userTask", (done) => {
    chai
      .request(app)
      .post("/api/userTask")
      .field("user_id", 1)
      .field("task_id", 1)
      .field("type_of_access", "Writter")
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.have.property("user_id", 1);
        expect(res.body).to.have.property("task_id", 1);
        expect(res.body).to.have.property("type_of_access", "Writter");
        done();
      });
  });
  it("get one userTask", (done) => {
    chai
      .request(app)
      .get("/api/userTask/1/1")
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.have.property("user_id", 1);
        expect(res.body).to.have.property("task_id", 1);
        expect(res.body).to.have.property("type_of_access", "Writter");
        done();
      });
  });
  it("put one userTask", (done) => {
    chai
      .request(app)
      .put("/api/userTask/1/1")
      .field("user_id", 2)
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.have.property("user_id", 2);
        expect(res.body).to.have.property("task_id", 1);
        expect(res.body).to.have.property("type_of_access", "Writter");
        done();
      });
  });
  it("delete one userTask", (done) => {
    chai
      .request(app)
      .delete("/api/userTask/1/1")
      .end((err, res) => {
        expect(res).to.have.status(200);
        done();
      });
  });
});
