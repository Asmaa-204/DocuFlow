### /api/v1/auth

- **post** /api/v1/auth/login :- login as an existing user
- **post** /api/v1/auth/signup :- signup as a new user

---

### /api/v1/workflow

- **post** /api/v1/workflow/ :- create a new workflow
- **get** /api/v1/workflow/ :- get all workflows along with their stages
- **get** /api/v1/workflow/:id :- get a specific workflow along with its stages

---

### /api/v1/instance 

- **post** /api/v1/instance :- create an instance 
- **get** /api/v1/instance :- get all instances
- **get** /api/v1/instance/:id :- get a specific instance

---

### /api/v1/request

- **post** /api/v1/request :- create a new request
- **get** /api/v1/request :- get all requests
- **get** /api/v1/request/:id :- get a specific request

---

### /api/v1/me

- **get** /api/v1/me :- get current user info
- **get** /api/v1/me/request  :- get current user's requests
- **get** /api/v1/me/instance :- get current user's instances

