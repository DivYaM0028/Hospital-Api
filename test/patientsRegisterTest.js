process.env.NODE_ENV = "test";

let Patient = require("../models/patients");

let chai = require("chai");
let chaiHttp = require("chai-http");
let server = require("../index");
let should = chai.should();

chai.use(chaiHttp);

describe("Unit_Testsing for Patients Register :", () => {
  let token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZjFlZjllNmVhYWQwYTYzZmNjZWI0MjUiLCJ1c2VybmFtZSI6Inh5eiIsInBhc3N3b3JkIjoiMTIzIiwiY3JlYXRlZEF0IjoiMjAyMC0wNy0yN1QxNTo1OTozNC40NDNaIiwidXBkYXRlZEF0IjoiMjAyMC0wNy0yN1QxNTo1OTozNC40NDNaIiwiX192IjowLCJpYXQiOjE1OTU4NjU2MDgsImV4cCI6MTY5NTg2NTYwOH0.iq1kTLvfPo62C-U1P-f9pFi-xaVEDG2D716p4FilSJE";
  let auth = "bearer " + token;



  //Test Case 1: Doctor is not Authorized
  describe("POST /patients/register", () => {
    it("Error : Doctor is not Authorized:", (done) => {
      let patient = {
        name: "Mr. zyx",
        phone: 89898989889,
      };

      chai
        .request(server)
        .post("/patients/register")
        .set("Content-Type", "application/x-www-form-urlencoded")
        .send(patient)
        .end((err, res) => {
          res.should.have.status(401);
          done();
        });
    });
  });

  
  //Test Case 2: Patient Successfully Created
  describe("POST /patients/register", () => {
    it("Patient Successfully Created:", (done) => {
      let patient = {
        name: "Mr. Zuxxy ",
        phone: 5656565678,
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

  //Test Case 3: Patient already exist
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
            .eql("Patient Already registered");
          done();
        });
    });
  });

  //Test Case 4: Missing Fields
  describe("POST /patients/register", () => {
    it("Error : Missing Input Fields :", (done) => {
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
          res.body.should.have.property("message").eql("Missing Name or PhoneNumber!!");
          done();
        });
    });
  });
});
