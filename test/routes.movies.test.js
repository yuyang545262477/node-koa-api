process.env.NODE_ENV = "test";

const chai = require("chai");
const should = chai.should();
const chaiHttp = require("chai-http");
chai.use(chaiHttp);

const server = require("../src/server/index");
const knex = require("../src/server/db/connection");

describe("routes : movies", () => {
    beforeEach(() => {
        return knex.migrate.rollback()
            .then(() => knex.migrate.latest())
            .then(() => knex.seed.run());
    });

    afterEach(() => knex.migrate.rollback());

    describe("GET /api/v1/movies", () => {
        it("should return all movies", function (done) {
            chai.request(server)
                .get("/api/v1/movies")
                .end((err, res) => {
                    should.not.exist(err);
                    res.status.should.equal(200);
                    res.type.should.equal("application/json");
                    res.body.status.should.equal("success");
                    res.body.data.length.should.eql(3);
                    res.body.data[0].should.include.keys(
                        "id", "name", "genre", "rating", "explicit",
                    );
                    done();
                });
        });
    });
    describe("GET /api/v1/movies/:id", () => {
        it("should respond with a single movie", function (done) {
            // noinspection DuplicatedCode
            chai.request(server)
                .get("/api/v1/movies/1")
                .end((err, res) => {
                    should.not.exist(err);
                    res.status.should.equal(200);
                    res.type.should.equal("application/json");
                    res.body.status.should.equal("success");
                    res.body.data[0].should.include.keys(
                        "id", "name", "genre", "rating", "explicit",
                    );
                    done();
                });
        });
        it("should throw an error if the movie does not exist", function (done) {
            chai.request(server)
                .get("/api/v1/movies/99999")
                .end((err, res) => {
                    // should.exist(err);
                    res.status.should.equal(404);
                    res.type.should.equal("application/json");
                    res.body.status.equal("error");
                    res.body.message.should.equal("That movie does not exist.");
                    done();
                });

        });
    });

});




