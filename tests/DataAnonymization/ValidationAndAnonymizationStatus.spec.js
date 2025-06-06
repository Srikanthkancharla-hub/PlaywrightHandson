const {test,expect}=require('@playwright/test');
const {getAnonymisedFeildsFromPpokerops,
    getAnonymisedFeildsFromPgauth,verifyUserValidationStatus,verifyUserAnonymizationStatus,
    getAnonymisedFeildsFromUseraccount,getAnonymizationFailedUsers,getAnonymizationCompletedUsers
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


