# Web app to track status and health of a company's assets

### ATTENTION: Frontend is not FINISHED! On Jan-26th problems with dom rendering on socketio messages arrivals were fixed. Now you can see each 'health level' and 'status' updating on 'real-time' new socketio messages. Next activities: add buttons to mock producing values to kafka into the UI, create frontend pages to add new objects, login and logout. Also, add a menu to access these functionalities.
### ATTENTION: For the first page to load all units and assets, substitute hardcoded companyId in the file _./frontend/src/App.js:line_18_ with your created company ID.

# **Backend**
It has the following routes for objects creation:

#### URL: `http://localhost:8000/company`
1) POST

Register a new company with a given name. Body example:

```
@name: str
{
    "name": "Freios do ABC."
}
```

In the HTTP response, you'll get the generated ID for the company:

```
{
    "message": "Company Created!",
    "company": {
        "id": "8ed3ca2d-b757-415f-ac43-dac6b1ec67d2",
        "name": "Freios do ABC"
    }
}
```

#### URL: `http://localhost:8000/user`
1) POST

Register a new user with a given username, password and companyId. Body example:

```
@username: str
@password: str
@companyId: str
{
    "username": "Marcio",
    "password: "test",
    "companyId: {{company_id}}
}
```

**_OBS_**:

a) Password is encrypted and saved into the DB;

b) It must be a valid companyId

#### URL: `http://localhost:8000/unit`
1) POST

Register a new unit with a given unit_city, unit_number and companyId. Body example:

```
@unit_city: str
@unit_number: str
@companyId: str
{
    "unit_city": "São Paulo",
    "unit_number": "03",
    "companyId": {{company_id}}
}
```

In the HTTP response, you'll get the generated ID for the unit:

```
{
    "message": "Unit Created!",
    "unit": {
        "id": "a55d6ff9-cd4e-402c-a78a-8aea01be4939",
        "unit_city": "São Paulo",
        "unit_number": "03",
        "companyId": "8ed3ca2d-b757-415f-ac43-dac6b1ec67d2"
    }
}
```

**_OBS_**: It must be a valid companyId

#### URL: `http://localhost:8000/asset`
1) POST

Register a new asset with a given name, description, model, owner and unitId. Body example:

```
@name: str
@description: str
@model: str
@owner: str
@unitId: str
{
    "name": "Bomba de água",
    "description": "Ao lado do reservatório 01.",
    "model": "BOMBA KZYX",
    "owner": "Indústrias Bombas LTDA",
    "unitId": {{unit_id}}
}
```

**_OBS_** It must be a valid unitId

#### URL: `http://localhost:8000/health`
1) POST

Triggers kafka to produce 4 new random health values for the assets registered to a company.

```
@companyId: str
{
    "companyId": {{company_id}}
}
```

**_OBS_** It must be a valid companyId

#### URL: `http://localhost:8000/status`
1) POST

Triggers kafka to produce 4 new random status values for the assets registered to a company.

```
@companyId: str
{
    "companyId": {{company_id}}
}
```

**_OBS_** It must be a valid companyId

# **Frontend**
It builds up just one page:

`http://localhost:3000`

Which has a selector to show all assets registered into a unit.

**IMPORTANT!!!!! In this page, the websocket connects to the backend and should present values produced by kafka in the _HEALTH_ and _STATUS_ boxes. To produce its values it is necessary to hit backend routes http://localhost:8000/status and http://localhost:8000/health.**

# **MongoDB**
DB that register:
- Companies
- Users
- Units
- Assets
- Health values for each assetId
- Status values for each assetId

# **Kafka**
It has the main functionalities:
1) Creates topics for **health** and **status** levels
2) Produces **MOCK** values that would be sent by sensors alocated in the assets
3) Consumers that consumes values that would be sent by sensors alocated in the assets
4) Connects to the MongoDB and saves values captured by consumers

# Deploy

1 - Clone repository
```sh
$ git clone https://github.com/marcioluish/trac.git
```

2 - Install frontend dependencies
```sh
$ docker-compose run --rm trac_frontend sh -c "npm install"
```

2 - Docker up containers
```sh
$ docker-compose up --build
```
