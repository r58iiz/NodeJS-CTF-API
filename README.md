# An incomplete API for submitting CTF flags and maintaining a leaderboard running on NodeJs/MongoDB
---
## To-Do:
- [ ] Review current code
- [ ] Make schemas more versatile
	- [ ] Update user schema
	- [ ] Update and expand challenge schema
		- [ ] Allow adding description
		- [ ] Allow automated expiry
		- [ ] Allow rating
		- [ ] Allow a walkthrough/writeup for expired challenges
- [ ] Access control
- [ ] A full rewrite
---
## Endpoints:
1. [Challenges](#challenges)
2. [Users](#users)
3. [Leaderboard](#leaderboard)
---
### Challenges
- Base URL: `/api/v1/challenges`
1. POST: `/api/v1/challenges/add`
	- Used to add a new challenge.
	- Data required:
	    | Name                     | Description                                 |
	    |--------------------------|---------------------------------------------|
	    | `req.body.authorization` | Authorization key                           |
	    | `req.body.challengeTag`  | Displayed challenge name                    |
	    | `req.body.challengeID`   | Unique challenge ID                         |
	    | `req.body.expired`       | `true` if challenge is expired else `false` |
	    | `req.body.points`        | Challenge worth                             |
	    | `req.body.solution`      | The solution/flag of the challenge          |
	    | `req.body.type`          | Challenge type                              |
	    | `req.body.submittedBy`   | The person who submitted the challenge      |
	    | `req.body.link`          | The link to file of challenge               |
2. POST: `/api/v1/challenges/remove`
    - Used to remove(Set as expired) a challenge
    - Data required:
	    | Name                     | Description                                 |
	    |--------------------------|---------------------------------------------|
	    | `req.body.authorization` | Authorization key                           |
	    | `req.body.challengeTag`  | Displayed challenge name                    |
	    | `req.body.challengeID`   | Unique challenge ID                         |
3. GET: `/api/v1/challenges/list`
	- Used to get: Either all the challenges OR Info about a single challenge
    - Data required:
	    | Name                     | Description                                 |
	    |--------------------------|---------------------------------------------|
	    | `req.body.challengeID`   | Unique challenge ID or `0` if fetching all  |
---
### Users
- Base URL: `/api/v1/users`
1. POST: `/api/v1/users/submit/solution`
    - Used to submit the solution of a challenge by USER
    - Data required:
	    | Name                     | Description                                 |
	    |--------------------------|---------------------------------------------|
	    | `req.body.userID`        | User ID of the user submitting              |
	    | `req.body.challengeTag`  | Displayed challenge name                    |
	    | `req.body.solution`      | The solution/flag submitted                 |
2. GET: `/api/v1/users/position`
    - Used to get the position + data of user in the leaderboard
    - Data required:
	    | Name                     | Description                                 |
	    |--------------------------|---------------------------------------------|
	    | `req.body.userID`        | User ID of the user submitting              |
3. POST: `/api/v1/users/create`
    - Used to create a new user
    - Data required:
        | Name                     | Description                                 |
	    |--------------------------|---------------------------------------------|
	    | `req.body.userID`        | The user ID                                 |
	    | `req.body.userTag`       | The user tag                                |
---
### Leaderboard
- Base URL: `/api/v1/ctf`
1. GET: `/api/v1/ctf/leaderboard`
    - Used to get the top 30 of the leaderboard
    - Data required:
        - None.
---
