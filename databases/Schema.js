import Constant from '../constants/Constant';
import Realm from 'realm';
import Helpers from '../utils/Helpers';

const ClientGroup = {
    name: Constant.Schema.ClientGroup,
    primaryKey: 'date',
    properties: {
        date: 'string',
        clients: {type: 'list', objectType: Constant.Schema.Client},
    }
}

const Client = {
    name: Constant.Schema.Client,
    primaryKey: 'id',
    properties: {
        id: 'int',
        name: 'string',
    }
}

const Customer = {
    name: Constant.Schema.Customer,
    primaryKey: 'id',
    properties: {
        id: 'int',
        clientId: 'int',
        dateCalculator: 'string',
        price: 'int',
        name: 'string',
        nameTree: 'string',
        sheets: {type: 'list', objectType: Constant.Schema.Sheet},
    }
}

const Sheet = {
    name: Constant.Schema.Sheet,
    primaryKey: 'id',
    properties: {
        id: 'int',
        sheetNo: 'int',
        foreignKey: 'int',
        value: 'float',
    }
}

const databaseOptions = {
    path: 'calculator.realm',
    schema: [ClientGroup, Client, Customer, Sheet],
    schemaVersion: 0,
};

const Schema = {
    databaseOptions: databaseOptions,
    ClientGroup: Constant.Schema.ClientGroup,
    Client: Constant.Schema.Client,
    Sheet: Constant.Schema.Sheet,
    Customer: Constant.Schema.Customer,
};

export const insertCustomer  = (model) => new Promise((resolve, reject) => {

    let dateCurrent = Helpers.GetFullDateCurrent();
    let id = (new Date()).getTime();
    Realm.open(databaseOptions).then((realm) => {
        realm.write(() => {

            model.dateCalculator = dateCurrent;
            model.id = id;
            realm.create(Schema.Customer, model);
        })

        realm.write(() => {
            let customer = realm.objectForPrimaryKey(Schema.Customer, model.id);
            //let getSheetId = realm.where(Schema.Sheet).max('id');
            //console.log(getSheetId);
            //return false;
            let sheet = customer.sheets;
            for(let i = 1; i <= 25; i++){
                console.log((new Date()).getTime());
                let modelSheet = {
                    id: (new Date()).getTime() + (new Date()).getMilliseconds(),
                    foreignKey: model.id,
                    sheetNo: i,
                    value: 0
                };
            
                sheet.push(modelSheet);
            }

            resolve(customer);
        })
    }).catch((error) => { reject(error) })
})

export const allCustomer = () => new Promise((resolve, reject) => {
    Realm.open(databaseOptions).then((realm) => {
        let customers = realm.objects(Schema.Customer);
    })
})

export const insertClientGroup = (model) => new Promise((resolve, reject) => {
    
    let dateCurrent = Helpers.GetDateCurrent();
    
    Realm.open(databaseOptions).then((realm) => {
        realm.write(() => {
            let clientGroup = realm.objectForPrimaryKey(Schema.ClientGroup, dateCurrent);

            if(clientGroup == undefined){
                realm.create(Schema.ClientGroup, {date: dateCurrent});
            }
        })

        realm.write(() => {
            let clientGroup = realm.objectForPrimaryKey(Schema.ClientGroup, dateCurrent);
            let clients = clientGroup.clients;
            clients.push(model);
            resolve(model);
        })
    }).catch((error) => { reject(error) })
})

export const deleteClient = (id, date) => new Promise((resolve, reject) => {
    Realm.open(databaseOptions).then((realm) => {
        //let client = realm.objects(Schema.Client).filtered('id = ' + id);
        //realm.delete(client);

        realm.write(() => {
            //let client = realm.objectForPrimaryKey(Schema.ClientGroup, date);
            let client = realm.objectForPrimaryKey(Schema.Client, id);
            if(client !== undefined)
            {
                realm.delete(client);
            }
        })

        realm.write(() => {
            let client = realm.objectForPrimaryKey(Schema.ClientGroup, date);
            if(client !== undefined && client.clients.length == 0){
                realm.delete(client);
            }
        })
       
    }).catch((error) => { reject(error) })
})

export const allClientGroup = () => new Promise((resolve, reject) => {
    Realm.open(databaseOptions).then((realm) => {
        let clients = realm.objects(Schema.ClientGroup).sorted([['date', true]]);
        resolve(clients);
    }).catch((error) => { reject(error) })
})

export default new Realm(databaseOptions);  