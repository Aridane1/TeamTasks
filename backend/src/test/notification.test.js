import chai from "chai";
import chaiHttp from "chai-http";
import app from "../app";

chai.use(chaiHttp);
const expect = chai.expect;

describe("Notification Api", () => {
  before(async () => {});
  it("insert a new notification", (done) => {
    chai
      .request(app)
      .post("/api/notification")
      .field("_id", 1)
      .field("title", "3 dias")
      .field("description", "Te quedan tres dias para el tiempo limite")
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.have.property("title", "3 dias");
        expect(res.body).to.have.property(
          "description",
          "Te quedan tres dias para el tiempo limite"
        );
        done();
      });
  });
  it("get one notification", (done) => {
    chai
      .request(app)
      .get("/api/notification/1")
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.have.property("title", "3 dias");
        expect(res.body).to.have.property(
          "description",
          "Te quedan tres dias para el tiempo limite"
        );
        done();
      });
  });
  it("put one notification", (done) => {
    chai
      .request(app)
      .put("/api/notification/1")
      .field("title", "1 dia")
      .field("description", "Te quedan un dia para el tiempo limite")
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.have.property("title", "1 dias");
        expect(res.body).to.have.property(
          "description",
          "Te quedan un dia para el tiempo limite"
        );
        done();
      });
  });
  it("delete one notification", (done) => {
    chai
      .request(app)
      .delete("/api/notification/1")
      .end((err, res) => {
        expect(res).to.have.status(200);
        done();
      });
  });
});
