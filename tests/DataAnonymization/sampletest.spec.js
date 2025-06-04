const {test,expect}=require('@playwright/test');
const {calenderRollingYearsDate}=require('../DataAnonymization/countrylabelretension');

const createTimeToUpdateInTanc= calenderRollingYearsDate[0];
console.log(' 6 years ago date is :',createTimeToUpdateInTanc);

test('Sample test ', async ()=>{

}

)