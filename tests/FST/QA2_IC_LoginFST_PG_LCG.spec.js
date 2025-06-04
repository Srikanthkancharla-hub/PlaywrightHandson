const {test,expect}=require('@playwright/test');
import { LoginPage } from '../../Pages/LoginPage';

test.describe.configure({retries:1,timeout:180000});
test('QA2_IC: Bwin Login Success Test',async({page})=>{
    const lp=new LoginPage(page);
    await lp.launchQa2Bwin();
    await lp.LoginSuccess('ishaa3lsl1@yopmail.com','Test@123');
    await page.waitForURL("https://qa2.sports.bwin.com/en/sports?q=1");
    const expectedurl=page.url();
    const actualurl="https://qa2.sports.bwin.com/en/sports?q=1";
    if(expectedurl==actualurl){
        console.log("User Logged in Successfully ")
    }
    else {
        console.log( page.url());
        console.log("User not logged into the page")
    }
});
test.describe.configure({retries:1,timeout:180000});
test('QA2_IC: Partypoker Login Success Test', async({page})=>{
    const lp=new LoginPage(page);
    await lp.launchQa2Partypoker();
    await lp.LoginSuccess('ishaadata@yopmail.com','Test@123');
    await page.waitForURL("https://qa2.www.partypoker.com/en?q=1");
    const expectedurl=page.url();
    const actualurl="https://qa2.www.partypoker.com/en?q=1";
    if(expectedurl==actualurl){
        console.log("User Logged in Successfully ")
    }
    else {
        console.log( page.url());
        console.log("User not logged into the page")
    }
});
test.describe.configure({retries:1,timeout:180000});
test('QA2_IC: Ladbrokes Login Success Test',async({page})=>{
    const lp= new LoginPage(page);
    await lp.launchQa2Ladbrokes();
    await lp.LadbrokesLogin('ishaa9898@yopmail.com','Test@123');
    await page.waitForURL("https://qa2.sports.ladbrokes.com/?q=1");
    const expectedurl=page.url();
    const actualurl="https://qa2.sports.ladbrokes.com/?q=1";
    if(expectedurl==actualurl){
        console.log("User Logged in Successfully ")
    }
    else {
        console.log( page.url());
        console.log("User not logged into the page")
    }
});
test.describe.configure({retries:1,timeout:180000});
test('QA2_IC:Coral Login Success Test',async({page})=>{
    const lp=new LoginPage(page);
    await lp.launchQa2Coral();
    await lp.LoginSuccess('isocoral@yopmail.com','Test@123');
    await page.waitForURL("https://qa2.sports.coral.co.uk/?q=1");
    const expectedurl=page.url();
    const actualurl="https://qa2.sports.coral.co.uk/?q=1";
    if(expectedurl==actualurl){
        console.log("User Logged in Successfully ")
    }
    else {
        console.log( page.url());
        console.log("User not logged into the page")
    }
});