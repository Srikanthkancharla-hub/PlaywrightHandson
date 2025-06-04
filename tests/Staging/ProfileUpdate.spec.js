const {test,expect}=require('@playwright/test');
//const RegistrationPage= require('../../Pages/RegistrationPage');
const HomePage=require('../../Pages/HomePage');
import { LoginPage } from '../../Pages/LoginPage';

test.describe.configure({retries:1,timeout:120000});
test('BWIN Logout Test',async({page})=>{
    const lp=new LoginPage(page);
    const hp=new HomePage(page);
    await lp.launchStagingBwinUrl();
    await lp.LoginSuccess('ishaa8932@yopmail.com','Test@123');
    await page.waitForTimeout(6000);
   // await page.setViewportSize({width:1000,height:600});
    await hp.clickOnAvatar();
    //await page.waitForURL("https://test.www.bwin.com/en/mobileportal/details");
    await hp.accountDetailsUpdate();

    
})