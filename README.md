# Store-typescript-Express-(redis, jwt-auth, mysql, Knex, Objection)-React-(redux-toolkit-query, Bootstrap, Tailwind CSS)

### Change nginx config
##### nginx-reverse-proxy/conf.d/default.conf
#### `server_name server_store.localhost;`
##### to Domain Server
#### `server_name store.localhost;`
##### to Domain Client
#
#
### Change production.env
##### server-express
#### `CLIENT_URL`
##### to Domain Client
#
##### client-react
#### `REACT_APP_API_URL_SERVER`
#### `REACT_APP_URL_SERVER`
##### to Domain Server

#
#
### Run:

##### first start
#### `docker-compose up --build`
#
##### second start
#### `docker-compose up --build`
#### `Ctrl+Z`
#### `docker-compose stop migrate_import_db`

#
#
#### Docker Compose version > v2.6.1

### by SxS

#
#
####   Task
####   https://docs.google.com/document/d/1gJm8tAbQ5dsQrJOk79fNgcEHNuLJ_cOOOqZDDJeNVSk/edit


####   Design
####   https://www.figma.com/file/PrO4six14ZdxiWY3K9NKR9/Best-Products?node-id=13%3A2726
