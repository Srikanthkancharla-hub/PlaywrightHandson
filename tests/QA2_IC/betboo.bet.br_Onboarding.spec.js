const {test,expect}=require('@playwright/test');
const { defineConfig, devices } = require('@playwright/test');
import { LoginPage } from '../../Pages/LoginPage';
const RegistrationPage=require('../../Pages/RegistrationPage');
const YopMail=require('../../Pages/YopMail');
const EmailPage=require('../../Pages/BrazilPages/EmailPage');
const KYXPage=require('../../Pages/BrazilPages/KYXPage');
const FastRegPage=require('../../Pages/BrazilPages/FastRegPage');

test.describe.configure({retries:1,timeout:120000});
test("Verify betboo.bet.br partial registration is successful" , async({browser})=>{
    const context= await browser.newContext();
    const page=await context.newPage();
    const lp=new LoginPage(page);
    const rp= new RegistrationPage(page);
    const frp=new FastRegPage(page);
    await lp.launchBetboobetbrurl();
    await rp.generateRandomValues();
    await frp.betboofastregsuccess(rp.betboomail);
    await browser.close();
});
test("Verify Email Verification  is successful" , async({browser})=>{
    const context= await browser.newContext();
    const page=await context.newPage();
    const lp=new LoginPage(page);
    const rp= new RegistrationPage(page);
    const frp=new FastRegPage(page);
    await lp.launchBetboobetbrurl();
    await rp.generateRandomValues();
    await frp.betboofastregsuccess(rp.betboomail);
    const page1= await context.newPage();
    const ym= new YopMail(page1);
    await ym.getOTPFromMail(rp.betboomail);
    await page.bringToFront();
    const ep= new EmailPage(page);
    await ep.validOtpInput();
    await browser.close();
});

test("Verify Invalid OTP Error message in Email verification screen" , async({page})=>{
    const rp= new RegistrationPage(page);
    const lp= new LoginPage(page);
    const ep= new EmailPage(page);
    const frp= new FastRegPage(page);
    await lp.launchBetboobetbrurl();
    await rp.generateRandomValues();
    await frp.betboofastregsuccess(rp.betboomail);
    await ep.invalidOtpInput();
    await page.close();
});

test.only("Verify user Registration is success till KYX", async({browser})=>{
    test.setTimeout(180000);
    const context= await browser.newContext();
    const page=await context.newPage();
    const lp=new LoginPage(page);
    const rp= new RegistrationPage(page);
    const frp= new FastRegPage(page);
    await lp.launchBetboobetbrurl();
    await rp.generateRandomValues();
    await frp.betboofastregsuccess(rp.betboomail);
    const page1= await context.newPage();
    const ym= new YopMail(page1);
    await ym.getOTPFromMail(rp.betboomail);
    await page.bringToFront();
    const ep= new EmailPage(page);
    await ep.validOtpInput();
    const kp=new KYXPage(page);
    await kp.initiateKYX();
    await kp.personalDataScreen();
    await kp.addressInfoScreen();
    await browser.close();
});

test('Verify Max Resend attempts in Email Verification', async({page})=>{
    test.setTimeout(300000);
    const rp= new RegistrationPage(page);
    const lp= new LoginPage(page);
    const ep= new EmailPage(page);
    const frp= new FastRegPage(page);
    await lp.launchBetboobetbrurl();
    await rp.generateRandomValues();
    await frp.betboofastregsuccess(rp.betboomail);
    await ep.maxResendAttempts();
    await page.close();

});

test('Verify Max Invalid attempts in Email Verification', async({page})=>{
    test.setTimeout(500000);
    const rp= new RegistrationPage(page);
    const lp= new LoginPage(page);
    const ep= new EmailPage(page);
    const frp= new FastRegPage(page);
    await lp.launchBetboobetbrurl();
    await rp.generateRandomValues();
    await frp.betboofastregsuccess(rp.betboomail);
    await ep.maxInvalidAttempts();
    await page.close();

});

test("Verify User has given Expired OTP", async({browser})=>{
    test.setTimeout(360000);
    const context= await browser.newContext();
    const page=await context.newPage();
    const lp=new LoginPage(page);
    const rp= new RegistrationPage(page);
    const frp=new FastRegPage(page);
    await lp.launchBetboobetbrurl();
    await rp.generateRandomValues();
    await frp.betboofastregsuccess(rp.betboomail);
    const page1= await context.newPage();
    const ym= new YopMail(page1);
    await ym.getOTPFromMail(rp.betboomail);
    await page.bringToFront();
    const ep= new EmailPage(page);
    await ep.otpExpired();
    await browser.close();
});
test("Verify Duplicate Email Check from Registration" , async({page})=>{
    const lp=new LoginPage(page);
    const rp= new RegistrationPage(page);
    const frp=new FastRegPage(page);
    await lp.launchBetboobetbrurl();
    await frp.duplicateEmailCheck();
});
test('Verify Login From duplicate Email check in Registration', async({page})=>{
    test.setTimeout(300000);
    const lp=new LoginPage(page);
    const rp= new RegistrationPage(page);
    const frp=new FastRegPage(page);
    await lp.launchBetboobetbrurl();
    await frp.duplicateEmailCheck();
    await frp.loginFromRegDuplicateCheck();
});