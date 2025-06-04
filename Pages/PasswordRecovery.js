const {expect} = require ('@playwright/test');
class PasswordRecovery{
    constructor(page){
        this.page=page;
        this.forgotpasswordlink="//a[normalize-space()='Forgot your password?']";
        this.forgotpassmail="//input[@type='email']";
        this.forgotpassday="//input[@name='day']";
        this.forgotpassmonth="//input[@name='month']";
        this.forgotpassyear="//input[@name='year']";
        this.forgotpasssubmit="//button[normalize-space()='SUBMIT']";
        this.usemail="//a[normalize-space()='Use Email']";
    }

    async passwordRecoveryEmailDObCheck(username,day,month,year){
        await this.page.locator("//vn-menu-item-text-content[@data-testid='signin']").click();
        await this.page.locator(this.forgotpasswordlink).click();
        await this.page.locator(this.forgotpassmail).fill(username);
        await this.page.locator(this.forgotpassday).fill(day);
        await this.page.locator(this.forgotpassmonth).fill(month);
        await this.page.locator(this.forgotpassyear).fill(year);
        await this.page.locator(this.forgotpasssubmit).click();
    }
    async clickOnEmailLink(){
        await this.page.locator(this.usemail).click();

    }

};
module.exports=PasswordRecovery;