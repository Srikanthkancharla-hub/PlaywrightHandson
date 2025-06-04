const RegistrationPage= require('../../Pages/RegistrationPage');
import { LoginPage } from '../../Pages/LoginPage';
const {test,expect} =require('@playwright/test');
test.describe.configure({retries:1,timeout:180000});
test('QA2: BWIN Registration Success Test',async({page})=>{
    const lp=new LoginPage(page);
    const rp=new RegistrationPage(page);
    await lp.launchQa2Bwin();
    await rp.generateRandomValues();
    await rp.registrationSuccess();
    await page.waitForTimeout(4000);
});
test.describe.configure({retries:1,timeout:180000});
test('QA2: Partypoker Registration Success Test',async({page})=>{
    const rp= new RegistrationPage(page);
    const lp=new LoginPage(page);
    await lp.launchQa2Partypoker();
    await rp.generateRandomValues();
    await rp.clickOnPpRegister();
    await rp.ppRegistrationSuccess();
    await page.waitForTimeout(10000);
    //await page.close();

});
test.describe.configure({retries:1,timeout:180000});
test('QA2: Ladbrokes Registration Success Test',async({page})=>{
    test.setTimeout(300000);
    const rp= new RegistrationPage(page);
    const lp=new LoginPage(page);
    await lp.launchQa2Ladbrokes();
    await rp.generateRandomValues();
    await rp.clickOnLCGRegister();
    await rp.ldRegistrationSuccess();
    await page.waitForTimeout(4000);
    //await page.close();

});
test.describe.configure({retries:1,timeout:180000});
test('QA2: Coral Registration Success Test',async({page})=>{
    const rp= new RegistrationPage(page);
    const lp=new LoginPage(page);
    await lp.launchQa2Coral();
    await rp.generateRandomValues();
    await rp.clickOnLCGRegister();
    await rp.clRegistrationSuccess();
    await page.waitForTimeout(4000);
    //await page.close();

});


