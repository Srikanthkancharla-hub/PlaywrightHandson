//import { RegistrationPage } from "../../Pages/RegistrationPage";
const RegistrationPage = require('../../Pages/RegistrationPage');
const HomePage=require('../../Pages/HomePage');
import { LoginPage } from "../../Pages/LoginPage";
const { test, expect } = require('@playwright/test');
//const { faker } = require('@faker-js/faker');
test.describe.configure({ retries: 1, timeout: 180000 });
test('Staging: Bwin Registration Success Test', async ({ page }) => {
    const Rp = new RegistrationPage(page);
    const lp = new LoginPage(page);
    const hp= new HomePage(page);
    await lp.launchStagingBwinUrl();
    await Rp.generateRandomValues();
    await Rp.registrationSuccess();
    //await page.close();
    //await page.waitForURL("https://test.www.bwin.com/en/mobileportal/fundsregulation");

    //await page.waitForTimeout(4000);

});
test.describe.configure({ retries: 1, timeout: 180000 });
test('Staging: Partypoker Registration Success Test', async ({ page }) => {
    const rp = new RegistrationPage(page);
    const lp = new LoginPage(page);
    await lp.launchStaginPartypokerUrl();
    await rp.generateRandomValues();
    await rp.clickOnPpRegister();
    await rp.ppRegistrationSuccess();
    //await page.waitForURL("https://test.myaccount.partypoker.com/en/mobileportal/fundsregulation");
    //await page.close();
});
test.describe.configure({ retries: 1, timeout: 180000 });
test('Staging: Ladbrokes Registration Success Test', async ({ page }) => {
    const rp = new RegistrationPage(page);
    const lp = new LoginPage(page);
    await lp.launchStagingLadbrokes();
    await rp.clickOnLCGRegister();
    await rp.generateRandomValues();
    await rp.ppRegistrationSuccess();
    //await page.close();
});
test.describe.configure({retries:1,timeout:180000});
test('Staging: Coral Registration Success Test',async({page})=>{
    const lp= new LoginPage(page);
    const rp=new RegistrationPage(page);
    await lp.launchStaginfCoralPortalUrl();
    await rp.clickOnLCGRegister();
    await rp.generateRandomValues();
    await rp.clRegistrationSuccess();
    //await page.close();
});