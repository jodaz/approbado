import { Model } from 'objection'
import { DB_CONN } from '../config'
import User from './User'

class Profile extends Model {
    // id!: number;
    // public_profile!: boolean;
    // display_name!: boolean;
    // names!: string;
    // surnames!: string;
    // summary!: string;
    // linkedin!: string;
    // twitter!: string;
    // user_id!: number;

    // user?: typeof User;

    static get tableName () {
        return 'profiles'
    }
}

export default Profile.bindKnex(DB_CONN)
