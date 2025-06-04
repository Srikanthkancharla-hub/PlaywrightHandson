const{test,expect}=require('@playwright/test');
import { LoginPage } from '../../Pages/LoginPage';
const TFAScreenPage=require('../../Pages/TFAScreenPage');

test.describe.configure({retries:1,timeout:120000});
test('Get OTP from Mail', async({page})=>{
    const tp= new TFAScreenPage(page);
    const lp= new LoginPage(page);
    await lp.launchStagingBwinUrl();
    await lp.LoginSuccess('bwchky7@yopmail.com','Test@123');
    await tp.navigateToSMSScreen();
    await tp.navigateToYopmail('bwchky7@yopmail.com');

});