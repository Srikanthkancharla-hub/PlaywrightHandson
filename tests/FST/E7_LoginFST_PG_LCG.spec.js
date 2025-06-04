const {test,expect}=require('@playwright/test');
import { LoginPage } from '../../Pages/LoginPage';
const HomePage=require('../../Pages/HomePage');
import {screenshot} from '../../Utils/screenshot';

test.describe.configure({retries:1,timeout:180000});
test('Staging : Bwin Login Success Test',async({page})=>{
    const loginpage= new LoginPage(page);
    const hp= new HomePage(page);
    await loginpage.launchStagingBwinUrl();
    await loginpage.LoginSuccess('bzfstcore495306@yopmail.com','Test@123');
    await page.waitForURL("https://test.sports.bwin.com/en/sports?q=1",{waitUntil:'load'});
    const expectedurl=page.url();
    console.log("Expected url is : " +expectedurl);
    const actualurl="https://test.sports.bwin.com/en/sports?q=1";
    if(expectedurl==actualurl){
        console.log("User Logged in Successfully ")
    }
    else {
        console.log( page.url());
        console.log("User not logged into the page")
    };
   // await hp.clickOnAvatar();
   const now= new Date();
    const localtimestamp = now.toLocaleString().replace(/[^\w\s]/gi, '_');
    console.log(localtimestamp);
   await page.screenshot({path:`Screenshots/FST/Staging/bzloginsucess${localtimestamp}.png`,fullPage:true});
    
});

test.describe.configure({retries:1,timeout:180000});
test('Staging : Ladbrokes Login Successful Test',async({page})=>{
    const lp= new LoginPage(page);
    await lp.launchStagingLadbrokes();
    await lp.LadbrokesLogin('ishaaere@yopmail.com','Test@123');
    await page.waitForURL("https://test.sports.ladbrokes.com/?q=1",{waitUntil:'load'});
    const expectedurl=page.url();
    console.log("Expected url is :"+expectedurl);
    const actualurl ="https://test.sports.ladbrokes.com/?q=1";
    if(actualurl==expectedurl){
        console.log("Login is Successful");
    }
    else{
        console.log(page.url());
        console.log("User not Logged in");
    }
    const now= new Date();
    const localtimestamp = now.toLocaleString().replace(/[^\w\s]/gi, '_');
    console.log(localtimestamp);
   await page.screenshot({path:`Screenshots/FST/Staging/ldloginsucess${localtimestamp}.png`});

});
test.describe.configure({retries:1,timeout:180000});
test('Staging: Coral Login Successful Test',async({page})=>{
    const lp= new LoginPage(page);
    await lp.launchStagingCoralurl();
    //await page.waitForLoadState("load",{timeout:5000});
    await lp.LoginSuccess('isoe7@yopmail.com','Test@123');
    await page.waitForURL("https://test.sports.coral.co.uk/?q=1",{waitUntil:'load'});
    const expectedurl=page.url();
    const actualurl="https://test.sports.coral.co.uk/?q=1";
    if(expectedurl==actualurl){
        console.log("User logged in successfully");
    }
    else {
        console.log (page.url());
        console.log( " User not logged in");
    }
    const now= new Date();
    const localtimestamp = now.toLocaleString().replace(/[^\w\s]/gi, '_');
    console.log(localtimestamp);
   await page.screenshot({path:`Screenshots/FST/Staging/clloginsucess${localtimestamp}.png`});
});
test.describe.configure({retries:1,timeout:180000});
test('Staging: Partypoker Login Successful Test',async({page})=>{
    const lp=new LoginPage(page);
    lp.launchStaginPartypokerUrl();
    lp.LoginSuccess('ishaalslpb1@yopmail.com','Test@123');
    await page.waitForURL("https://test.www.partypoker.com/en?q=1");
    const expectedurl=page.url();
    const actualurl="https://test.www.partypoker.com/en?q=1";
    if(actualurl==expectedurl){
        console.log("User Logged in Successfully");
    }
    else{
        console.log(page.url());
        console.log("User not logged in");
    }
    const now= new Date();
    const localtimestamp = now.toLocaleString().replace(/[^\w\s]/gi, '_');
    console.log(localtimestamp);
   await page.screenshot({path:`Screenshots/FST/Staging/pploginsucess${localtimestamp}.png`});
});