//const {expect}=require('@playwright/test');
const { faker } = require('@faker-js/faker');
const { compileFunction } = require('vm');
//exports.RegistrationPage=
class RegistrationPage {
    constructor(page) {
        this.page = page;
        this.registerbtn = "//vn-menu-item-text-content[@data-testid='registerbutton']";
        this.ppregisterbtn = "//vn-menu-item-text-content[@data-testid='registerbuttonprominent']";
        this.ppusername = "//input[@formcontrolname='username']";
        this.invalidmail = "//div[@id='emailaddress']//span[@class='m2-validation-message']";
        //this.bwinMail='';
        //this.x=0;
        this.Password = 'Test@123';
        this.inputmail = "//input[@name='emailaddress']";
        this.continuebtn = "//div[@class='ui-tab step-one ui-widget-padding current']//button[@id='continue']";
        this.ppcontinuebtn = "(//button[@id='continue'])[1]";
        this.inputpassword = "//input[@id='focusPassword']";
        this.firstName = "//input[@name='firstname']";
        this.lastName = "//input[@name='lastname']";
        this.dobday = "//input[@name='day']";
        this.dobmonth = "//input[@name='month']";
        this.dobyear = "//input[@name='year']";
        this.mobNumber = "//input[@name='mobilenumber']";
        this.manualaddresslink = "//a[normalize-space()='Enter address manually']";
        this.address1 = "//input[@id='address']";
        this.addresscity = "//input[@name='addresscity']";
        this.addresszip = "//input[@name='addresszip']";
        this.preferencecheck = "//input[@class='custom-control-input']";
        this.registrationSubmit = "//button[@id='submit']";
        this.frbirthcountry = "//select[@id='birthcountry']";
        this.frbirthstate = "//select[@id='birthstate']";
        this.frbirthcity = "//select[@id='birthcity']";
        this.selectalloptions = "Select all options";
        this.tncaccept = "#grprTacTrack";
        this.privacyaccept = "//div[@class='form-element no-validation-icon']//label[@id='privacyNoticeLink']";



    }
    async generateRandomValues() {
        this.x = Math.floor(100000 + Math.random() * 900000);
        console.log(this.x);
        this.bwinMail = 'corefst' + this.x + '@yopmail.com';
        this.betboomail = 'betboocoretest' + this.x + '@yopmail.com';
        this.ppMail = 'corefst' + this.x + '@yopmail.com';
        //this.ldmail='ldfst'+this.x+'@yopmail.com';
        //console.log(this.bwinMail);
        this.partyusername = 'user' + this.x;
        this.fName = faker.person.firstName();
        //console.log(this.fName);
        this.lname = faker.person.lastName();
        //console.log(this.lname);
        this.day = Math.floor(Math.random() * 30) + 1;
        //console.log(this.day);
        this.month = Math.floor(Math.random() * 12) + 1;
        //console.log(this.month);
        this.year = Math.floor(Math.random() * (2000 - 1990 + 1)) + 1990;
        //console.log(this.year);
        this.mobileNumber = '7855' + this.x;
        this.franceMobileNumber = '785' + this.x;
        //console.log(this.mobileNumber);
        this.Houseaddress = faker.location.streetAddress();
        //console.log(this.Houseaddress);
        this.usercity = faker.location.city();
        //console.log(this.usercity);
        this.zip = faker.location.zipCode();
        //console.log(this.zip);
        this.zipcode = 'A' + this.x;
        //console.log(this.zipcode);

    }

    async registrationSuccess() {
        await this.page.locator(this.registerbtn).click();
        await this.page.waitForLoadState('load');
        await this.page.locator(this.inputmail).click();
        await this.page.locator(this.inputmail).fill(this.bwinMail);
        const continuetext = await this.page.locator(this.continuebtn).textContent();
        console.log(continuetext);
        const continuebutton = await this.page.locator(this.continuebtn);
        const btnvisible = await continuebutton.isVisible();
        console.log(typeof btnvisible);
        if (btnvisible) {
            await this.page.locator(this.continuebtn).click();
            console.log('Clicked on continue button');
            const passwordfield = await this.page.locator(this.inputpassword);
            const passwordfieldmsg = await passwordfield.isVisible();
            console.log('password field is visible:' + passwordfieldmsg);
            if (passwordfieldmsg) {
                await this.page.locator(this.inputpassword).fill(this.Password);
                console.log('Password entered')
            }
            else {
                console.log('Password field is not visbile');
                await this.page.locator(this.continuebtn).click();
                await this.page.locator(this.inputpassword).fill(this.Password);
            }
        }
        //await this.page.locator(this.continuebtn).click();
        await this.page.locator(this.continuebtn).click();
        await this.page.locator(this.firstName).fill(this.fName);
        await this.page.locator(this.lastName).fill(this.lname);
        await this.page.locator(this.lastName).press('Enter');
        await this.page.locator(this.dobday).fill((this.day).toString());
        await this.page.locator(this.dobmonth).fill((this.month).toString());
        await this.page.locator(this.dobyear).fill((this.year).toString());
        await this.page.locator(this.dobyear).press('Enter');
        await this.page.locator(this.mobNumber).fill((this.mobileNumber).toString());
        //await this.page.locator(this.mobNumber).press('Enter');
        await this.page.locator(this.continuebtn).click();
        await this.page.locator(this.manualaddresslink).click();
        await this.page.locator(this.address1).fill(this.Houseaddress);
        await this.page.locator(this.addresscity).fill(this.usercity);
        await this.page.locator(this.addresszip).fill(this.zipcode);
        await this.page.locator(this.continuebtn).click();
        //await this.page.locator(this.addresszip).press('Enter');
        await this.page.waitForTimeout(2000);
        await this.page.locator(this.preferencecheck).check();
        await this.page.locator(this.continuebtn).click();
        await this.page.locator(this.registrationSubmit).click();
        await this.page.waitForTimeout(10000);
        //await this.page.screenshot({path:'Screenshots/FST/BZRegistaionsuccess.png'});
       const fundsregulationurl= await this.page.url();
        console.log(fundsregulationurl);
    }
    async clickOnPpRegister() {
        await this.page.locator(this.ppregisterbtn).click();
        await this.page.waitForLoadState('load');
    }
    async clickOnLCGRegister() {
        try {
            await this.page.locator(this.registerbtn).click();
            await this.page.waitForLoadState('load');
        }
        catch (error) {
            console.log('page is not loading. Showing blank screen');

        }

    }

    async ppRegistrationSuccess() {
        //await this.page.locator(this.ppregisterbtn).click();
        //await this.page.locator(this.inputmail).click();
        await this.page.locator(this.inputmail).fill(this.ppMail);
        await this.page.locator(this.ppusername).fill(this.partyusername);
        await this.page.locator(this.inputpassword).fill(this.Password);
        const continuebtn = await this.page.getByRole('button', { name: 'CONTINUE' });
        console.log(await continuebtn.isVisible());
        await continuebtn.click();
        let count = 0;
        const fname= await this.page.locator(this.firstName);
        for (let i = 0; i <= count; i++) {
            if (await fname.isVisible()) {
                console.log('Fname is visible to enter first name');
                break;
            }
            else {
                console.log('Fname is not visible');
                await this.page.locator(this.inputmail).fill(this.ppMail);
                await this.page.locator(this.ppusername).fill(this.partyusername);
                await this.page.locator(this.inputpassword).fill(this.Password);
                const continuebtn = await this.page.getByRole('button', { name: 'CONTINUE' });
                console.log('continue button is visible :' ,await continuebtn.isVisible());
                await continuebtn.click();
            }
            count++;
            console.log(`Count is increased to ${count}`);
        }
         await this.page.locator(this.firstName).fill(this.fName);
            await this.page.locator(this.lastName).fill(this.lname);
            //await this.page.locator(this.lastName).press('Enter');
            await this.page.locator(this.dobday).fill((this.day).toString());
            await this.page.locator(this.dobmonth).fill((this.month).toString());
            await this.page.locator(this.dobyear).fill((this.year).toString());
            await this.page.locator(this.dobyear).press('Enter');
        //await this.page.waitForTimeout(3000);
        //const fname = await this.page.locator(this.firstName);
        //await this.page.locator(this.ppcontinuebtn).click();
        await this.page.locator(this.mobNumber).fill((this.mobileNumber).toString());
        await this.page.locator(this.manualaddresslink).click();
        await this.page.locator(this.address1).fill(this.Houseaddress);
        await this.page.locator(this.addresscity).fill(this.usercity);
        await this.page.locator(this.addresszip).fill(this.zipcode);
        await this.page.waitForTimeout(2000);
        await this.page.locator(this.preferencecheck).check();
        await this.page.locator(this.registrationSubmit).click();
        await this.page.waitForTimeout(4000);
        //await this.page.screenshot({ path: 'Screenshots/FST/Registaionsuccess.png' });

    }
    async clRegistrationSuccess() {
        await this.page.locator(this.inputmail).fill(this.ppMail);
        await this.page.locator(this.ppusername).fill(this.partyusername);
        await this.page.locator(this.inputpassword).fill(this.Password);
        const continuebtn = await this.page.getByRole('button', { name: 'CONTINUE' });
        console.log(await continuebtn.isVisible());
        await continuebtn.click();
        const fnamefield = await this.page.locator(this.firstName);
        console.log('fname field is  visible :', await fnamefield.isVisible());
        let count = 0;
        for (let i = 0; i <= count; i++) {
            if (await fnamefield.isVisible()) {
                console.log('Fname is visible');
                break;
                //await fnamefield.fill(this.fName);
            }
            else {
                console.log('Fname is not visible');
                await continuebtn.click();
            }
            count++;
        }
        await this.page.locator(this.firstName).fill(this.fName);
        await this.page.locator(this.lastName).fill(this.lname);
        //await this.page.locator(this.lastName).press('Enter');
        await this.page.locator(this.dobday).fill((this.day).toString());
        await this.page.locator(this.dobmonth).fill((this.month).toString());
        await this.page.locator(this.dobyear).fill((this.year).toString());
        await this.page.locator(this.dobyear).press('Enter');
        //await this.page.locator(this.ppcontinuebtn).click();
        await this.page.locator(this.mobNumber).fill((this.mobileNumber).toString());
        await this.page.locator(this.manualaddresslink).click();
        await this.page.locator(this.address1).fill(this.Houseaddress);
        await this.page.locator(this.addresscity).fill(this.usercity);
        await this.page.locator(this.addresszip).fill(this.zipcode);
        await this.page.waitForTimeout(2000);
        await this.page.locator(this.preferencecheck).check();
        await this.page.locator(this.registrationSubmit).click();
        await this.page.waitForTimeout(4000);
        //await this.page.screenshot({ path: 'Screenshots/FST/Registaionsuccess.png' });

    }
    async frRegistrationSuccess1() {
        await this.page.locator(this.registerbtn).click();
        await this.page.locator(this.inputmail).fill(this.bwinMail);
        await this.page.locator(this.continuebtn).click();
        await this.page.locator(this.ppusername).fill(this.partyusername);
        await this.page.locator(this.continuebtn).click();
        await this.page.locator(this.inputpassword).fill(this.Password);
        await this.page.locator(this.continuebtn).click();
        await this.page.locator(this.firstName).fill(this.fName);
        await this.page.locator(this.lastName).fill(this.lname);
        await this.page.locator(this.lastName).press('Enter');
        await this.page.locator(this.dobday).fill((this.day).toString());
        await this.page.locator(this.dobmonth).fill((this.month).toString());
        await this.page.locator(this.dobyear).fill((this.year).toString());
        await this.page.locator(this.dobyear).press('Enter');
        //await this.page.locator(this.frbirthcountry,{value:'France'});
        await this.page.locator(this.frbirthstate).selectOption('AISNE');
        await this.page.locator(this.frbirthcity).selectOption('ACHERY');
        await this.page.getByRole('button', { name: 'Next' }).click();
        await this.page.locator(this.address1).fill(this.Houseaddress);
        await this.page.locator(this.addresscity).fill(this.usercity);
    }

    async franceZipCode(postalcode) {
        await this.page.locator(this.addresszip).fill(postalcode);
    }
    async frRegistrationSuccess2() {
        await this.page.getByRole('button', { name: 'Next' }).click();
        await this.page.locator(this.mobNumber).fill(this.franceMobileNumber);
        await this.page.getByRole('button', { name: 'Next' }).click();
        await this.page.getByText(this.selectalloptions).click();
        await this.page.getByRole('button', { name: 'Next' }).click();
        await this.page.locator(this.tncaccept).click();
        await this.page.locator(this.privacyaccept).click();
        await this.page.locator(this.registrationSubmit).click();

    }

    async betboofastreg() {
        await this.page.locator(this.registerbtn).click();
        await this.page.waitForLoadState('load');
        await this.page.locator(this.inputmail).click();
        await this.page.locator(this.inputmail).fill(this.betboomail);
        console.log("Email is used for reg is :" + this.betboomail);
        await this.page.locator(this.inputpassword).click();
        await this.page.locator(this.inputpassword).fill(this.Password);
        await this.page.locator("//label[@id='grprTacTrack']").check();
        await this.page.locator("//label[@id='privacyNoticeLink']").check();
        await this.page.locator(this.registrationSubmit).click();
        await this.page.waitForLoadState('load');

    }

    async checkEmailAvailability(Emailid) {
        await this.page.locator(this.registerbtn).click();
        await this.page.waitForLoadState('load');
        //await this.page.locator(this.inputmail).click();
        await this.page.locator(this.inputmail).fill(Emailid);
        await this.page.locator(this.inputmail).press('Enter');
        const errormsg = await this.page.locator(this.invalidmail);
        const msgvisible = await errormsg.isVisible();
        console.log(msgvisible);
        if (msgvisible == true) {
            console.log(" Entered to loop ");
            //await errormsg.waitFor({ state: 'visible', timeout: 9000 });
            const errmsg = await errormsg.textContent();
            console.log(errmsg);
            const actualerrormsg = "The value you entered was incorrect. Please recheck your data and try again.";
            if (errmsg == actualerrormsg) {
                console.log("Email is badDomain Email :" + Emailid);
            }
            else {
                console.log("Email is not Bad Domain Email" + Emailid);

            }


        } else {
            console.log("Error msg not there. Email allowed " + Emailid);
        }

    };
    async ldRegistrationSuccess(){
        await this.page.locator(this.inputmail).fill(this.ppMail);
        await this.page.locator(this.ppusername).fill(this.partyusername);
        await this.page.locator(this.inputpassword).fill(this.Password);
        const continuebtn= await this.page.getByRole('button', { name: 'CONTINUE' });
        console.log(await continuebtn.isVisible());
        await continuebtn.click();
        const fnamefield= await this.page.locator(this.firstName);
        console.log('fname field is  visible :', await fnamefield.isVisible());
        await this.page.locator(this.firstName).fill(this.fName);
        await this.page.locator(this.lastName).fill(this.lname);
        //await this.page.locator(this.lastName).press('Enter');
        await this.page.locator(this.dobday).fill((this.day).toString());
        await this.page.locator(this.dobmonth).fill((this.month).toString());
        await this.page.locator(this.dobyear).fill((this.year).toString());
        await this.page.locator(this.dobyear).press('Enter');
        //await this.page.locator(this.ppcontinuebtn).click();
        await this.page.locator(this.mobNumber).fill((this.mobileNumber).toString());
        await this.page.locator(this.manualaddresslink).click();
        await this.page.locator(this.address1).fill(this.Houseaddress);
        await this.page.locator(this.addresscity).fill(this.usercity);
        await this.page.locator(this.addresszip).fill(this.zipcode);
        await this.page.waitForTimeout(2000);
        await this.page.locator(this.preferencecheck).check();
        await this.page.locator(this.registrationSubmit).click();
        await this.page.waitForTimeout(4000);
        //await this.page.screenshot({path:'Screenshots/FST/Registaionsuccess.png'});

    }





}
module.exports = RegistrationPage;