import chai from "chai";
import chaiHttp from "chai-http";
import app from "../app";

chai.use(chaiHttp);
const expect = chai.expect;

describe("TagTask API", () => {
  before(async () => {
    await sequelize.sync({ force: true });
  });

  it("should delete tagTask", (done) => {
    chai
      .request(app)
      .post("/api/tagTask")
      .field("_id", "1")
      .field("tag_id", "1")
      .field("task_id", "1")
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.have.property("_id", "1");
        expect(res.body).to.have.property("tag_id", "1");
        expect(res.body).to.have.property("task_id", "1");
        done();
      });
  });

  it("should delete tagTask", (done) => {
    chai
      .request(app)
      .delete("/api/tagTask/1")
      .field("_id", "1")
      .end((err, res) => {
        expect(res).to.have.status(200);
        done();
      });
  });

  it("should get tag", (done) => {
    chai
      .request(app)
      .get("/api/tagTask/1")
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.have.property("tag_id", "1");
        expect(res.body).to.have.property("task_id", "1");
        done();
      });
  });
  it("should edit tagTask", (done) => {
    chai
      .request(app)
      .put("/api/tagTask/1")
      .field("tag_id", "2")
      .field("task_id", "2")
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.have.property("tag_id", "2");
        expect(res.body).to.have.property("task_id", "2");
        done();
      });
  });
});
