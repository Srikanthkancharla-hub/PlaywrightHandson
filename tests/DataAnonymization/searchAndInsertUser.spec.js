const {test,expect}=require('@playwright/test');
const {dbqueries, searchUserInTable, insertUsers,
    verifyStatusInDb,updateCreateTimeInTanc,updateLastAccessedTimeInTanc,getUserPlayRealStatus,
    updateDbForAnonymization,insertUsersNotInTableFromTANC,getValidationFailedUsers,insertJurisdictionForPlayers
    ,UpdatedusercategorytoNormal
}=require('../DataAnonymization/dbqueries');
const useractivitytype=require('../DataAnonymization/activityType');
const { connectDb } = require('../../Utils/dbconnection');
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

test('Insert users with Eligibility time  as Sysdate.' , async()=>{
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
            const userplayrealstatus= await getUserPlayRealStatus(testUserName);
            const userstatus=userplayrealstatus[0];
            if(userstatus==0){
                await insertUsers(testUserName,randomactivityType,playuserlastactivitybackdate,sysdateeligibilitydate);
                await insertJurisdictionForPlayers(testUserName);
            }else{
                await insertUsers(testUserName,randomactivityType,realuserlastactivitybackdate,sysdateeligibilitydate);
                await insertJurisdictionForPlayers(testUserName);
            }
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

// To make this use case as success insert record with last activity time as sysdate. 
/*test('Verify core validation check is failed due to last activity time is less than threshold time', async ()=>{
    const insertedAccounts = await insertUsersNotInTableFromTANC();
    for(let i=0;i<insertedAccounts.length;i++){
        const testUserName=insertedAccounts[i];
        console.log(`user picked to verify status in db is ${testUserName}`);
        try{
            await verifyStatusInDb(testUserName);

        }
        catch(error){
            console.error('Error is :', error);
        }
    }   
}
);*/

test.describe.configure({timeout:3000000});
test.only('Insert users not in T_USER_ANONYMIZATION_DATA from TANC for Anonymization  ', async ()=>{
    const insertedAccounts = await insertUsersNotInTableFromTANC();
    
        let j=0;
    for(let i=0;i<insertedAccounts.length;i++){
        const testUserName=insertedAccounts[i];
        console.log('user picked is :',testUserName);
        const randomactivityType=useractivitytype[j];
        console.log('activityType picked is :',randomactivityType);
        const playerstatus= await getUserPlayRealStatus(testUserName);
        const userstatus=playerstatus[0];
        try{
        const user= await searchUserInTable(testUserName);
        if(user.length==0){
            console.log('User not found, inserting user into table with activity:', randomactivityType);
            if(userstatus==0){
                await insertUsers(testUserName,randomactivityType,playuserlastactivitybackdate,backdatedeligibilityTime); 
                await updateCreateTimeInTanc(testUserName,playuserlastactivitybackdate); 
            } else {
                await insertUsers(testUserName,randomactivityType,realuserlastactivitybackdate,backdatedeligibilityTime); 
                await updateCreateTimeInTanc(testUserName,realuserlastactivitybackdate);
            }
            
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
    //console.log('Validation failed users list is :', validationfaileduserslist);
    for (let i=0;i<validationfaileduserslist.length;i++){
        const testUserName=validationfaileduserslist[i];
        console.log(`User picked to update data in DB is : ${testUserName}`);
        try{
           const user= await searchUserInTable(testUserName);
           if(user.length>0){
            const typefromresult=user[0][1];
            console.log('User activity type from result is:' ,typefromresult);
            const playerstatus= await getUserPlayRealStatus(testUserName);
            const userstatus=playerstatus[0];
            if(userstatus==0){
                await updateDbForAnonymization(testUserName,playuserlastactivitybackdate,backdatedeligibilityTime);
                await UpdatedusercategorytoNormal(testUserName);
            }else {
                await updateDbForAnonymization(testUserName,realuserlastactivitybackdate,backdatedeligibilityTime);
                await UpdatedusercategorytoNormal(testUserName);
            }
            
           }
        }catch(error){
            console.error('Error is :', error);
        }

    }

}

);

