"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const baserote = `http://localhost:3000`;
describe("user routs", () => {
    describe("post user route", () => {
        describe("create magic mover with weight limit less than  or 0", () => {
            it("should return 400", () => __awaiter(void 0, void 0, void 0, function* () {
                const weightLimit = -1;
                const response = yield (0, supertest_1.default)(baserote)
                    .post('/Add-a-Magic-Mover')
                    .send({ weightLimit: weightLimit }) // Sending weightLimit in the request body
                    .expect(400);
                expect(response.body.errors[0].message).toBe("The weightLimit must be a number bigger than or equal zero!");
            }));
        });
    });
});
