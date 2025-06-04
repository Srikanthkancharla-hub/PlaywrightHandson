const {expect} = require ('@playwright/test');
class MFAScreenPage{
    constructor(page){
        this.page=page;
        this.usemaillink="//a[normalize-space()='Use your email.']";
        this.resendcodelink="//a[normalize-space()='Resend code']";
        this.yopmaillink="https://yopmail.com/en/";
        this.mailinputlink="//input[@id='login']";
        this.refreshbutton="//button[@id='refresh']";


    }
    async navigateToSMSScreen(){
        await this.page.locator(this.usemaillink).click();
    }
    async navigateToYopmail(inputmailid){
        await this.page.goto(this.yopmaillink);
        await this.page.locator(this.mailinputlink).fill(inputmailid);
        await this.page.locator(this.mailinputlink).press('Enter');
        await this.page.locator(this.refreshbutton).click();
    }

};
module.exports=MFAScreenPage;