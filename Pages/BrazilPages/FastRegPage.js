const {test,expect}=require('@playwright/test');
class FastRegPage{
    constructor(page){
        this.page=page;
        this.registerbtn = "//vn-menu-item-text-content[@data-testid='registerbutton']";
        this.Password = 'Test@123';
        this.inputmail = "//input[@name='emailaddress']";
        this.registrationSubmit = "//button[@id='submit']";
        this.inputpassword = "//input[@id='focusPassword']";
        this.existingmailid="coretest2511@yopmail.com";
        this.validationmsglocator="//span[@class='m2-validation-message']";
        this.Gotologinlink="//a[normalize-space()='Go to login']";
        this.loginmailid="//input[@id='userId']";
        this.loginpassword="//input[@name='password']";
        this.loginsubmit="//button[normalize-space()='Log in']";

    }
    
async betboofastregsuccess(emailaddress){
    await this.page.locator(this.registerbtn).click();
        await this.page.waitForLoadState('load');
        await this.page.locator(this.inputmail).click();
        await this.page.locator(this.inputmail).fill(emailaddress);
        console.log("Email is used for reg is :" + emailaddress);
        await this.page.locator(this.inputpassword).click();
        await this.page.locator(this.inputpassword).fill(this.Password);
        await this.page.locator("//label[@id='grprTacTrack']").check();
        await this.page.locator("//label[@id='privacyNoticeLink']").check();
        await this.page.locator(this.registrationSubmit).click();
        await this.page.waitForLoadState('load');   
};

async duplicateEmailCheck(){
        await this.page.locator(this.registerbtn).click();
        await this.page.waitForLoadState('load');
        await this.page.locator(this.inputmail).click();
        await this.page.locator(this.inputmail).fill(this.existingmailid);
        const existingmaillocator= await this.page.locator(this.validationmsglocator);
        const existingmailerrormessage= await existingmaillocator.textContent();
        console.log(existingmailerrormessage);
        const existingmailmsg='\"This email address is already registered.\"';
        expect(existingmailerrormessage.trim()).toBe(existingmailmsg.trim());

};

async loginFromRegDuplicateCheck(){
       await this.page.locator(this.Gotologinlink).click();
       await this.page.locator(this.Gotologinlink).click();
       console.log("user clicked on Go to Login");
       await this.page.waitForURL("https://qa2.www.betboo.bet.br/en/labelhost/login");
       await this.page.locator(this.loginmailid).fill(this.existingmailid);
       await this.page.locator(this.loginpassword).fill(this.Password);
       await this.page.locator(this.loginsubmit).click();
};

}
module.exports=FastRegPage;