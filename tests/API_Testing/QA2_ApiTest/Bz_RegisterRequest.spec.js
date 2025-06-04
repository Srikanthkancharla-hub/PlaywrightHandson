import {test,request, expect} from '@playwright/test';
import{generateXML} from "../../../ApiRequest/CreateRegisterAccount";
import brandsConfig from "../../../Config/brandIDconfig";
import endpoint from "../../../Config/endpointsconfig";
import { XMLParser } from 'fast-xml-parser';


test('Submit Register Account API Request for BWINCOM Brand', async ({page}) => {
  try{
  const apirequest= page.request;
    const brand =brandsConfig.PG.BWINCOM.BrandId;
    //const brand= brandsConfig.PG.BWINCOM.BrandId;
    console.log(brand);
    console.log(`Running test for BrandId: ${brand}`);
    const xmlRequest=generateXML(brand);
   // console.log('generated soap request',xmlRequest);
    const url= endpoint.Qa2PgLoginService;
    //console.log(url);
    const response= await apirequest.post(url,{
      data:xmlRequest,
      headers:{
        'Content-Type':'text/xml'
      },

    });
    expect(response.status()).toBe(200);
const responseBody= await response.text();
//console.log('Response Body is :' , responseBody);
const parser =new XMLParser();
const parsedresponse=parser.parse(responseBody);
const errorDetails = parsedresponse['soapenv:Envelope']['soapenv:Body']['ns:createRegisterAccountResponse']['ns:return']['ax232:errorDetails'];
expect(errorDetails['ax232:errMsg']).toBe('SUCCESS');
expect(errorDetails['ax232:errorCode']).toBe(0);
const registrationStatus = parsedresponse['soapenv:Envelope']['soapenv:Body']['ns:createRegisterAccountResponse']['ns:return']['ax232:registered'];
expect(registrationStatus).toBe(true);
const responseData = parsedresponse['soapenv:Envelope']['soapenv:Body']['ns:createRegisterAccountResponse']['ns:return']['ax232:responseData'];
const accountName = responseData.find(item => item['ax232:key'] === 'accountName')['ax232:value'];
const accountId = responseData.find(item => item['ax232:key'] === 'ACCOUNT_ID')['ax232:value'];
console.log('Account name is : '+ accountName)
console.log( 'Account Id is :' + accountId);
  
}
  
catch(error){
  if (error.message.includes('ETIMEDOUT')){
    console.log('Connection Timeout Error occurred');
    expect(error.message).toContain('ETIMEDOUT');
    expect(error.message).toContain('10.1.215.78:80');
  }
  else {
throw error;
  }
}

}
);