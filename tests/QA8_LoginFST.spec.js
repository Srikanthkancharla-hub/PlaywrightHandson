const{test,expect}=require('@playwright/test');
const RegistrationPage= require('../Pages/RegistrationPage');
import { LoginPage } from '../Pages/LoginPage';

test.describe.configure({retries:1,timeout:120000});
test('QA8:NJ Login Success Test',async({page})=>{
    const lp=new LoginPage(page);
    await lp.launchQa8MjUrl();
    await lp.LoginSuccess('testbvprod@yopmail.com','Test@123');
    await page.waitForURL("https://qa81.sports.nj.betmgm.com/en/sports?q=1");
    await page.waitForTimeout(4000);
});
test.describe.configure({retries:1,timeout:120000});
test('QA8:Wv Login Success Test',async({page})=>{
    const lp=new LoginPage(page);
    await lp.launchQa8WvUrl();
    await lp.LoginSuccess('rollvenmo@yopmail.com','Test@123');
    await page.waitForURL("https://qa82.sports.wv.betmgm.com/en/sports?q=1");
    await page.waitForTimeout(4000);
});
