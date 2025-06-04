const {test,expect}=require('@playwright/test');
import { LoginPage } from '../../Pages/LoginPage';
const RegistrationPage=require('../../Pages/RegistrationPage');

test.describe.configure({retries:1,timeout:120000});
test('QA2_France Registration in English Success',async({page})=>{
const rp= new RegistrationPage(page);
const lp= new LoginPage(page);
await lp.launchFranceInEnglishUrl();
await rp.generateRandomValues();
await rp.frRegistrationSuccess1();
await rp.franceZipCode('01000');
await rp.frRegistrationSuccess2();
});
test.describe.configure({retries:1,timeout:120000});
test.only('QA2_France Registration in french Success',async({page})=>{
const rp= new RegistrationPage(page);
const lp= new LoginPage(page);
await lp.launchFranceInFrenchUrl();
await rp.generateRandomValues();
await rp.frRegistrationSuccess1();
await rp.franceZipCode('01000');
await rp.frRegistrationSuccess2();
});