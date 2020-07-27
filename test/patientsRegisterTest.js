//During the test the env variable is set to test

process.env.NODE_ENV = "test";

let Patient = require("../models/patients");

//Require the dev-dependencies
let chai = require("chai");
let chaiHttp = require("chai-http");
let server = require("../index");
let should = chai.should();

chai.use(chaiHttp);

describe("Unit_Testsing for Patients Register :", () => {
  //---doctor=rohan2 token
  let token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZjFlYzE0ZjllNTgwZjVjNmM3OWQ3ZGUiLCJ1c2VybmFtZSI6Inh5eiIsInBhc3N3b3JkIjoiJDJhJDEwJGxOZTVHcGdONVVESWRCQnY2a2R0R2UyN0gvaTFCMHA0TkN1LmdQclljc3N1U3hJZXl3eEpxIiwiY3JlYXRlZEF0IjoiMjAyMC0wNy0yN1QxMTo1ODowNy40ODlaIiwidXBkYXRlZEF0IjoiMjAyMC0wNy0yN1QxMTo1ODowNy40ODlaIiwiX192IjowLCJpYXQiOjE1OTU4NTEyNTksImV4cCI6MTY5NTg1MTI1OX0.xZpW-0dT6NrSObO5oti5Mw2z-AB0X9xQVHWJvUbqc3Q";
  let auth = "bearer " + token;

  /*
   *----Test case :- Patient Register
   */

  //---- Case 1: Doctor is not Authorize
  describe("POST /patients/register", () => {
    it("Return error because Doctor is not Authorize:", (done) => {
      let patient = {
        name: "Mr. zyx",
        phone: 89898989889,
      };

      chai
        .request(server)
        .post("/patients/register")
        .set("Content-Type", "application/x-www-form-urlencoded")
        // .set("Authorization", auth)
        .send(patient)

        .end((err, res) => {
          res.should.have.status(401);
          done();
        });
    });
  });

  //---- Case 2: Missing Fields
  describe("POST /patients/register", () => {
    it("Return error because of Missing Input Fields :", (done) => {
      let patient = {
        name: "Mr. zyx",
        
      };

      chai
        .request(server)
        .post("/patients/register")
        .set("Content-Type", "application/x-www-form-urlencoded")
        .set("Authorization", auth)
        .send(patient)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.have.property("message");
          res.body.should.have.property("message").eql("Missing Fields!!");
          done();
        });
    });
  });

  //---- Case 3: Patient already exist
  describe("POST /patients/register", () => {
    it("Notify that patient already exist:", (done) => {
      let patient = {
        name: "Mr. zyx",
        phone: 89898989889,
      };

      chai
        .request(server)
        .post("/patients/register")
        .set("Content-Type", "application/x-www-form-urlencoded")
        .set("Authorization", auth)
        .send(patient)

        .end((err, res) => {
          res.should.have.status(409);
          res.body.should.be.a("object");
          res.body.should.have.property("message");
          res.body.should.have
            .property("message")
            .eql("Patient already registered");
          done();
        });
    });
  });

  //---- Case 4: Patient Successfully created
  describe("POST /patients/register", () => {
    it("Patient Successfully created:", (done) => {
      let patient = {
        name: "Mr. Zuzu",
        phone: 9292992929,
      };

      chai
        .request(server)
        .post("/patients/register")
        .set("Content-Type", "application/x-www-form-urlencoded")
        .set("Authorization", auth)
        .send(patient)

        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a("object");
          res.body.should.have.property("message");
          done();
        });
    });
  });
});
