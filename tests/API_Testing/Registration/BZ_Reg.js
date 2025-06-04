const { test, expect } = require('@playwright/test');

test('SOAP API Test for Account Registration', async ({ request }) => {
    const randomInt = Math.floor(Math.random() * 10000);
    const randomCity = "SampleCity"; // Replace with dynamic generation if needed
    const randomCountry = "SampleCountry"; // Replace with dynamic generation if needed
    const randomFirstName = "John"; // Replace with dynamic generation if needed
    const randomLastName = "Doe"; // Replace with dynamic generation if needed
    const randomDOB = "1990-01-01"; // Replace with dynamic generation if needed
    const bmail = `test${randomInt}@example.com`; // Dynamic email generation
    const mobileNumber = "1234567890"; // Replace with dynamic generation if needed

    const soapRequest = `
<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:bwin="http://bwin.service.userprofile.mds.services.partygaming.com" xmlns:xsd="http://b2b.userprofile.mds.services.partygaming.com/xsd" xmlns:xsd1="http://api.userprofile.mds.services.partygaming.com/xsd">
   <soapenv:Header/>
   <soapenv:Body>
      <bwin:createRegisterAccount>
         <bwin:registerAccountRequest>
            <xsd:accountCurrency>GBP</xsd:accountCurrency>
            <xsd:accountName>bzfst${randomInt}</xsd:accountName>
            <xsd:address>123,ewhwqehqw</xsd:address>
            <xsd:address2>xfdsv</xsd:address2>
            <xsd:birthCity>${randomCity}</xsd:birthCity>
            <xsd:birthCountry>${randomCountry}</xsd:birthCountry>
            <xsd:birthState>${randomCity}</xsd:birthState>
            <xsd:bonusCode/>
            <xsd:bonusTncAccpeted>true</xsd:bonusTncAccpeted>
            <xsd:brandId>BWINCOM</xsd:brandId>
            <xsd:channelId>WC</xsd:channelId>
            <xsd:city>Birmingham</xsd:city>
            <xsd:country>GB</xsd:country>
            <xsd:dateofBirth>${randomDOB}</xsd:dateofBirth>
            <xsd:email>${bmail}</xsd:email>
            <xsd:event>null</xsd:event>
            <xsd:firstName>${randomFirstName}</xsd:firstName>
            <xsd:lastName>${randomLastName}</xsd:lastName>
            <xsd:secondLastname>${randomLastName}</xsd:secondLastname>
            <xsd:frontEndId>bz</xsd:frontEndId>
            <xsd:geoRestrcitionOverride>Y</xsd:geoRestrcitionOverride>
            <xsd:ip>10.151.147.111</xsd:ip>
            <xsd:isCr>Y</xsd:isCr>
            <xsd:langId>en_US</xsd:langId>
            <xsd:mobileCountryCode>91</xsd:mobileCountryCode>
            <xsd:mobileNumber>${mobileNumber}</xsd:mobileNumber>
            <xsd:passWord>Test@123</xsd:passWord>
            <xsd:securityAnswer>1234</xsd:securityAnswer>
            <xsd:securityQuesitonId>9</xsd:securityQuesitonId>
            <xsd:sex>M</xsd:sex>
            <xsd:state>ZZ</xsd:state>
            <xsd:title>Mr</xsd:title>
            <xsd:tnCAccepted>true</xsd:tnCAccepted>
            <xsd:userTimeZone>GMT Standard Tim</xsd:userTimeZone>
            <xsd:zip>234433</xsd:zip>
         </bwin:registerAccountRequest>
      </bwin:createRegisterAccount>
   </soapenv:Body>
</soapenv:Envelope>`;

    const response = await request.post('http://10.1.208.177:80/services/UserProfileBwinService.UserProfileBwinServiceHttpSoap11Endpoint/', {
        data: soapRequest,
        headers: {
            'Content-Type': 'text/xml',
            'Connection':'keep-alive'
           // 'SOAPAction': 'http://bwin.service.userprofile.mds.services.partygaming.com/createRegisterAccount'
        }
    });

    // Validate the response
    expect(response.ok()).toBeTruthy();
    const responseBody = await response.text();
    console.log(responseBody); // You can also add specific validations here
    // Add assertions based on the expected response
});
