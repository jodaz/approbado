import Knex from 'knex'
import knexfile from '../knexfile'
import { APP_ENV } from './env'

const DB_CONN: Knex = Knex(knexfile[APP_ENV]);

export { DB_CONN };