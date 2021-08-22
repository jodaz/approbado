import Knex from 'knex'
import knexfile from '../knexfile'

const knex: Knex = Knex(knexfile.development);

export default knex;