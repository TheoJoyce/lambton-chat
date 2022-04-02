require("dotenv").config();
const app = require("../server");
const request = require('supertest');
const jwt = require("jsonwebtoken");
const db = require("./config/database");
const agent = request.agent(app);
const Message = require("../models/Message");

let token;

const baseMessage = {
    text: "testing 123"
};

const baseServer = {
    name: "testServerName",
    code: "1789456123"
}

const baseChannel = {
    name: "testChannel"
};

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
//test the GET routes
//------------------------------------------------------------------

//test @route GET /api/messages/:id
//@access Private
describe("GET /:id", () => {
    test("it should get the id of the message and return 200", async () => {
        const validMessage = new Message(baseMessage);
        const savedMessage = await validMessage.save();
        
        return request(app)
            .get(`/api/messages/${savedMessage._id}`)
            .set('Authorization', `Bearer ${token}`)
            .then((response) => {
                expect(response.statusCode).toBe(200);
        });
    });
});

//test @route GET /api/messages/:serverID/:channelID
//@access Private
describe("GET /messages/:serverID/:channelID", () => {
    test("it should get the message by serverID and channelID and return 200", async () => {
        const validMessage = new Message(baseMessage);
        const savedMessage = await validMessage.save();
        
        return request(app)
            .get(`/api/messages/${savedMessage.serverID}/${savedMessage.channelID}`)
            .set('Authorization', `Bearer ${token}`)
            .then((response) => {
                expect(response.statusCode).toBe(200);
        });
    });
});

//------------------------------------------------------------------
//test the POST routes
//------------------------------------------------------------------

//test @route POST /api/messages/create
//@access Private
describe("POST /create ...when passed a message", () => {
    test("it should respond with 201 status code", async () => {
        const validMessage = new Message(baseMessage);
        const savedMessage = await validMessage.save();

        const res = await agent.post("/api/messages/create")
        .set('Authorization', `Bearer ${token}`)  
        .send({...baseMessage})
        .send(savedMessage.serverID, savedMessage.channelID);
        expect(res.body).toBeTruthy();
        expect(res.statusCode).toBe(201);
    });
});