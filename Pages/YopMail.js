const { test } = require('@playwright/test');
class YopMail {
    constructor(page) {
        this.page = page;
        this.yopmailurl = "https://yopmail.com/";

    }

    async getOTPFromMail(emailaddress) {
        await this.page.goto(this.yopmailurl);
        await this.page.waitForLoadState('load');
        await this.page.getByRole('link', { name: ' Home' }).click();
        await this.page.getByPlaceholder('Enter your inbox here').click();
        await this.page.getByPlaceholder('Enter your inbox here').fill(emailaddress);
        await this.page.getByPlaceholder('Enter your inbox here').press('Enter');
        await this.page.waitForTimeout(8000);
        await this.page.waitForLoadState('load');
        await this.page.getByRole('button', { name: '' }).click();
        console.log('Refresh button is clicked in inbox');
        const iframeElementHandle = await this.page.waitForSelector('iframe[name="ifinbox"]');
        const iframe = await iframeElementHandle.contentFrame();
        await iframe.locator('button', { hasText: 'Senha Única Segura' }).first().waitFor({ timeout: 90000 });
        const topmail = await iframe.locator('button', { hasText: 'Senha Única Segura' }).first();
        await topmail.click();
        console.log('Clicked  on top mail in inbox');
        const ifmailBodyHandle = await this.page.waitForSelector('iframe[name="ifmail"]');
        const ifmailconetnt = await ifmailBodyHandle.contentFrame();
        //console.log(ifmailconetnt);
        await ifmailconetnt.locator('text=Use a Senha Única:').waitFor({ timeout: 90000 });
        const emailBody = await ifmailconetnt.locator('text=Use a Senha Única:').textContent();
        console.log(emailBody);
        const otpMatch = emailBody.match(/\d{6}/);
        if (otpMatch) {
            const otp = otpMatch[0];
            console.log('OTP:', otp);
            global.OTP=otp;
            await this.page.close();
            return otp;
        } else {
            console.log('OTP not found in the email body.');
            await this.page.close();
            return null;
        }
    }

}
module.exports = YopMail;