import { knex } from 'knex'
import knexfile from './knexfile'
import { APP_ENV } from './env'

const config = knexfile[APP_ENV]
const DB_CONN = knex(config)



export { DB_CONN };
