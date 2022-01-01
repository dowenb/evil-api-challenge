import * as dotenv from "dotenv";
import request, { Response, SuperTest } from "supertest";

dotenv.config();

const challenge_url = process.env.CHALLENGE_URL || 'https://apichallenges.herokuapp.com';
let challenger: String;

describe("GET /todos", () => {
    beforeAll(async () => {
        challenger = process.env.CHALLENGER || await newChallenger().then(res => res.header['x-challenger']).catch(err => console.log(err));
    });

    it("Returns /todos in JSON for correct challenger", async () => {
        const result = await request(challenge_url)
            .get("/todos")
            .set('Accept', 'application/json')
            .set('X-Challenger', String(challenger))
            .expect(200)
            .expect('Content-Type', 'application/json')
            .expect('x-challenger', String(challenger));
    });

    it("Tracks challenge as complete", async () => {
        const result = await request(challenge_url)
            .get("/challenges")
            .set('Accept', 'application/json')
            .set('X-Challenger', String(challenger))
            .expect(200)
            .expect('Content-Type', 'application/json')
            .expect('x-challenger', String(challenger));

        expect(isChallengeCompleteById(result.body.challenges, 15)).toBeTruthy();
    });
});

async function newChallenger(): Promise<Response> {
    return await request(challenge_url).post('/challenger');
}

function isChallengeCompleteById(challenges: any, id: number): boolean {
    return challenges.filter(function (c) {
        return c.id == id;
    })[0].status;
}