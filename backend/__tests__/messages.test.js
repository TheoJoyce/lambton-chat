require("dotenv").config();
const app = require("../server");
const request = require('supertest');
const jwt = require("jsonwebtoken");
const db = require("./config/database");
const Message = require("../models/Message");

let token;

const baseMessage = {
    text: "testing 123"
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