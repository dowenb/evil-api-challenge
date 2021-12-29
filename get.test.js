require('dotenv').config()
const axios = require('axios');
const request = require('supertest');

const challenge_url = process.env.CHALLENGE_URL || 'https://apichallenges.herokuapp.com';
const challenger = process.env.CHALLENGER // TODO create a new challenger if one isn't specified in .env

describe('GET /todos', function () {
    it('responds with json', function () {
        request(challenge_url)
            .get('/todos')
            .set('Accept', 'application/json')
            .set('X-Challenge', challenger)
            .expect('Content-Type', 'application/json')
            .expect(200);
    });
});

// TODO: Resolve promise race condition
// function newChallenger() {
//     axios.post('https://apichallenges.herokuapp.com/challenger')
//         .then((response) => {
//             return response.headers;
//         }, (error) => {
//             console.log(error);
//         });
// }