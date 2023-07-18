'use strict';

/* eslint-disable @typescript-eslint/no-var-requires */
require('dotenv').config();

const config = [
  {
    type: 'postgres',
    name: 'banking',
    host: process.env.BANKING_DB_HOST,
    port: parseInt(process.env.BANKING_DB_PORT, 10),
    username: process.env.BANKING_DB_USER,
    password: process.env.BANKING_DB_PASSWORD,
    database: process.env.BANKING_DB_DATABASE,
    migrations: [
      process.env.MIGRATIONS_PATH_FOR_BANKING
    ],
    cli: {
      migrationsDir: process.env.MIGRATIONS_PATH_FOR_BANKING
    },
    migrationsRun: true,
    synchronize: true,
    logging: true,
    entities: [
      process.env.ENTITIES_PATH_FOR_BANKING
    ]
  },
  {
    type: 'postgres',
    name: 'seeds-banking',
    host: process.env.BANKING_DB_HOST,
    port: parseInt(process.env.BANKING_DB_PORT, 10),
    username: process.env.BANKING_DB_USER,
    password: process.env.BANKING_DB_PASSWORD,
    database: process.env.BANKING_DB_DATABASE,
    migrations: [
      process.env.SEEDS_PATH_FOR_BANKING
    ],
    cli: {
      migrationsDir: process.env.SEEDS_PATH_FOR_BANKING
    },
    migrationsRun: true,
    synchronize: true,
    logging: true,
    entities: [
      process.env.ENTITIES_PATH_FOR_BANKING
    ]
  }
];

module.exports = config;
