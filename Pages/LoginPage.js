//const {expect} = require ('@playwright/test');
exports.LoginPage= 
class LoginPage{
    constructor(page){
        this.page=page;
        this.E7BwinUrl='https://test.sports.bwin.com/en/sports';
        this.E7PartypokerUrl="https://test.www.partypoker.com/en";
        this.E7ladbrokesurl="https://test.sports.ladbrokes.com/";
        this.E7Coralurl="https://test.sports.coral.co.uk";
        this.E7CoralPortalurl="https://test.myaccount.coral.co.uk/en/mobileportal/contact";
        this.qa2BwinUrl="https://qa2.sports.bwin.com/en/sports";
        this.qa2Ladbrokesurl="https://qa2.sports.ladbrokes.com/";
        this.qa2Coralurl="https://qa2.sports.coral.co.uk/";
        this.qa2Partypokerurl="https://qa2.www.partypoker.com/en";
        this.qa8MjUrl="https://qa81.sports.nj.betmgm.com/en/sports";
        this.qa8WvUrl="https://qa82.sports.wv.betmgm.com/en/sports";
        this.loginbtn="//vn-menu-item-text-content[@data-testid='signin']";
        this.inputEmail="//input[@id='userId']";
        this.inputpassword="//input[@name='password']";
        this.bwinloginsubmit="//button[normalize-space()='Log in']";
        this.ldloginsubmit="//button[normalize-space()='LOG IN']";
        this.qa2franceurl="https://qa2.sports.bwin.fr/en/sports";
        this.qa2frurl="https://qa2.sports.bwin.fr/fr/sports";
        this.forgotpasswordlink="//a[normalize-space()='Forgot your password?']";
        this.forgotpassmail="//input[@type='email']";
        this.forgotpassday="//input[@name='day']";
        this.forgotpassmonth="//input[@name='month']";
        this.forgotpassyear="//input[@name='year']";
        this.forgotpasssubmit="//button[normalize-space()='SUBMIT']";
        this.qa2betboobetbrurl="https://qa2.sports.betboo.bet.br/en/sports"
    
        
    }
    async launchFranceInEnglishUrl(){
        await this.page.goto(this.qa2franceurl);
    }
    async launchFranceInFrenchUrl(){
        await this.page.goto(this.qa2frurl);
    }
    async launchStagingBwinUrl(){
        try{
        await this.page.goto(this.E7BwinUrl);
        await this.page.screenshot({path:'Screenshots/FST/Staging/bzhomepage.png'});
        }catch(error){
            console.log('Home page is not loaded or blank screen showing',error);
            await this.page.screenshot({path:'Screenshots/FST/Staging/bzhomepageissue.png'});
        }
}
async launchStaginPartypokerUrl(){
    try{
    await this.page.goto(this.E7PartypokerUrl);
   await this.page.reload();
   await this.page.screenshot({path:'Screenshots/FST/Staging/pphomepage.png'});
    }catch(error){
        console.log('Home page is not loaded or blank screen showing',error);
        await this.page.screenshot({path:'Screenshots/FST/Staging/pphomepageissue.png'});
    }

}
async launchStagingLadbrokes(){
    try{
    await this.page.goto(this.E7ladbrokesurl);
    await this.page.screenshot({path:'Screenshots/FST/Staging/ldhomepage.png'});
    }catch(error){
        console.log('Home page is not loaded or blank screen showing',error);
        await this.page.screenshot({path:'Screenshots/FST/Staging/ldhomepageissue.png'});
    }
}
async launchStagingCoralurl(){
    try{
    await this.page.goto(this.E7Coralurl);
    await this.page.screenshot({path:'Screenshots/FST/Staging/clhomepage.png'});
    }catch(error){
        console.log('Home page is not loaded or blank screen showing',error);
        await this.page.screenshot({path:'Screenshots/FST/Staging/clhomepageissue.png'});

    }
}
async launchStaginfCoralPortalUrl(){
    try{
    await this.page.goto(this.E7CoralPortalurl);
    await this.page.screenshot({path:'Screenshots/FST/Staging/clhomepage.png'});
    }catch(error){
        console.log('Home page is not loaded or blank screen showing',error);
        await this.page.screenshot({path:'Screenshots/FST/Staging/clhomepageissue.png'});
    }
}
async launchQa2Bwin(){
    try{
    await this.page.goto(this.qa2BwinUrl);
    await this.page.screenshot({path:'Screenshots/FST/QA2/bzhomepage.png'});
    }catch(error){
        console.log('Home page is not loaded or blank screen showing',error);
        await this.page.screenshot({path:'Screenshots/FST/QA2/bzhomepageissue.png'});
    }
}
async launchQa2Partypoker(){
    try{
    await this.page.goto(this.qa2Partypokerurl);
    //await this.page.locator('//*[@id="messages-with-overlay"]/div/vn-content-message/div/span').click();
    await this.page.reload();
    await this.page.screenshot({path:'Screenshots/FST/QA2/pphomepage.png'});
    }catch(error){
        console.log('Home page is not loaded or blank screen showing',error);
        await this.page.screenshot({path:'Screenshots/FST/QA2/pphomepageissue.png'});
    }
}
async launchQa2Ladbrokes(){
    try{
    await this.page.goto(this.qa2Ladbrokesurl);
    await this.page.screenshot({path:'Screenshots/FST/QA2/ldhomepage.png'});
    }catch(error){
        console.log('Home page is not loaded or blank screen showing',error);
        await this.page.screenshot({path:'Screenshots/FST/QA2/ldhomepageissue.png'});
    }
}
async launchQa2Coral(){
    try{
    await this.page.goto(this.qa2Coralurl);
    await this.page.screenshot({path:'Screenshots/FST/QA2/clhomepage.png'});
    }catch(error){
        console.log('Home page is not loaded or blank screen showing',error);
        await this.page.screenshot({path:'Screenshots/FST/QA2/clhomepageissue.png'});
    }
}
async launchQa8MjUrl(){
    await this.page.goto(this.qa8MjUrl);
}
async launchQa8WvUrl(){
    await this.page.goto(this.qa8WvUrl);
}
async LoginSuccess(username,password){
    await this.page.locator(this.loginbtn).click();
    await this.page.locator(this.inputEmail).fill(username);
    await this.page.locator(this.inputpassword).fill(password);
    await this.page.locator(this.bwinloginsubmit).click();
}

async LadbrokesLogin(username,password){
    await this.page.locator(this.loginbtn).click();
    await this.page.locator(this.inputEmail).fill(username);
    await this.page.locator(this.inputpassword).fill(password);
    await this.page.locator(this.ldloginsubmit).click();
}
async launchBetboobetbrurl(){
    await this.page.goto(this.qa2betboobetbrurl);

}
/*async stagingCoralLogin(username,password){
    await this.page.locator(this.loginbtn).click();
    await this.page.locator(this.inputEmail).fill(username);
    await this.page.locator(this.inputpassword).fill(password);
    await this.page.locator(this.bwinloginsubmit).click();
}
async stagingPartypokerLogin(username,password){
    await this.page.locator(this.loginbtn).click();
    await this.page.locator(this.inputEmail).fill(username);
    await this.page.locator(this.inputpassword).fill(password);
    await this.page.locator(this.bwinloginsubmit).click();
}*/

};
//module.exports = { LoginPage };