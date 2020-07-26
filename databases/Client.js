import Schema from './Schema';
import Realm from 'realm';

const Insert = (model) => new Promise((resolve, reject) => {
    Realm.open(Schema.databaseOptions).then(realm => {
        realm.write(() => {
            realm.create(Schema.Client, model);
            resolve(model);
        })
    }).catch((error) => {
        reject(error);
    })
})

const All = () => new Promise((resolve, reject) => {
    Realm.open(Schema.databaseOptions).then(realm => {
        let alls = realm.objects(Schema.Client);
        resolve(alls);
    }).catch((error) => { reject(error) })
})

const Client = {
    Insert: Insert,
    All: All,
}

export default Client;