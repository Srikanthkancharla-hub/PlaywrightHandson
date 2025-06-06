const { OUT_FORMAT_OBJECT } = require('oracledb');
const {test,expect}=require('@playwright/test');
const {connectDb,connectPpokerops,connectPgauth, connectUseraccount}=require ('../../Utils/dbconnection');
const oracledb = require('oracledb');


const now = new Date();

async function getAnonymizationCompletedUsers() {
    const connection= await connectDb();
    const result= await connection.execute(
        `select * from t_user_anonymization_data where f_status='Anonymization_Complete'  and TRUNC(f_insertion_time)= TRUNC(sysdate-1)
        fetch first 20 rows only`,
        [],
        {outFormat:oracledb.OUT_FORMAT_OBJECT}
    );
    const anonymizationcompletedusers=[];
    const anonymizationcompleteduserscount=result.rows.length;
    for(let i=0;i<anonymizationcompleteduserscount;i++){
        const anonydoneuser=result.rows[i].F_ACCOUNT_NAME;
        console.log(`Anonymization Completed user is : ${anonydoneuser}`);
        const anonydonestatus=result.rows[i].F_STATUS;
        console.log(`Anonymization Completed user status is : ${anonydonestatus}`);
        const anonydonecomments=result.rows[i].F_COMMENTS;
        console.log(`Anonymization Completed user comments are : ${anonydonecomments}`);
        const anonydonecustom2=result.rows[i].F_CUSTOM_2;
        console.log(`Anonymization Completed user F_CUSTOM_2 value is : ${anonydonecustom2}`);
        anonymizationcompletedusers.push(anonydoneuser);
        //anonymizationcompletedusers.push(anonydonestatus);
        //anonymizationcompletedusers.push(anonydonecomments);
        //anonymizationcompletedusers.push(anonydonecustom2);
    }
   return anonymizationcompletedusers;
    
}
async function UpdatedusercategorytoNormal(validationfaileduser) {
    const connection= await connectPpokerops();
    const updateduserresult= await connection.execute(
        `update EZECASH.t_g_biographic set f_category_id='0' where f_account_name_eze= :validationfaileduser`,
        {validationfaileduser},
        {autoCommit:true}
    );
    console.log(`User category is updated to Normal for user : ${validationfaileduser}`);
    //return updateduserresult.rows;
}
async function verifyUserValidationStatus() {
    const connection= await connectDb();
    const result = await connection.execute(
        `select * from T_USER_ANONYMIZATION_DATA order by f_modified_time desc`,
        [],
        { outFormat: oracledb.OUT_FORMAT_OBJECT }
    );
    if( result.rows.length>0){
        for( let i=0;i<=2;i++){
            const queryoutputlength= result.rows.length;
            console.log('Number of users in output is ',queryoutputlength);
            console.log('User in DB are :',  result.rows[i]);
            const userstatus='Eligible_for_Anonymization';
            const usercomments='VALIDATION Success-WALLET Success:CASHIER Success:COMPLIANCE';
            const eligibilityTimeinDB=result.rows[i].F_ELIGIBILTY_TIME;
            const userStatusInDB=result.rows[i].F_STATUS;     
            //console.log(`User status in DB from the result is ${userStatusInDB}`);
            const userCommentsInDB=result.rows[i].F_COMMENTS;
            const testaccountname=result.rows[i].F_ACCOUNT_NAME;
            //console.log(`Account Name in DB from the result is ${testaccountname}`);
            const custom1=result.rows[i].F_CUSTOM_1;
            const custom2=result.rows[i].F_CUSTOM_2;
            if(userStatusInDB===userstatus && custom1!==null){
               // console.log('Entered to If loop');
                const connectppoker= await connectPpokerops();
                const result1 = await connectppoker.execute(
                    `select f_account_name_casino,f_status from t_account_name_casino where f_account_name_casino= : testaccountname`,
                    {testaccountname},
                    {outFormat:oracledb.OUT_FORMAT_OBJECT}
                );
                const userplayrealstatus= result1.rows[0].F_STATUS;
                console.log('user staus from db is ',userplayrealstatus); 
                if(userplayrealstatus==0){
                    console.log(`Validation status for given play user account : ${testaccountname} is `,userCommentsInDB);
                    console.log(`F_CUSTOM_1 for selected user is ${custom1}`);
                    console.log(`F_CUSTOM_2 for selected user is ${custom2}`);
                }
                else {
                    console.log(`Validation status for given real user account : ${testaccountname} is `,userCommentsInDB);
                    console.log(`F_CUSTOM_1 for selected user is ${custom1}`);
                    console.log(`F_CUSTOM_2 for selected user is ${custom2}`);   
                }

            } else {
                console.log(`F_CUSTOM_1 for selected user is ${custom1} . So user is not picked for validation`);
                console.log(`F_STATUS for selected user is ${userStatusInDB}. So user is not picked for validation`)

            }
        }
    }
    else {
        console.log('No records found with Anonymization status in DB as of now ');
    }
    return result.rows;  
};

async function verifyUserAnonymizationStatus(testuserscount) {
    const connection= await connectDb();
    const result = await connection.execute(
        `select * from t_user_anonymization_data  where TRUNC(f_insertion_time)= TRUNC(sysdate-1)`,
        [],
        {outFormat:oracledb.OUT_FORMAT_OBJECT}
    );
    console.log('Users count from db output is :', result.rows.length);
    if(result.rows.length>0){
        for (let i=0;i<result.rows.length;i++){
            console.log('users picked to check anonymization status are :',result.rows[i]);
            const userCommentsInDB= result.rows[i].F_COMMENTS;
            console.log(`User commnets in DB  is : ${userCommentsInDB}`);
            const userStatusafteranonymization =result.rows[i].F_STATUS;
            console.log(`User status in DB is : ${userStatusafteranonymization}`);
            const custom1InDB = result.rows[i].F_CUSTOM_1;
            const custom2InDB = result.rows[i].F_CUSTOM_2;
            //console.log(`F_CUSTOM_2 value in DB after anonymization complete is : ${custom2InDB}`);
            //const custom1afteranonymization='Anonymization_validation_Completed';
            const custom2afteranonymization='Anonymization_Complete';
            const testaccountname=result.rows[i].F_ACCOUNT_NAME;
            if(custom1InDB===null && custom2InDB===custom2afteranonymization){
                console.log(`F_CUSTOM_2 value in DB after anonymization complete is : ${custom2InDB}`);
                await getAnonymisedFeildsFromPpokerops(testaccountname);
                await getAnonymisedFeildsFromPgauth(testaccountname);
                await getAnonymisedFeildsFromUseraccount(testaccountname);
            }
            else {
                console.log(`F_CUSTOM_1 value in DB  is : ${custom1InDB}`);
                console.log(`F_CUSTOM_2 value in DB  is : ${custom2InDB}`);
                console.log('User are in done with validation.These users will be picked for anonymization in next cron')
            }
    }

    }
};


async function insertUsers(accountname,activityType,lastActivityTime,eligibilityTime) {
    const currentDate= new Date();
    //var eligibilityTime = new Date(currentDate.getTime() - 70 * 24 * 60 * 60 * 1000);
    //var eligibilityTime= new Date();
    const connection=await connectDb();
    await connection.execute(
        `INSERT INTO T_USER_ANONYMIZATION_DATA 
     (F_ACCOUNT_NAME, F_ACTIVITY_TYPE, F_LAST_ACTIVITY_TIME, F_ELIGIBILTY_TIME, F_STATUS, F_COMMENTS,
      F_AGENT, F_INSERTION_TIME, F_MODIFIED_TIME, F_CUSTOM_1, F_CUSTOM_2, F_CUSTOM_3, F_CUSTOM_4)
     VALUES (:accountname, :activityType,:lastActivityTime,
      :eligibilityTime, 'Eligible_for_Anonymization',
      'Manual data insertion from core', 'system',
      :insertionTime,
      TO_DATE('10-SEP-24 07:11:55','DD-MON-RR HH24:MI:SS'), null, null, null, null)`,
    { accountname, activityType,lastActivityTime ,insertionTime:now,eligibilityTime},
    { autoCommit: true }
    );
    console.log(`Inserted user :${accountname} with activity type as :${activityType}`);
    await connection.close();
};

async function insertUsersNotInTableFromTANC() {
    const connection= await connectDb();
    const result= await connection.execute(
        `select tanc.f_account_name_casino , tg.f_country,tg.f_category_id , tj.f_jurisdiction
from PPOKEROPS.T_ACCOUNT_NAME_CASINO tanc 
join EZECASH.t_g_biographic tg on 
tanc.f_account_name_casino=tg.f_account_name_eze
join t_jurisdiction tj on 
tj.f_account_name=tanc.f_account_name_casino
where tanc.f_account_name_casino not in (select f_account_name from useraccount.t_user_anonymization_data) 
and tanc.f_account_name_casino like 'bz_%' and tanc.f_account_balance=0  and tg.f_country='MT'
---and tj.f_jurisdiction='GBR'
---and tg.f_category_id not in ('25','24','17','20')
FETCH FIRST 10 ROWS ONLY`,
 [],
 {outFormat:oracledb.OUT_FORMAT_OBJECT}

);
 const accountsToInsert=[];
    console.log('Users picked from TANC which are not in T_USER_ANONYMIZATION table are : ', result.rows);
    for (let i=0;i<result.rows.length;i++){
        const anamefromtancresult= result.rows[i].F_ACCOUNT_NAME_CASINO;
        console.log('Account picked to insert into anonymization table is :',anamefromtancresult);
        accountsToInsert.push(anamefromtancresult);
        
    }
    return accountsToInsert;
}

async function searchUserInTable(accountname) {
    const connection=await connectDb();
    const result = await connection.execute(
        `SELECT * FROM T_USER_ANONYMIZATION_DATA WHERE F_ACCOUNT_NAME = :accountname`,
      [accountname]
    );

    if(result.rows.length==0){
        console.log('User is not found in given table');
    }else {
        console.log('User is already existing in table');
    }
    return result.rows;
}

async function verifyStatusInDb(accountname){
    const connection=await connectDb();
    const result = await connection.execute(
        `SELECT * FROM T_USER_ANONYMIZATION_DATA WHERE F_ACCOUNT_NAME = :accountname`,
      [accountname]
    );

    if(result.rows.length==0){
        console.log('User is not found in given table');
    }else {
        console.log('User is already existing in table');
        const resultstatus= result.rows[0][4];
        const resultEligibilityTime=result.rows[0][3];
        const resultcomments=result.rows[0][5];
        const resultcustom1=result.rows[0][9];
        console.log('F_Status from Db for given user is :',resultstatus);
        console.log('F_Eligibility_time from Db for given user is :',resultEligibilityTime);
        console.log('F_Comments from Db for given user is :',resultcomments);
        console.log('F_Custom1 from Db for given user is :',resultcustom1);
    }
    return result.rows;

}
 async function insertJurisdictionForPlayers(accountname) {
    const notallowedJurisdictions = ['FRA', 'GRC', 'COL', 'CZE', 'NLD', 'DNK', 'ESP', 'BGR', 'DEU', 'ITA', 'PRT', 'ROU', 'XON'];
    const connection= await connectPpokerops();
    const result = await connection.execute(
        `select * from t_jurisdiction where f_account_name =:accountname`,
        {accountname},
        {outFormat:oracledb.OUT_FORMAT_OBJECT}
    );
    console.log('result from jurisdiction table is : ', result.rows);
    if(result.rows.length===0){
        const connection= await connectPpokerops();
       const result= await connection.execute(
            `insert into t_jurisdiction (F_ID,F_ACCOUNT_NAME,F_JURISDICTION) VALUES (1269879,:accountname,'ROW')`,
            {accountname},
            {autoCommit:true},
           // {outFormat:oracledb.OUT_FORMAT_OBJECT}
        );
        console.log(`user ${accountname} inserted with jurisdiction ROW`);
        
        
    } else {
        const jurisdiction= result.rows[0].F_JURISDICTION;
        console.log(`User already has existing jurisdiction :${jurisdiction}`);
        if (notallowedJurisdictions.includes(jurisdiction)) {
            // Only update to ROW if current jurisdiction is in the allowed list
            await connection.execute(
                `UPDATE t_jurisdiction 
                 SET f_jurisdiction = 'ROW' 
                 WHERE f_account_name = :accountname`,
                { accountname },
                { autoCommit: true }
            );
            console.log(`User ${accountname} jurisdiction '${jurisdiction}' is in the not allowed list. Updated to 'ROW'.`);
        } else {
            console.log(`User ${accountname} jurisdiction '${jurisdiction}' is in allowed list. No update performed.`);
        }
     
    }
    return result.rows;
 }
 async function getUserPlayRealStatus(accountname) {
    const connection1= await connectPpokerops();
    const result= await connection1.execute(
        `select f_account_name_casino,f_status from t_account_name_casino where f_account_name_casino= :accountname`,
        {accountname},
        {outFormat:oracledb.OUT_FORMAT_OBJECT}
    );
    const playerstatus=[];
    const userplayrealstatus=result.rows[0].F_STATUS;
    console.log(`User account stauts is : ${userplayrealstatus}`);
    playerstatus.push(userplayrealstatus);
    return playerstatus;
 }
async function updateCreateTimeInTanc(accountname,lastActivityTime){

    const connection1= await connectPpokerops();
    const result= await connection1.execute(
        `select f_account_name_casino,f_status from t_account_name_casino where f_account_name_casino= :accountname`,
        {accountname},
        {outFormat:oracledb.OUT_FORMAT_OBJECT}
    );
    const userplayrealstatus=result.rows[0].F_STATUS;
    console.log(`User account stauts is : ${userplayrealstatus}`);
    if(userplayrealstatus===0){
        updateLastAccessedTimeInTanc(accountname,lastActivityTime);
        updateCreatetimeInAllTables(accountname,lastActivityTime);
        insertJurisdictionForPlayers(accountname);
    } else {
        updateCreatetimeInAllTables(accountname,lastActivityTime);
        insertJurisdictionForPlayers(accountname);
    }
    
    return userplayrealstatus;
};

async function updateCreatetimeInAllTables(accountname,lastActivityTime) {
    const connection= await connectDb();
    await connection.execute(
        `update t_account_name_casino set f_create_time=:lastActivityTime where f_account_name_casino= :accountname`,
        {accountname,lastActivityTime},
        { autoCommit: true }
    );
    console.log(`User ${accountname} updated with f_create_time in TANC  as ${lastActivityTime}`);

    await connection.execute(
        `update t_g_biographic set f_create_time=:lastActivityTime where f_account_name_eze= :accountname`,
        {accountname,lastActivityTime},
        { autoCommit: true }
    );
    console.log(`User ${accountname} updated with f_create_time in T_G_BIOGRAPHIC  as ${lastActivityTime}`);
    await connection.close();

    
}

async function updateLastAccessedTimeInTanc(accountname,lastActivityTime){
    const connection= await connectDb();
    await connection.execute(
        `update t_account_name_casino set f_last_accessed=:lastActivityTime where f_account_name_casino= :accountname`,
        {accountname,lastActivityTime},
        { autoCommit: true }
    );
    console.log(`User ${accountname} updated with f_last_accessed in TANC as ${lastActivityTime}`);
   // await connection.close();
    
    //const connection1= await connectDb();
    await connection.execute(
        `update t_user_credentials set f_last_accessed=:lastActivityTime where f_account_name= :accountname`,
        {accountname,lastActivityTime},
        { autoCommit: true }
    );
    console.log(`User ${accountname} updated with f_last_accessed in TUC as ${lastActivityTime}`);
    //await connection.close();

    await connection.execute(
        `update t_last_login_sessions set f_time=:lastActivityTime where f_user_id= :accountname`,
        {accountname,lastActivityTime},
        { autoCommit: true }
    );
    console.log(`User ${accountname} updated with f_last_accessed in T_LAST_LOGIN_SESSIONS as ${lastActivityTime}`);
    await connection.close();
};
async function getAnonymizationFailedUsers() {
    const connection= await connectDb();
    const result= await connection.execute(`
        select * from t_user_anonymization_data where f_status='Eligibility_Validation_Failed'  and TRUNC(f_insertion_time)= TRUNC(sysdate)`,
        [],
        {outFormat:oracledb.OUT_FORMAT_OBJECT}
    );
    //console.log('validation failed users are :',result.rows);
    try{
    const validationfaileduserscount= result.rows.length;
    console.log('Validation failed users count is :',validationfaileduserscount);
    const anonymizationfailedusers=[];
    if(validationfaileduserscount==0){
        console.log(`Validation failed users count is Zer0`);
    }
    else {
        for (let i=0;i<result.rows.length;i++){
            const validationfaileduser=result.rows[i].F_ACCOUNT_NAME;
            console.log(`Validation failed user is :${validationfaileduser}`);
            const validationfailedusercomments=result.rows[i].F_COMMENTS;
            console.log(`Validation failed user comments are : ${validationfailedusercomments}`);
            anonymizationfailedusers.push(validationfaileduser);
            anonymizationfailedusers.push(validationfailedusercomments);
        }
    }
    
    return anonymizationfailedusers;
}
catch(Error){
console.log('Error in execution is :',Error);
}
};
async function updateDbForAnonymization(accountname,lastActivityTime,eligibilityTime) {
    const connection= await connectDb();
    await connection.execute(
        `update t_user_anonymization_data set f_status='Eligible_for_Anonymization' ,
        f_comments='updating record again because validation is failed',
    f_custom_1='' ,f_custom_2='',f_eligibilty_time=:eligibilityTime,f_modified_time=:modifiedTime,
    f_last_activity_time=:lastActivityTime
    where f_account_name= :accountname`,
    {accountname,lastActivityTime,eligibilityTime,modifiedTime:now},
    {autoCommit:true}
    );
    
};
async function getAnonymisedFeildsFromPpokerops(accountname) {
    const connection= await connectPpokerops();
    const result1= await connection.execute(
        `select f_first_name,f_last_name,f_email,f_password_casino,f_sex,f_city,
    f_first_name_hash,f_last_name_hash,f_email_hash, f_ip from t_account_name_casino
    where f_account_name_casino= :accountname`,
    [accountname],
    { outFormat: oracledb.OUT_FORMAT_OBJECT }
);

const result2= await connection.execute(
    `select f_first_name,f_last_name,f_email,f_password_casino,f_sex,f_city,
f_first_name_hash,f_last_name_hash,f_email_hash from t_account_name_casino
where f_account_name_casino= :accountname`,
[accountname],
{ outFormat: oracledb.OUT_FORMAT_OBJECT }
);

const result3= await connection.execute(
    `select f_dob,f_mobile,f_fname,f_lname,f_email_id,f_mdname,f_mdname_hash,f_address,f_address2,f_city,
f_state,f_zip,f_country,f_nationality,f_title,f_birth_city,
f_birth_state,f_birth_country,f_fname_hash,f_lname_hash,f_address_hash,
f_phone_hash,f_mobile_hash,f_dob_hash,f_email_hash,f_ssn from EZECASH.t_g_biographic
 where f_account_name_eze= :accountname`,
[accountname],
{ outFormat: oracledb.OUT_FORMAT_OBJECT }
);

const result4= await connection.execute(
    `select f_dob,f_title,f_first_name,f_last_name,f_mdname,f_mdname_hash,f_address,f_address2,f_city,f_state,
f_zip,f_country,f_nationality,f_birth_city,f_birth_state,f_birth_country,
f_first_name_hash,f_last_name_hash,f_address_hash,f_phone_hash,f_mobile_hash,f_ssn
from t_address where f_user_id= :accountname`,
[accountname],
{ outFormat: oracledb.OUT_FORMAT_OBJECT }
);

const result5= await connection.execute(
    `select f_ip,f_country from t_login_sessions where f_user_id = :accountname`,
[accountname],
{ outFormat: oracledb.OUT_FORMAT_OBJECT }
);

const result6= await connection.execute(
    `select f_dob,f_mobile,f_fname,f_lname,f_email_id,f_mdname,f_mdname_hash,f_address,f_address2,f_city,
f_state,f_zip,f_country,f_nationality,f_title,f_birth_city,f_birth_state,f_birth_country,f_fname_hash,
f_lname_hash,f_address_hash,f_phone_hash,f_mobile_hash,f_dob_hash,f_email_hash,f_ssn from EZECASH.t_g_biographic
where f_account_name_eze= :accountname`,
[accountname],
{ outFormat: oracledb.OUT_FORMAT_OBJECT }
);

const result7= await connection.execute(
    `select F_EMAIL, F_MOBILE  from t_player_comm_vrfn_status where f_account_name= :accountname`,
[accountname],
{ outFormat: oracledb.OUT_FORMAT_OBJECT }
);

const result8= await connection.execute(
    `select F_EMAIL, F_MOBILE  from t_player_comm_vrfn_status_log 
    where f_account_name= :accountname`,
[accountname],
{ outFormat: oracledb.OUT_FORMAT_OBJECT }
);

const result9= await connection.execute(
    `select F_IP  from ARA.t_login_attempt_data where f_account_name= :accountname`,
[accountname],
{ outFormat: oracledb.OUT_FORMAT_OBJECT }
);

const result10= await connection.execute(
    `select F_PASSWORD, F_EMAIL from T_G_ACCOUNT_MASTER where f_account_name= :accountname`,
[accountname],
{ outFormat: oracledb.OUT_FORMAT_OBJECT }
);

const result11= await connection.execute(
    `select f_contact_number from ARA.t_user_login_category where f_account_name= :accountname`,
[accountname],
{ outFormat: oracledb.OUT_FORMAT_OBJECT }
);

const result12= await connection.execute(
    `select f_ip from ARA.t_user_login_category_log where f_account_name=:accountname`,
[accountname],
{ outFormat: oracledb.OUT_FORMAT_OBJECT }
);

const result13= await connection.execute(
    `select F_PASSWORD,F_FIRST_NAME,F_LAST_NAME,F_EMAIL,F_DOB,F_GENDER,F_PHONE,F_MOBILE,
F_COUNTRY,F_SSN,F_ADDRESS,F_ADDRESS2,F_CITY,F_STATE,F_ZIP,F_NATIONALITY 
from ARA.t_account_info where f_account_name=:accountname`,
[accountname],
{ outFormat: oracledb.OUT_FORMAT_OBJECT }
);

const result14= await connection.execute(
    `select F_IP,f_country,F_REGION  from t_login_sessions_arc where f_user_id=:accountname`,
[accountname],
{ outFormat: oracledb.OUT_FORMAT_OBJECT }
);

  console.log('Anonymized data points from TANC table for given account',result1.rows[0]);
  console.log('Anonymized data points from TANC_LOG table for given account',result2.rows[0]);
  console.log('Anonymized data points from T_G_BIOGRAPHIC table for given account',result3.rows[0]);
  console.log('Anonymized data points from T_ADDRESS table for given account',result4.rows[0]);
  console.log('Anonymized data points from T_LOGIN_SESSIONS table for given account',result5.rows[0]);
  console.log('Anonymized data points from T_G_BIOGRAPHIC_LOG table for given account',result6.rows[0]);
  console.log('Anonymized data points from T_PLAYER_COMM_VRFN_STATUS table for given account',result7.rows[0]);
  console.log('Anonymized data points from T_PLAYER_COMM_VRFN_STATUS_LOG table for given account',result8.rows[0]);
  console.log('Anonymized data points from T_LOGIN_ATTEMPT_DATA table for given account',result9.rows[0]);
  console.log('Anonymized data points from T_G_ACCOUNT_MASTER table for given account',result10.rows[0]);
  console.log('Anonymized data points from T_USER_LOGIN_CATEGORY table for given account',result11.rows[0]);
  console.log('Anonymized data points from T_USER_LOGIN_CATEGORY_LOG table for given account',result12.rows[0]);
  console.log('Anonymized data points from T_ACCOUNT_INFO table for given account',result13.rows[0]);
  console.log('Anonymized data points from T_LOGIN_SESSION_ARC table for given account',result14.rows[0]);
  return result1.rows[0]; 
   
};

async function getAnonymisedFeildsFromPgauth(accountname) {
    const connection= await connectPgauth();
    const result1= await connection.execute(
        `select f_email,f_password_hash,f_mobile_number from 
        t_user_credentials where f_account_name= :accountname`,
        [accountname],
        {outFormat:oracledb.OUT_FORMAT_OBJECT}
    );

    const result2= await connection.execute(
        `select f_ip,f_country from t_last_login_sessions where f_user_id=:accountname`,
        [accountname],
        {outFormat:oracledb.OUT_FORMAT_OBJECT}
    );

    const result3= await connection.execute(
        `select f_oauth_provider from T_OAUTH_USER_MAPPING where f_account_name=:accountname`,
        [accountname],
        {outFormat:oracledb.OUT_FORMAT_OBJECT}
    );

    const result4= await connection.execute(
        `select f_email,f_password_hash,f_mobile_number from t_user_credentials_log where f_account_name= :accountname`,
        [accountname],
        {outFormat:oracledb.OUT_FORMAT_OBJECT}
    );

    const result5= await connection.execute(
        `select f_email,f_password_hash,f_mobile_number from t_user_credentials_log_v2 where f_account_name= :accountname`,
        [accountname],
        {outFormat:oracledb.OUT_FORMAT_OBJECT}
    );


    const result6= await connection.execute(
        `select F_OAUTH_PROVIDER, F_OAUTH_ID from t_oauth_user_workflow_data where f_account_name=:accountname`,
        [accountname],
        {outFormat:oracledb.OUT_FORMAT_OBJECT}
    );

    const result7= await connection.execute(
        `select  f_ip from T_GR_SAFE_LOGIN_SESSION where f_user_id=:accountname`,
        [accountname],
        {outFormat:oracledb.OUT_FORMAT_OBJECT}
    );
    
    console.log('Anonymized data points from T_USER_CREDENTIALS table for given account', result1.rows[0]);
    console.log('Anonymized data points from T_LAST_LOGIN_SESSIONS table for given account', result2.rows[0]);
    console.log('Anonymized data points from T_OAUTH_USER_MAPPING table for given account', result3.rows[0]);
    console.log('Anonymized data points from T_USER_CREDENTIALS_LOG table for given account', result4.rows[0]);
    console.log('Anonymized data points from T_USER_CREDENTIALS_LOG_V2 table for given account', result5.rows[0]);
    console.log('Anonymized data points from T_OAUTH_USER_WORKFLOW_DATA table for given account', result6.rows[0]);
    console.log('Anonymized data points from T_GR_SAFE_LOGIN_SESSION table for given account', result7.rows[0]);

}   ;

async function getAnonymisedFeildsFromUseraccount(accountname) {
    const connection= await connectUseraccount();
    const result1= await connection.execute(
        `select f_custom_varchar4 from T_PLAYER_ADDITIONAL_INFO where f_account_name=:accountname`,
        [accountname],
        {outFormat:oracledb.OUT_FORMAT_OBJECT}
    );

    const result2= await connection.execute(
        `select f_company_address, F_COMPANY_COUNTRY_CODE,f_company_phone_number, f_country_of_residence from T_USER_OPTIONAL_INFO_LOG where f_account_name=:accountname`,
        [accountname],
        {outFormat:oracledb.OUT_FORMAT_OBJECT}
    );
    const result3= await connection.execute(
        `select f_custom_varchar4 from T_PLAYER_ADDITIONAL_INFO_LOG where f_account_name=:accountname`,
        [accountname],
        {outFormat:oracledb.OUT_FORMAT_OBJECT}
    );

    const result4= await connection.execute(
        `select f_company_address, f_company_phone_number, f_country_of_residence from T_USER_OPTIONAL_INFO where f_account_name=:accountname`,
        [accountname],
        {outFormat:oracledb.OUT_FORMAT_OBJECT}
    );

    const result5= await connection.execute(
        `select F_DOB from T_NL_PLYR_PROFILE_DAILY_DATA where f_account_name=:accountname`,
        [accountname],
        {outFormat:oracledb.OUT_FORMAT_OBJECT}
    );

    const result6= await connection.execute(
        `select F_DOB from T_NL_PLYR_PROFILE_YEARLY_DATA where f_account_name=:accountname`,
        [accountname],
        {outFormat:oracledb.OUT_FORMAT_OBJECT}
    );

    const result7= await connection.execute(
        `select f_fname,f_lname,f_country,f_email_id from T_GR_SAFE_REG_SESSION where f_user_id=:accountname`,
        [accountname],
        {outFormat:oracledb.OUT_FORMAT_OBJECT}
    );

    const result8= await connection.execute(
        `select F_FNAME, F_LNAME, F_ADDRESS, F_ADDRESS2, F_ZIP, F_CITY, F_STATE, F_COUNTRY_CODE, F_DOB, F_BIRTH_CITY, F_MDNAME from T_DE_SAFE_PLYR_REG where f_user_id=:accountname`,
        [accountname],
        {outFormat:oracledb.OUT_FORMAT_OBJECT}
    );

    const result9= await connection.execute(
        `select F_FNAME, F_LNAME, F_ADDRESS, F_ADDRESS2, F_ZIP, F_CITY, F_STATE, F_COUNTRY_CODE, F_DOB, F_BIRTH_CITY, F_MDNAME from T_DE_SAFE_PLYR_REG_SETUP where f_user_id=:accountname`,
        [accountname],
        {outFormat:oracledb.OUT_FORMAT_OBJECT}
    );
    
    console.log('Anonymized data points from T_PLAYER_ADDITIONAL_INFO table for given account', result1.rows[0]);
    console.log('Anonymized data points from T_USER_OPTIONAL_INFO_LOG table for given account', result2.rows[0]);
    console.log('Anonymized data points from T_PLAYER_ADDITIONAL_INFO_LOG table for given account', result3.rows[0]);
    console.log('Anonymized data points from T_USER_OPTIONAL_INFO table for given account', result4.rows[0]);
    console.log('Anonymized data points from T_NL_PLYR_PROFILE_DAILY_DATA table for given account', result5.rows[0]);
    console.log('Anonymized data points from T_NL_PLYR_PROFILE_YEARLY_DATA table for given account', result6.rows[0]);
    console.log('Anonymized data points from T_GR_SAFE_REG_SESSION table for given account', result7.rows[0]);
    console.log('Anonymized data points from T_DE_SAFE_PLYR_REG table for given account', result8.rows[0]);
    console.log('Anonymized data points from T_DE_SAFE_PLYR_REG_SETUP table for given account', result9.rows[0]);
    return result1.rows;
    
}

module.exports={insertUsers,searchUserInTable,verifyStatusInDb,
    updateCreateTimeInTanc,updateLastAccessedTimeInTanc,
    updateDbForAnonymization,getAnonymisedFeildsFromPpokerops,
    getAnonymisedFeildsFromUseraccount,
    getAnonymisedFeildsFromPgauth,verifyUserValidationStatus,
    verifyUserAnonymizationStatus,updateCreatetimeInAllTables,
    insertUsersNotInTableFromTANC,insertJurisdictionForPlayers,
    getAnonymizationFailedUsers,getUserPlayRealStatus,UpdatedusercategorytoNormal,
     getAnonymizationCompletedUsers
    };