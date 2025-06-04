const {test,expect}=require('@playwright/test');
const {dbqueries, searchUserInTable, insertUsers,
    verifyStatusInDb,updateCreateTimeInTanc,updateLastAccessedTimeInTanc,
    updateDbForAnonymization,insertUsersNotInTableFromTANC,insertJurisdictionForPlayers,getAnonymizationFailedUsers
}=require('../DataAnonymization/dbqueries');
const userslist=require('../DataAnonymization/DAUserslist');
const useractivitytype=require('../DataAnonymization/activityType');
const { connectDb } = require('../../Utils/dbconnection');
const activityType = require('../DataAnonymization/activityType');
const {calenderRollingYearsDate}=require('../DataAnonymization/countrylabelretension');

//const userlastActivityTime = new Date('2005-05-01T09:12:44');

var  sysdateeligibilitydate;
var realuserlastactivitybackdate;
var playuserlastactivitybackdate ;
var backdatedeligibilityTime;
test.beforeAll(async ()=>{
    const dates= await calenderRollingYearsDate();
    sysdateeligibilitydate=dates[0];
    realuserlastactivitybackdate=dates[1];
    playuserlastactivitybackdate=dates[2];
    backdatedeligibilityTime= dates[3];

    console.log(`Updating real user last activity date to : ${realuserlastactivitybackdate} `);
    console.log(`Updating play user last activity date to : ${playuserlastactivitybackdate} `);
    console.log(`Updating  user eligibility date to sysdate : ${sysdateeligibilitydate} `);
    console.log(`Updating last activity date for validation failed user to to make eligible :${backdatedeligibilityTime}`);
});

//const userCreateTime= new Date('2005-05-01T09:12:44');
//const usereligibilityTime= new Date('2024-05-01T09:12:44')

test('Insert users with last activity time is less than threhsold time.' , async()=>{
    let j=0;
    for(let i=0;i<userslist.length;i++){
        const testUserName=userslist[i];
        console.log('user picked is :',testUserName);
        const randomactivityType=useractivitytype[j];
        console.log('activityType picked is :',randomactivityType);
        try{
        const user= await searchUserInTable(testUserName);
        if(user.length==0){
            console.log('User not found, inserting user into table with activity:', randomactivityType);
            await insertUsers(testUserName,randomactivityType,sysdateeligibilitydate);
        }
        j++;
if(j>useractivitytype.length){
    j=0;
}

    }catch(error){
        console.log('Error is :', error);
    }
}
}

);

// To make this use case as success insert record with last activity time as sysdate. 
test('Verify core validation check is failed due to last activity time is less than threshold time', async ()=>{
    for(let i=0;i<userslist.length;i++){
        const testUserName=userslist[i];
        console.log(`user picked to verify status in db is ${testUserName}`);
        try{
            await verifyStatusInDb(testUserName);

        }
        catch(error){
            console.error('Error is :', error);
        }
    }   
}
);
test.describe.configure({timeout:3000000});
test('Insert users not in T_USER_ANONYMIZATION_DATA from TANC for Anonymization  ', async ()=>{
    const insertedAccounts = await insertUsersNotInTableFromTANC();
    let j=0;
    for(let i=0;i<insertedAccounts.length;i++){
        const testUserName=insertedAccounts[i];
        console.log('user picked is :',testUserName);
        const randomactivityType=useractivitytype[j];
        console.log('activityType picked is :',randomactivityType);
        try{
        const user= await searchUserInTable(testUserName);
        if(user.length==0){
            console.log('User not found, inserting user into table with activity:', randomactivityType);
            await insertUsers(testUserName,randomactivityType,playuserlastactivitybackdate); 
            await updateCreateTimeInTanc(testUserName,playuserlastactivitybackdate);
        }
        j++;
if(j>=useractivitytype.length){
    j=0;
} 
    }catch(error){
        console.log('Error is :', error);
    }
}
}

);
//test.describe.configure({timeout:3000000});
test('Updating Basic check failed DB Records to eligible for anonymization', async ()=>{
    const validationfaileduserslist= await getAnonymizationFailedUsers();
    console.log('Validation failed users list is :', validationfaileduserslist);
    for (let i=0;i<validationfaileduserslist.length;i++){
        const testUserName=validationfaileduserslist[i];
        console.log(`User picked to update data in DB is : ${testUserName}`);
        try{
           const user= await searchUserInTable(testUserName);
           if(user.length>0){
            const typefromresult=user[0][1];
            console.log('User activity type from result is:' ,typefromresult);
            await updateDbForAnonymization(testUserName,backdatedeligibilityTime);
           }

            //await updateDbForAnonymization(testUserName,userlastActivityTime);
        }catch(error){
            console.error('Error is :', error);
        }

    }

}

);

test ('updating jurisdiction for players having null value in DB ',  async ()=>{
    for(let i=0;i<userslist.length;i++){
        const testUserName=userslist[i];
        console.log(`user picked to verify status in db is ${testUserName}`);
        try{
            await insertJurisdictionForPlayers(testUserName);

        }
        catch(error){
            console.error('Error is :', error);
        }
    }

}

)
