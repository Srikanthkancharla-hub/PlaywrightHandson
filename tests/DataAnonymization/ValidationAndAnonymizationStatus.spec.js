const {test,expect}=require('@playwright/test');
const {getAnonymisedFeildsFromPpokerops,
    getAnonymisedFeildsFromPgauth,verifyUserValidationStatus,verifyUserAnonymizationStatus,
    getAnonymisedFeildsFromUseraccount,getValidationFailedUsers,getAnonymizationCompletedUsers,
    getElibleForAnonymizationPlayersFromDB
}=require('./dbqueries');

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
        const comments=user.comments;
        //console.log('User eligible for anonymization is:',accountname);
        console.log(`user :${accountname} has comments :${comments}`);
        if (comments.toUpperCase().includes("FAILED")){
            console.log("Validation is failed for user :" , accountname);
            console.log(`Validation Failed user comments are :${comments}`);
            console.log(`Validation failed user status is :${user.status}`);
        }
        else {
            console.log("Validation is success for user :" , accountname);
            console.log(`Validation success user comments are :${comments}`);
            console.log(`Validation success user status is :${user.status}`);

        }
    }

});

