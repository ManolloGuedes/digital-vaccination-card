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