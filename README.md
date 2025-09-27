# Countries

REST API to explore countries information.

deployed at :https://countries.up.railway.app/

## REST API specification

| Endpoint Path   | HTTP Method | Description                                         |
| --------------- | ----------- | --------------------------------------------------- |
| `countries    ` | `GET`       | Get all countries.                                  |
| `countries/:id` | `GET`       | Get country by ID.                                  |
| `countries/:id` | `DELETE`    | Deletes a country by ID.                            |
| `countries`     | `DELETE`    | Deletes all countries.                              |
| `countries`     | `POST`      | Creates a new country.                              |
| `countries/:id` | `PUT`       | Updates a country by ID, create data if not exists. |
| `countries/:id` | `PATCH`     | Updates a country by ID.                            |

## ERD

1.  countries

- id
- name
- createdAt
- updatedAt

2. continents

- id
- countryId
- createdAt
- updatedAt

## Get Started

To install dependencies:

```sh
bun install
```

To run:

```sh
bun dev
```

open http://localhost:3000

## To do

- [ ] fix seed.ts
- [] fix countries.ts from routes,
