import { Model } from 'objection'
import { DB_CONN } from '../config'

class Category extends Model {
    name!: string;

    static get tableName () {
        return 'categories'
    }
}

export default Category.bindKnex(DB_CONN)
