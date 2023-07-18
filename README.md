# Banking Token API

## Como funciona

Primero, crear el archivo .`env` (hay archivos de ejemplo `.env.example`).

Despues de iniciar los servicios en Docker, instalar las dependencias.

---

## Comandos

### Iniciar Servicios de Docker

```shell
make up
```

o

```shell
docker-compose up -d
```

De esta forma se iniciaran los servicios de Node y PostgreSQL.


### Detener Servicios de Docker

```shell
make down
```

o

```shell
docker-compose down
```

### Ejecutar el proyecto

```shell
make run-dev
```

o

```shell
docker-compose exec api npm run dev
```

Se ejecutara el comando nodemon en typescript en el entorno dev.

### Compilar el proyecto

```shell
make run-start
```

o

```shell
docker-compose exec api npm run start
```

De esta forma se compilara en typescript y se guardara en la carpeta `./dist` y se ejecutara el comando nodemon con las fuentes en Javascript.

### Construir proyecto

```shell
make run-build
```

o

```shell
docker-compose exec api npm run build
```

Para compilar los archivos typescript unicamente

### Instalar dependencias

```shell
make install
```

o

```shell
docker-compose exec api npm install
```

### Ejecutar eslint

```shell
make eslint-check
make eslint-fix
```

o

```shell
docker-compose exec api npm run eslint:check
docker-compose exec api npm run eslint:fix
```

El archivo de configuracion `.eslintrc.json` en la carpeta raiz define opciones del linter.

### Ejecutar Tests Unitarios

```shell
make run-test-unit
```

o

```shell
docker-compose exec api npm run test:unit
```

### Ejecutar Coverage para Tests Unitarios

```shell
make run-test-unit-coverage
```

o

```shell
docker-compose exec api npm run test:unit:coverage
```


## Endpoints


### Crear Registro Tarjeta

#### Request

> Method: `POST`

> URL: [http://localhost:8080/banking/cards](http://localhost:8080/banking/cards)

> Body:

```json
{
    "card_number": "30468713111014",
    "cvv": "120",
    "expiration_month": "10",
    "expiration_year": "2020",
    "email": "demomail844@gmail.com"
}
```

#### Response

```json
{
    "number": "30468713111014",
    "token": "abcdefg",
    "cvv": "120",
    "expirationMonth": "10",
    "expirationYear": "2020",
    "email": "demomail844@gmail.com",
    "business": "Bearer Token pk_test_1234444444"
}
```

### Obtener Registro Tarjeta

#### Request

> Method: `POST`

> URL: [http://localhost:8080/banking/card](http://localhost:8080/banking/card)

> Body:

```json
{
    "token": "abcdefg"
}
```

#### Response

```json
{
    "number": "30468713111014",
    "token": "**************",
    "cvv": "***",
    "expirationMonth": "10",
    "expirationYear": "2020",
    "email": "demomail844@gmail.com",
    "business": "**********"
}
```
