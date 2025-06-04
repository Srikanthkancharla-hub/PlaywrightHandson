const {test,expect}=require('@playwright/test');
const {getAnonymisedFeildsFromPpokerops,
    getAnonymisedFeildsFromPgauth,verifyUserValidationStatus,verifyUserAnonymizationStatus,
    getAnonymisedFeildsFromUseraccount
}=require('../DataAnonymization/dbqueries');
const userslist=require('../DataAnonymization/DAUserslist');

const testUserName='bz_qBwTRBzSWU';
const userscount=30;

test.describe.configure({retries:1,timeout:300000});
test( 'Verify data points after user anonymization is comepleted', async ()=>{
    await getAnonymisedFeildsFromPpokerops(testUserName);
    await getAnonymisedFeildsFromPgauth(testUserName);
    await getAnonymisedFeildsFromUseraccount(testUserName);
}

);

test.describe.configure({timeout:3000000});
test('verify validation status for users from DB automatically after data is loaded ' , async ()=>{
    await verifyUserValidationStatus(userscount);
}
);

test.describe.configure({timeout:3000000});
test.only('verify data points for anonymized users from DB automatically' , async ()=>{
    await verifyUserAnonymizationStatus(userscount);
}
);