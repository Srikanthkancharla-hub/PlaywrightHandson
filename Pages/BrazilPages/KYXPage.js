const {test,expect}=require('@playwright/test');
const exp = require('constants');
class KYXPage{
    constructor(page){
        this.page=page;
        this.kyxstartlocator="//button[normalize-space()='Start']";


    }
    async initiateKYX(){
        await this.page.locator(this.kyxstartlocator).click();
        await this.page.locator('x-ds-button').filter({ hasText: 'Start' }).locator('div').click();
        //await this.page.waitForTimeout(180000);
        await this.page.waitForURL('https://qa2.www.betboo.bet.br/en/mobileportal/kyx#step=finish');
        const finishurl=await this.page.url();
        console.log(finishurl);
        const kyxfinishurl='https://qa2.www.betboo.bet.br/en/mobileportal/kyx#step=finish';
        expect(finishurl).toBe(kyxfinishurl);
        console.log('User KYX finsihed page is loading');
     }
     async personalDataScreen(){
        await this.page.waitForURL('https://qa2.www.betboo.bet.br/en/mobileportal/personaldata');
        const prsnldataurl= await this.page.url();
        console.log(prsnldataurl);
        const personaldatascreenurl='https://qa2.www.betboo.bet.br/en/mobileportal/personaldata';
        expect(prsnldataurl).toBe(personaldatascreenurl);
        console.log('User landed on personal data screen');
        await this.page.waitForTimeout(5000);
        await this.page.locator('select[name="gender"]').selectOption('4: ND');
        await this.page.getByText('Registration Access Personal').click();
        await this.page.waitForTimeout(2000);
        await this.page.getByRole('button', { name: 'Next' }).click();
        await this.page.waitForTimeout(4000);

     };

     async addressInfoScreen(){
        //await this.page.waitForURL('');
        await this.page.getByRole('textbox', { name: '-000' }).click();
        await this.page.getByRole('textbox', { name: '-000' }).fill('98');
        await this.page.getByText('Rua Monsenhor Andrade,').click();
        await this.page.getByText('No number').click();
        await this.page.waitForTimeout(4000);
        await this.page.getByRole('button', { name: 'Next' }).click();
        await this.page.waitForTimeout(4000);

     };
     

}
module.exports=KYXPage;