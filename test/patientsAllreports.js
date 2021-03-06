process.env.NODE_ENV = "test";

let Patient = require("../models/patients");

let chai = require("chai");
let chaiHttp = require("chai-http");
let server = require("../index");
let should = chai.should();

chai.use(chaiHttp);

describe("Unit Testsing for Display All Report of Patients Report :", () => {
  let token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZjFlZjllNmVhYWQwYTYzZmNjZWI0MjUiLCJ1c2VybmFtZSI6Inh5eiIsInBhc3N3b3JkIjoiMTIzIiwiY3JlYXRlZEF0IjoiMjAyMC0wNy0yN1QxNTo1OTozNC40NDNaIiwidXBkYXRlZEF0IjoiMjAyMC0wNy0yN1QxNTo1OTozNC40NDNaIiwiX192IjowLCJpYXQiOjE1OTU4NjU2MDgsImV4cCI6MTY5NTg2NTYwOH0.iq1kTLvfPo62C-U1P-f9pFi-xaVEDG2D716p4FilSJE";
  let auth = "bearer " + token;
  const patientID = "5f1efa53eaad0a63fcceb426"; 
 
  // Test Case 1: Doctor is not Authorized
  describe("POST /patients/:id/all_reports", () => {
    it("Return error because Doctor is not Authorize:", (done) => {
      chai
        .request(server)
        .get(`/patients/${patientID}/all_reports`)
        .end((err, res) => {
          res.should.have.status(401);
          done();
        });
    });
  });

  //Test Case 2:  Display All Reports 
  describe("POST /patients/id/all_reports", () => {
    it("All Report Displayed Successfully:", (done) => {
      chai
        .request(server)
        .get(`/patients/${patientID}/all_reports`)
        .set("Authorization", auth)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.have.property("message");
          res.body.should.have.property("message").eql("Reports");
          done();
        });
    });
  });
});
    