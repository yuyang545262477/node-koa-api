process.env.NODE_ENV = "test";

const chai = require("chai");
const should = chai.should();
const chaiHttp = require("chai-http");
chai.use(chaiHttp);

const server = require("../src/server/index");

describe("routes:index", () => {
    /*test get method*/
    describe("GET /", () => {
        it("should return json", (done) => {
            chai.request(server)
                .get("/")
                .end((err, res) => {
                    res.status.should.be.eql(200);
                    res.type.should.be.eql("application/json");
                    res.body.status.should.be.eql("success");
                    res.body.message.should.be.eql("hello, world!");
                    done();
                });
        });
    });

});

