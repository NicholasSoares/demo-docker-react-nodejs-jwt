# Demo CRUD React Application with JWT and node.js as API backend.


## Requirements:
- docker
- docker-compose
- Ubuntu 18 or above (Debian based distros)

## Instalation:
Build the app containers with the command:
```sh
docker-compose up --build
```
When the app finhished loading for the first time there will be no data yet, and to populate the database run the following commands:
```sh
docker exec -it product-manager-api /bin/ash -c "npx sequelize db:migrate"
docker exec -it product-manager-api /bin/ash -c "npx sequelize db:seed:all"
```
## Accessing the admin panel and API:
By default 4 services will be exposed:

Admin panel:
```sh
http://localhost:3000/
```
Admin panel credentials:
```sh
emal: test@gmail.com
password: 90901997
```

API interface:
```sh
http://localhost:8000/
```

PgAdmin interface:
```sh
http://localhost:5050/
```
PgAdmin crdentials:
```sh
emal: admin@admin.com
password: root
hostname: database
```

PostgreSQL credentials:
```sh
user: root
password: root
hostname: database
```

## Tecnical limitations:
Due to the docker volume setup created to allow hot reloading, some inconsistencies may be found if npm install is executed outside the container (root directories of the application).
To avoid any problems related to this run npm install inside containers only, and rebuild the images as needed.

Docker commands to access bash inside the application containers:
```sh
docker exec -it product-manager /bin/ash
docker exec -it product-manager-api /bin/ash
```

The npm install command during build process may take a while due to the large amount of packages to be processed, and can cause ram and cpu spikes during the process.
