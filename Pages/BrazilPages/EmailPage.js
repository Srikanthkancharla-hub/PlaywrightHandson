const { test, expect } = require('@playwright/test');

class EmailPage {
    constructor(page) {
        this.page = page;
        this.inputOtpCode = "//input[@name='AuthenticationCode']";
        this.resendCodeLink = "//a[normalize-space()='Resend code']";
        this.updateEmailHere = "//a[normalize-space()='Update here']";
        this.msgvalidation = "//span[@class='m2-validation-message']";
        this.maxattemptserrormsg = "//p[normalize-space()='E-mail verification failure']";
        this.otpexpiredlocator="";

    }

    async validOtpInput() {
        await this.page.locator(this.inputOtpCode).click();
        await this.page.locator(this.inputOtpCode).fill(global.OTP);
        console.log('OTP is entered successfully');
        await this.page.waitForURL('https://qa2.www.betboo.bet.br/en/mobileportal/verifyemailid');
        const emailvrfnsuccessurl = await this.page.url();
        console.log(emailvrfnsuccessurl);
        const authentedurl = 'https://qa2.www.betboo.bet.br/en/mobileportal/verifyemailid';
        expect(emailvrfnsuccessurl).toBe(authentedurl);
        console.log('Email verification is successful');

    }

    async invalidOtpInput() {
        await this.page.locator(this.inputOtpCode).click();
        await this.page.locator(this.inputOtpCode).fill('111111');
        const validationmsglocator = await this.page.locator(this.msgvalidation);
        const validationmessage = await validationmsglocator.textContent();
        const invalidmessage = "Invalid Code";
        expect(validationmessage).toBe(invalidmessage);
        console.log("user has entered Invalid OTP Code");

    };
    async maxResendAttempts() {
        //await this.page.locator(this.inputOtpCode).click();
        const resendlinklocator = await this.page.locator(this.resendCodeLink);
        await resendlinklocator.waitFor({ state: 'visible' });
        for (let i = 0; i <= 3; i++) {
            await resendlinklocator.click();
            console.log('Resend code clicked on ' + (i + 1) + 'times');
            await this.page.waitForTimeout(40000);
        }
        const errormsglocator = await this.page.locator(this.maxattemptserrormsg);
        const maxerrormsg = await errormsglocator.textContent();
        console.log(maxerrormsg);
        const maxattemptsmsg = "E-mail verification failure";
        expect(maxerrormsg).toBe(maxattemptsmsg);
        console.log('User Recahed Max Resend attempts');

    };

    async maxInvalidAttempts() {
        for (let i = 1; i<3; i++) {
            await this.page.locator(this.inputOtpCode).click();
            await this.page.locator(this.inputOtpCode).fill('111111');
            const validationmsglocator = await this.page.locator(this.msgvalidation);
            const validationmessage = await validationmsglocator.textContent();
            console.log(validationmessage);
            const invalidmessage = "Invalid Code";
            expect(validationmessage).toBe(invalidmessage);
            console.log('user has entered Invalid OTP Code for ' + i + ' times');
            await this.page.waitForTimeout(5000);
        }
        await this.page.locator(this.inputOtpCode).click();
        await this.page.locator(this.inputOtpCode).fill('222222');
        const errormsglocator = await this.page.locator(this.maxattemptserrormsg);
        const maxerrormsg = await errormsglocator.textContent();
        console.log(maxerrormsg);
        const maxattemptsmsg = "E-mail verification failure";
        expect(maxerrormsg).toBe(maxattemptsmsg);
        console.log('User Recahed Max Invalid attempts');

    };
   async otpExpired(){
        await this.page.locator(this.inputOtpCode).click();
        await this.page.waitForTimeout(360000);
        await this.page.locator(this.inputOtpCode).fill(global.OTP);
        console.log('OTP entered is expied');
        const expiredmsglocator= await this.page.locator(this.msgvalidation);
        const expireddmsg= await expiredmsglocator.textContent();
        const otpexpiredmessage="otp Expired";
        expect(expireddmsg).toBe(otpexpiredmessage);
   };


}
module.exports = EmailPage;