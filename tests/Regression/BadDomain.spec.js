const {test,expect}=require('@playwright/test');
import { LoginPage } from '../../Pages/LoginPage';
const RegistrationPage=require('../../Pages/RegistrationPage');

const fs = require('fs');
const path = require('path');

const inputFilePath = path.join(
    'C:',
    'Users',
    'srikanth.kancharla',
    'OneDrive - Entain Group',
    'Desktop',
    'Testing',
    'TestData',
    'BadDomainMailV1.txt'
);


const fileContent = fs.readFileSync(inputFilePath, 'utf-8');
const emailID = fileContent.split('\n').map(line => line.trim()).filter(line => line.length > 0);
console.log(emailID.length)

test.describe.configure({retries:1, timeout:120000});
test('Verify BadDomain email check from UI',async({page})=>{
    
    for (let i = 0; i < emailID.length; i++) {
        console.log(emailID[i]);
        const rp=new RegistrationPage(page);
        const lp= new LoginPage(page);
        await lp.launchBetboobetbrurl();
        await rp.checkEmailAvailability(emailID[i]);
        
    };
}
);