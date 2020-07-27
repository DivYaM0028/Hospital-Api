//During the test the env variable is set to test
process.env.NODE_ENV = "test";

let Patient = require("../models/patients");

//Require the dev-dependencies
let chai = require("chai");
let chaiHttp = require("chai-http");
let server = require("../index");
let should = chai.should();

chai.use(chaiHttp);

describe("Unit Testsing for Display All Report of Patients Report :", () => {
  let token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZjFlYzE0ZjllNTgwZjVjNmM3OWQ3ZGUiLCJ1c2VybmFtZSI6Inh5eiIsInBhc3N3b3JkIjoiJDJhJDEwJGxOZTVHcGdONVVESWRCQnY2a2R0R2UyN0gvaTFCMHA0TkN1LmdQclljc3N1U3hJZXl3eEpxIiwiY3JlYXRlZEF0IjoiMjAyMC0wNy0yN1QxMTo1ODowNy40ODlaIiwidXBkYXRlZEF0IjoiMjAyMC0wNy0yN1QxMTo1ODowNy40ODlaIiwiX192IjowLCJpYXQiOjE1OTU4NTEyNTksImV4cCI6MTY5NTg1MTI1OX0.xZpW-0dT6NrSObO5oti5Mw2z-AB0X9xQVHWJvUbqc3Q";
  let auth = "bearer " + token;
  const patientID = "5f1ec2dc9e580f5c6c79d7e0"; //---patient 2

  /*
   *----Test case :- Create Patient Report
   */

  //---- Case 1: Doctor is not Authorize
  describe("POST /patients/:id/all_reports", () => {
    it("Return error because Doctor is not Authorize:", (done) => {
      chai
        .request(server)
        .get(`/patients/${patientID}/all_reports`)
        // .set("Authorization", auth)

        .end((err, res) => {
          res.should.have.status(401);
          done();
        });
    });
  });

  //---- Case 2:  All Report Displayed Successfully
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
    