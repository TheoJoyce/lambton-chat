require("dotenv").config();
const app = require("../server");
const request = require('supertest');
const jwt = require("jsonwebtoken");
const db = require("./config/database");
const agent = request.agent(app);
const User = require("../models/User");

let token;

const baseUser = {
        firstName: "John",
        lastName: "Smith",
        email: "JohnSmith@gmail.com",
        password: "testing123"
    };

beforeAll(async () => {
    const userToSave = new User(baseUser);
    userToSave.save((err, user) => {
        token = jwt.sign({
            id: user._id,
            serverID: user.serverID,
            ...baseUser
        },
        process.env.JWT_SECRET
        );
    }); 
});

beforeAll(async () => await db.connect());
afterAll(async () => await db.clear());
afterAll(async () => await db.close());
//------------------------------------------------------------------
//test the POST routes
//------------------------------------------------------------------

//test @route POST /api/users/update
//@access Private
describe("POST /update ...when passed an email, password, first name, last name", () => {
    test("it should respond with 200 status code", async () => {
        const validUser = new User(baseUser);
        const savedUser = await validUser.save();
        
        return request(app)
            .post('/api/users/update')
            .set('Authorization', `Bearer ${token}`)
            .send({token})
            .send({
                email: "UPDATEDtesting@gmail.com"
            })
            .then((response) => {
                expect(response.statusCode).toBe(200);
        });
    });
});

//test @route POST /api/users/auth/register
//@access Public
describe("POST /auth/register ...when passed an email, password, first name, last name", () => {
    test("it should respond with 201 status code", async () => {
        const res = await agent.post("/api/users/auth/register")
            .send({
                email: "testing@gmail.com",
                password: "testing123",
                firstName: "First",
                lastName: "Last"
            });
        expect(res.body).toBeTruthy();
        expect(res.statusCode).toBe(201);
    });
});

//test @route POST /api/users/auth/login
//@access Public
describe("POST /auth/login ...when passed an email, password", () => {
    test("it should respond with 200 status code", async () => {
        const res = await agent.post("/api/users/auth/login")
            .send({
                email: "testing@gmail.com",
                password: "testing123"   
            });
        expect(res.body).toBeTruthy();
        expect(res.statusCode).toBe(200);
    });
});

//test @route POST /api/users/auth/verify
//@access Public
describe("POST /auth/verify", () => {
    test("it should verify the access code and respond with 200 status code", async () => {
        return request(app)
            .post('/api/users/auth/verify')
            .send({token})
            .then((response) => {
                expect(response.statusCode).toBe(200);
        });
    });
});

//------------------------------------------------------------------
//test the GET routes
//------------------------------------------------------------------

//test @route GET /api/users/:id
//@access Private
describe("GET /:id", () => {
    test("it should get the id of the user and return 200", async () => {
        const validUser = new User(baseUser);
        const savedUser = await validUser.save();
        
        return request(app)
            .get(`/api/users/${savedUser._id}`)
            .set('Authorization', `Bearer ${token}`)
            .send({token})
            .then((response) => {
                expect(response.statusCode).toBe(200);
        });
    });
});

//test @route GET /api/users/all/:serverID
//@access Private
describe("GET /all/:serverID", () => {
    test("it should get all the users based on server id and return 200", async () => {
        const validUser = new User(baseUser);
        const savedUser = await validUser.save();
        
        return request(app)
            .get(`/api/users/all/${savedUser.serverID}`)
            .set('Authorization', `Bearer ${token}`)
            .send({token})
            .then((response) => {
                expect(response.statusCode).toBe(200);
        });
    });
});