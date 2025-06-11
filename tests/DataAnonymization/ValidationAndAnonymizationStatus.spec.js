const {test}=require('@playwright/test');
const {getAnonymisedFeildsFromPpokerops,
    getAnonymisedFeildsFromPgauth,
    getAnonymisedFeildsFromUseraccount,getValidationFailedUsers,getAnonymizationCompletedUsers,
    getElibleForAnonymizationPlayersFromDB
}=require('./dbqueries');
const { diff } = require('util');

test.describe.configure({retries:1,timeout:300000});
test( 'Verify data points after user anonymization is comepleted', async ()=>{
    const anonymizedUsers= await getAnonymizationCompletedUsers();
    for (let i=0;i<anonymizedUsers.length;i++){
        const anonymizedUser=anonymizedUsers[i];
        console.log(`Data points after users is anonymized for user : ${anonymizedUser}`);
        await getAnonymisedFeildsFromPpokerops(anonymizedUser);
        await getAnonymisedFeildsFromPgauth(anonymizedUser);
        await getAnonymisedFeildsFromUseraccount(anonymizedUser);
    }
}
);

test("Verify  user validation status in DB", async()=>{
    const eligibleusers= await getElibleForAnonymizationPlayersFromDB();
    for (var user of eligibleusers){
        const accountname=user.accountName;
        if(user.comments.toUpperCase().includes("VALIDATION")){
            console.log(` User ${accountname} validation status is :${user.status}`);
            console.log(`User Validation comments are :${user.comments}`);
            console.log(`User Validation eligibility time is : ${user.eligibilityTime}`);
            console.log(`User Validation CUSTOM_1 value is :${user.custom1}`);
            console.log(`User Validation CUSTOM_2 value is : ${user.custom2}`);
        }
        else {
            if(user.comments.toUpperCase().includes("initiated")){
                console.log(`User is :${accountname} validation is initiated `)
            }
            console.log(`User is :${accountname} yet to pick for validation`);
        }
    }
});

test("Verify Basic check failed users data points in db", async()=>{
    const failedusers= await getValidationFailedUsers();
    for (const user of failedusers){
        const accountname=user.accountName;
        const userstatus=user.status;
        const usercomments=user.comments;
        if((usercomments.toUpperCase().includes("Failed"))){
            console.log(` user ${accountname} validation is failed with Basic check and comments are :${usercomments}`);
            console.log(`Basic validation failed user status is : ${userstatus}`);
            console.log(`Basic validation failed user eligibility time is  : ${user.eligibilityTime}`);
            console.log(`Basic validation failed user CUSTOM_1 is : ${user.custom1}`);
            console.log(`Basic validation failed user CUSTOM_2 is :${user.custom2}`);
        }else {
            console.log(` user ${accountname} validation is failed and comments are :${usercomments}`);
            console.log(` validation failed user status is : ${userstatus}`);
            console.log(` validation failed user eligibility time is  : ${user.eligibilityTime}`);
            console.log(` validation failed user CUSTOM_1 is : ${user.custom1}`);
            console.log(` validation failed user CUSTOM_2 is :${user.custom2}`);
            const failedTeams = [usercomments.matchAll(/(\w+)\s*Failed[-:](\w+)/g)].map(match => match[2]);
            console.log("Validation Failed Teams are :" ,failedTeams);

        }

    }
});