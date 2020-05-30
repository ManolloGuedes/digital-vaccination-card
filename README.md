# Digital vaccination card
Simple API project to study deno and its libraries.

## Functionalities
- People CRUD
- Vaccine CRUD
- Person's vaccine records CRUD

## Technologies
- [Deno](https://deno.land/) - runtine for JavaScript
- [Alosaur](https://deno.land/x/alosaur) - Framework web
- [deno_mongo](https://deno.land/x/mongo) - MongoDB driver for deno
- [dotenv](https://deno.land/x/dotenv) - Dotenv handling for deno

## Running
In order to run this API we need to install Deno. To see how to do this, check on [Deno's documentation](https://deno.land/#installation).
#### Mongo settings
After installing deno, as we are using MongoDB, we need to set the Mongo's connection credentials. To do this, we need to create a .env file in the project's root folder, following the structure of the file **/env.example**, and then insert the Mongo's credentials.

#### Execution command
The command to start our server is:
````
deno run --allow-net --allow-write --allow-read --allow-plugin --allow-env --unstable --config ./src/tsconfig.json src/app.ts
````

The main commando to run a deno application is **deno run server-file.ts**. However, in order to provide a more secure execution, deno requests some explicit permissions.
Permissions used in this project:
- allow-net: allow network access
- allow-write: allow file system write access
- allow-read: allow file system read access
- allow-plugin: allow loading plugins
- allow-env: allow environment access
- unstable: enable unstable APIs

## Endpoint Router
#### Vaccines
````
get: /vaccine
    - Get all recorded vaccines

get: /vaccine/:id
    - Get a specific vaccine

post: /vaccine
    - body: {
      name: vaccine's name
    }
    - create a vaccine record

put: /vaccine/:id
    - body: {
      name: new vaccine's name
    }
    - change the vaccine's name
````

#### Person
````
get: /person
    - Get all recorded people

get: /person/:id
    - Get a specific person

post: /person/
    - body: {
      name: Person's name,
      email?: person's email,
      birthday: 'mm/dd/yyyy'
    }
    - create a person record

put: /person/:id
    - body: {
      name: Person's name,
      email?: person's email,
      birthday: 'mm/dd/yyyy'
    }
    - update a person record

delete: /person/:id
    - Delete a person record

get: /person/:id/vaccine
    - Get a person's vaccines

post: /person/:id/vaccine
    -body: {
      vaccineId: vaccine's id (same returned from post /vaccine),
      date: 'mm/dd/yyyy',
      nextVaccineDate?: 'mm/dd/yyyy'
    }
    - insert a vaccine into a person's record

delete: /person/:id/vaccine
    -body: {
      vaccineId: vaccine's id to be deleted
    }
    - delete a vaccine from a person's record
````