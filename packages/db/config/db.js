import { knex } from 'knex'
import knexfile from './knexfile'
import { APP_ENV } from '@approbado/server/dist/config/env'

const config = knexfile[APP_ENV]
export const DB_CONN = knex(config)
