var app = require("./app.ts");
var request = require('supertest');
var mongoose = require('mongoose')

describe("GET /patients", () => {
    describe("given a username and password", () => {
  
      test("should respond with a 200 status code", async () => {
        const response = await request(app).get("/patients")
        expect(response.statusCode).toBe(200)
      })

      afterAll( async () =>{
        await mongoose.connection.close()
      })

    })
})
