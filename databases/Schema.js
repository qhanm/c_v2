import Constant from '../constants/Constant';

const ClientGroup = {
    name: Constant.Schema.ClientGroup,
    primaryKey: 'id',
    properties: {
        id: 'int',
        date: 'string',
    }
}

const databaseOptions = {
    path: 'calculator.realm',
    schema: [ClientGroup],
    schemaVersion: 0,
};

const Schema = {
    databaseOptions: databaseOptions,
    ClientGroup: Constant.Schema.ClientGroup,
};

export default Schema;