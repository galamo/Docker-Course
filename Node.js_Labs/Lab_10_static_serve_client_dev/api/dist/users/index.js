"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.users = void 0;
const express_1 = __importDefault(require("express"));
const getUserById_1 = require("./handlers/getUserById");
const router = express_1.default.Router();
exports.users = [
    {
        id: 1,
        name: "Alice Johnson",
        username: "alicej",
        email: "alice.johnson@example.com",
        phone: "+1-555-1234",
        address: "123 Maple St, Springfield, IL",
        createdAt: "2023-06-12T10:15:30Z",
    },
    {
        id: 2,
        name: "Bob Smith",
        username: "bobsmith",
        email: "bob.smith@example.com",
        phone: "+1-555-5678",
        address: "456 Oak Ave, Lincoln, NE",
        createdAt: "2023-07-01T08:22:45Z",
    },
    {
        id: 3,
        name: "Charlie Brown",
        username: "charlieb",
        email: "charlie.brown@example.com",
        phone: "+1-555-3344",
        address: "789 Pine Rd, Madison, WI",
        createdAt: "2023-05-18T14:05:12Z",
    },
    {
        id: 4,
        name: "Diana Prince",
        username: "dprince",
        email: "diana.prince@example.com",
        phone: "+1-555-9988",
        address: "101 Hero Lane, Themyscira",
        createdAt: "2023-08-22T09:31:00Z",
    },
    {
        id: 5,
        name: "Ethan Hunt",
        username: "ehunt",
        email: "ethan.hunt@example.com",
        phone: "+1-555-7755",
        address: "500 Spy St, Langley, VA",
        createdAt: "2023-09-10T12:47:20Z",
    },
    {
        id: 6,
        name: "Fiona Gallagher",
        username: "fionag",
        email: "fiona.g@example.com",
        phone: "+1-555-2311",
        address: "22 Liberty Blvd, Chicago, IL",
        createdAt: "2023-10-04T16:28:10Z",
    },
    {
        id: 7,
        name: "George Martin",
        username: "gmartin",
        email: "george.martin@example.com",
        phone: "+1-555-4432",
        address: "64 Fantasy Way, Santa Fe, NM",
        createdAt: "2023-11-12T07:10:05Z",
    },
    {
        id: 8,
        name: "Hannah Lee",
        username: "hannahl",
        email: "hannah.lee@example.com",
        phone: "+1-555-1221",
        address: "33 Blossom St, Portland, OR",
        createdAt: "2023-12-25T11:55:44Z",
    },
    {
        id: 9,
        name: "Ian McKellen",
        username: "imckellen",
        email: "ian.m@example.com",
        phone: "+1-555-2121",
        address: "8 Wizard Dr, Oxford, UK",
        createdAt: "2024-01-15T18:00:00Z",
    },
    {
        id: 10,
        name: "Julia Roberts",
        username: "juliar",
        email: "julia.roberts@example.com",
        phone: "+1-555-8181",
        address: "777 Sunset Blvd, Los Angeles, CA",
        createdAt: "2024-02-03T22:10:10Z",
    },
];
router.use((req, res, next) => {
    if (!req.query.key)
        return next(new Error());
    next();
});
router.get("/", (req, res, next) => {
    res.json(exports.users);
});
router.get("/:id", (req, res, next) => {
    const result = (0, getUserById_1.getUserById)(+req.params.id);
    res.json(result);
});
exports.default = router;
