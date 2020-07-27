process.env.NODE_ENV = "test";

let Patient = require("../models/reports");

let chai = require("chai");
let chaiHttp = require("chai-http");
let server = require("../index");
let should = chai.should();

chai.use(chaiHttp);

describe("Unit Testsing for Display All Report of Same Status :", () => {
  let token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZjFlZjllNmVhYWQwYTYzZmNjZWI0MjUiLCJ1c2VybmFtZSI6Inh5eiIsInBhc3N3b3JkIjoiMTIzIiwiY3JlYXRlZEF0IjoiMjAyMC0wNy0yN1QxNTo1OTozNC40NDNaIiwidXBkYXRlZEF0IjoiMjAyMC0wNy0yN1QxNTo1OTozNC40NDNaIiwiX192IjowLCJpYXQiOjE1OTU4NjU2MDgsImV4cCI6MTY5NTg2NTYwOH0.iq1kTLvfPo62C-U1P-f9pFi-xaVEDG2D716p4FilSJE";
  let auth = "bearer " + token;
  let status = "Negative"  
  // Test Case 1: Doctor is not Authorized
  describe("GET /reports/:status", () => {
    it("Return error because Doctor is not Authorize:", (done) => {
      chai
        .request(server)
        .get(`/reports/${status}`)
        .end((err, res) => {
          res.should.have.status(401);
          done();
        });
    });
  });

  //Test Case 2:  Display All Reports 
  describe("GET /reports/:status", () => {
    it("All Report Displayed Successfully:", (done) => {
      chai
        .request(server)
        .get(`/reports/${status}`)
        .set("Authorization", auth)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.have.property("message");
          res.body.should.have.property("message").eql("All Reports");
          done();
        });
    });
  });
});