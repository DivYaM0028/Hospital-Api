//During the test the env variable is set to test
process.env.NODE_ENV = "test";

let Patient = require("../models/patients");

//Require the dev-dependencies
let chai = require("chai");
let chaiHttp = require("chai-http");
let server = require("../index");
let should = chai.should();

chai.use(chaiHttp);

describe("Unit Testsing for Patients Report :", () => {
  let token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZjFlZjllNmVhYWQwYTYzZmNjZWI0MjUiLCJ1c2VybmFtZSI6Inh5eiIsInBhc3N3b3JkIjoiMTIzIiwiY3JlYXRlZEF0IjoiMjAyMC0wNy0yN1QxNTo1OTozNC40NDNaIiwidXBkYXRlZEF0IjoiMjAyMC0wNy0yN1QxNTo1OTozNC40NDNaIiwiX192IjowLCJpYXQiOjE1OTU4NjU2MDgsImV4cCI6MTY5NTg2NTYwOH0.iq1kTLvfPo62C-U1P-f9pFi-xaVEDG2D716p4FilSJE";
  let auth = "bearer " + token;
  const patientID = "5f1efa53eaad0a63fcceb426"; 
  

  //Test Case 1: Doctor is not Authorized
  describe("POST /patients/id/create_report", () => {
    it("Return error because Doctor is not Authorize:", (done) => {
      let report = {
        status: "Positive",
      };
      chai
        .request(server)
        .post(`/patients/${patientID}/create_report`)
        .send(report)
        .end((err, res) => {
          res.should.have.status(401);
          done();
        });
    });
  });

  //Test Case 2:  Report Successfully created
  describe("POST /patients/:id/create_report", () => {
    it("Report Successfully created:", (done) => {
      let report = {
        status: "Symptoms-Quarantine",
      };

      chai
        .request(server)
        .post(`/patients/${patientID}/create_report`)
        .set("Content-Type", "application/x-www-form-urlencoded")
        .set("Authorization", auth)
        .send(report)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.have.property("message");
          res.body.should.have
            .property("message")
            .eql(" Report Created");
          done();
        });
    });
  });

  //Test Case 3:  Missing Fields
  describe("POST /patients/:id/create_report", () => {
    it("Return error because of Missing Input Fields :", (done) => {
      let report = {
     
      };
      chai
        .request(server)
        .post(`/patients/${patientID}/create_report`)
        .set("Content-Type", "application/x-www-form-urlencoded")
        .set("Authorization", auth)
        .send(report)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.have.property("message");
          res.body.should.have.property("message").eql("Missing Fields!!");
          done();
        });
    });
  });
  
});
