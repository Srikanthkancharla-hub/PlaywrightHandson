const{test,expect}=require('@playwright/test');
const RegistrationPage = require('./RegistrationPage');
class HomePage{
    constructor(page){
        this.page=page;
        this.depositbtn="//vn-menu-item-text-content[@data-testid='deposit']";
        this.avataricon="//div[@class='avatar avatar-bg avatar-no-bg']";
        this.avatarclose="//vn-am-header-close[@class='ng-star-inserted']";
        this.accountdetailslink="//span[normalize-space()='My Account Details']";
        this.logout="//vn-menu-item-text-content[@data-testid='logout']";
        this.mobileupdate="//input[@name='mobilenumber']";
        this.savebutton="//button[@id='submit']";


    }
    
    async clickOnAvatar(){
        await this.page.locator(this.avataricon).click();
        await this.page.keyboard.press('ArrowDown');

    }
    async userlogout(){
        
        
        await this.page.locator(this.logout).click();
    }
    async accountDetailsUpdate(){
        await this.page.locator(this.accountdetailslink).click();
        await this.page.locator(this.mobileupdate).fill('7859900123');
        await this.page.locator(this.savebutton).click();

    }

}

module.exports=HomePage;