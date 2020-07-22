import Schema from './Schema';
import Realm from 'realm';

const Insert = model => new Promise((resolve, reject) => {
   Realm.open(Schema.databaseOptions).then(realm => {
       realm.write(() => {
           realm.create(Schema.ClientGroup, model);
           resolve(model);
       })
   }).catch((error) => { reject(error) })
})

const All = () => new Promise((resolve, reject) => {
    Realm.open(Schema.databaseOptions).then(realm => {
        let alls = realm.objects(Schema.ClientGroup);
        resolve(alls);
    })
}).catch((error) => {
    reject(error);
})

const ClientGroup = {
    Insert: Insert,
    All: All,
};

export default ClientGroup;
