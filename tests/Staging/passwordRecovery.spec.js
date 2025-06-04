const {test,expect}=require('@playwright/test');
const PasswordRecovery=require('../../Pages/PasswordRecovery');
import { LoginPage } from '../../Pages/LoginPage';

test.describe.configure({retries:1,timeout:120000});
test('BZ PasswordRecovery flow success through mail' , async({page})=>{
   const lp= new LoginPage(page);
   const pr= new PasswordRecovery(page);
  await  lp.launchStagingBwinUrl();
  await pr.passwordRecoveryEmailDObCheck('bwchreg7@yopmail.com','21','08','1991');
  await pr.clickOnEmailLink();
});