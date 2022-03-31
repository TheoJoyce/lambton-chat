require("dotenv").config();
const users = require("../routes/api/users");
const jwt = require('jsonwebtoken');
//const { request } = require("express");
const request = require('supertest');

/*describe("GET /:id", () => {
    test("It should verify the access token and respond with 200", async () => {
        //const response = await request(users).get("/:id");
        //expect(repsonse.body).toEqual();
        const jwtSpy = jest.spyOn(jwt, 'verify');
        jwtSpy.mockReturnValue('Some decoded token');

        const response = await request(users)
            .get('/verify-access-token')
            .set('access-token', 'randomjwttoken')
            .send({});

        expect(response.statusCode).toBe(200);
    });
});

describe("GET /all/:serverID", () => {
    test("It should respond with the user(s) based on server id", async () => {
        const response = await request(users).get("/all/:serverID");
        //expect(repsonse.body).toEqual();
        expect(response.statusCode).toBe(200);
    });
}); */

describe("POST /auth/register ...when passed an email, password, first name, last name", () => {
    test("it should respond with 200 status code", async () => {
        const response = await request(users).post("/users/auth/register")
            .send({
                email: "testing@gmail.com",
                password: "testing123",
                firstName: "First",
                lastName: "Last"
            });
        //expect(repsonse.body).toEqual();
        expect(response.statusCode).toBe(200);
    });
});

