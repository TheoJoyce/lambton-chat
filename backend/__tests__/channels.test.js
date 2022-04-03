require("dotenv").config();
const app = require("../server");
const request = require('supertest');
const jwt = require("jsonwebtoken");
const db = require("./config/database");
const Channel = require("../models/Channel");
const User = require("../models/User");
const Server = require("../models/Server");

let token;

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
    const serverToSave = new Server(baseServer);
});

beforeAll(async () => await db.connect());
afterAll(async () => await db.clear());
afterAll(async () => await db.close());
//------------------------------------------------------------------
//test the GET routes
//------------------------------------------------------------------

//test @route GET /api/channels/:id
//@access Private
describe("GET /:id", () => {
    test("it should get the id of the channel and return 200", async () => {
        const channelToSave = new Channel(baseChannel);
        const savedChannel = await channelToSave.save();
        
        return request(app)
            .get(`/api/channels/${savedChannel._id}`)
            .set('Authorization', `Bearer ${token}`)
            //.send({baseChannel})
            .then((response) => {
                expect(response.statusCode).toBe(200);
        });
    });
});

//test @route GET /api/channels/all/:serverID
//@access Private
describe("GET /all/:serverID", () => {
    test("it should get all the channels based on server id and return 200", async () => {
        const channelToSave = new Channel(baseChannel);
        const savedChannel = await channelToSave.save();
        
        return request(app)
            .get(`/api/users/all/${savedChannel.serverID}`)
            .set('Authorization', `Bearer ${token}`)
            .then((response) => {
                expect(response.statusCode).toBe(200);
        });
    });
});
