import Database from '../databases/Database';
import Helpers from '../utils/Helpers';
import Schema from '../databases/Schema';
import Realm from 'realm';

const Insert = (model) => new Promise((resolve, reject) => {
    let dateCurrent = Helpers.GetDateCurrent();
    dateCurrent = '21-07-2020';
    Realm.open(Schema.databaseOptions).then((realm) => {
        realm.write(() => {
            
            let data = realm.objectForPrimaryKey(Schema.ClientGroup, dateCurrent);
            if(data == undefined){
                realm.create(Schema.ClientGroup, {date: dateCurrent});
            }
        })

        realm.write(() => {
            let data = realm.objectForPrimaryKey(Schema.ClientGroup, dateCurrent);
            let client = data.clients;

            client.push(model);
            resolve(model);
        })
    }).catch((error) => { reject(error) })
})

const All = () => new Promise((resolve, reject) => {
    Realm.open(Schema.databaseOptions).then((realm) => {
        let alls = realm.objects(Schema.ClientGroup).sorted([['date', true]]);
        resolve(alls);
    }).catch((error) => { reject(error) })
})

const ClientModel = {
    Insert: Insert,
    All: All,
}

export default ClientModel;