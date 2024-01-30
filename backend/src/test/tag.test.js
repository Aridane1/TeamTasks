import chai from "chai";
import chaiHttp from "chai-http";
import app from "../app";

chai.use(chaiHttp);
const expect = chai.expect;

describe("TeamTask API", () => {
    before(async () => {
        await sequelize.sync({ force: true });
    });

    it("should delete tag", (done) => {
        chai
            .request(app)
            .post("/api/tag")
            .field("_id", "1")
            .field("title", "#LoveMacarrones.")
            .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res.body).to.have.property("title", "#LoveMacarrones.");
                done();
            });
    });

    it("should delete tag", (done) => {
        chai
            .request(app)
            .delete("/api/tag/1")
            .field("_id", "1")
            .end((err, res) => {
                expect(res).to.have.status(200);
                done();
            });
    });

    it("should edit tag", (done) => {
        chai
            .request(app)
            .delete("/api/tag/1")
            .field("title", "#OdioLosMacarrones.")
            .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res.body).to.have.property("title", "OdioLosMacarrones.");
                done();
            });
    });

    it("should edit tag", (done) => {
        chai
            .request(app)
            .get("/api/tag/1")
            .field("title", "#OdioLosMacarrones.")
            .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res.body).to.have.property("title", "OdioLosMacarrones.");
                done();
            });
    });
});
