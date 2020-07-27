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
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZjFlYzE0ZjllNTgwZjVjNmM3OWQ3ZGUiLCJ1c2VybmFtZSI6Inh5eiIsInBhc3N3b3JkIjoiJDJhJDEwJGxOZTVHcGdONVVESWRCQnY2a2R0R2UyN0gvaTFCMHA0TkN1LmdQclljc3N1U3hJZXl3eEpxIiwiY3JlYXRlZEF0IjoiMjAyMC0wNy0yN1QxMTo1ODowNy40ODlaIiwidXBkYXRlZEF0IjoiMjAyMC0wNy0yN1QxMTo1ODowNy40ODlaIiwiX192IjowLCJpYXQiOjE1OTU4NTEyNTksImV4cCI6MTY5NTg1MTI1OX0.xZpW-0dT6NrSObO5oti5Mw2z-AB0X9xQVHWJvUbqc3Q";
  let auth = "bearer " + token;
  const patientID = "5f1ec2dc9e580f5c6c79d7e0"; //--patient 4

  /*
   *----Test case :- Create Patient Report
   */

  //---- Case 1: Doctor is not Authorize
  describe("POST /patients/id/create_report", () => {
    it("Return error because Doctor is not Authorize:", (done) => {
      let report = {
        status: "Negative",
      };

      chai
        .request(server)
        .post(`/patients/${patientID}/create_report`)
        // .set("Authorization", auth)
        .send(report)

        .end((err, res) => {
          res.should.have.status(401);
          done();
        });
    });
  });

  //---- Case 2:  Missing Fields
  describe("POST /patients/id/create_report", () => {
    it("Return error because of Missing Input Fields :", (done) => {
      let report = {
        // status: "negative",
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

  //---- Case 2:  Report Successfully created
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
            .eql(" Report Successfully created");
          done();
        });
    });
  });
});
