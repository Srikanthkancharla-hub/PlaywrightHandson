const oracledb=require('oracledb');
oracledb.initOracleClient({libDir:process.env.ORACLE_CLIENT_LIB_DIR});

async function connectDb(){
    try{
        const connection=await oracledb.getConnection({
            user: 'useraccount',
            password: 'useraccount',
            connectString: '10.1.182.172:1521/real'
        });
        console.log('Connected to Db ');
        return connection;
        //await connection.close();

    }
    catch(error){
        console.error('Connection error occured ', error)
    }
    
};
async function connectPpokerops(){
    try{
        const connection=await oracledb.getConnection({
            user: 'ppokerops',
            password: 'ppokerops',
            connectString: '10.1.182.172:1521/real'
        });
        console.log('Connected to PPOKEROPS Db ');
        return connection;
        //await connection.close();

    }
    catch(error){
        console.error('Connection error occured ', error)
    }
    
}
async function connectPgauth(){
    try{
        const connection=await oracledb.getConnection({
            user: 'pgauth',
            password: 'pgauth',
            connectString: '10.1.182.172:1521/real'
        });
        console.log('Connected to PGAUTH Db ');
        return connection;
        //await connection.close();

    }
    catch(error){
        console.error('Connection error occured ', error)
    }
    
}

async function connectUseraccount(){
    try{
        const connection=await oracledb.getConnection({
            user: 'useraccount',
            password: 'useraccount',
            connectString: '10.1.182.172:1521/real'
        });
        console.log('Connected to USERACCOUNT Db ');
        return connection;
        //await connection.close();

    }
    catch(error){
        console.error('Connection error occured ', error)
    }
    
}

module.exports={connectDb,connectPpokerops,connectPgauth,connectUseraccount};