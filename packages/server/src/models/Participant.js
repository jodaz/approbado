import { BaseClass } from '../utils'

export class Participant extends BaseClass {
    static get tableName () {
        return 'participants'
    }
}
