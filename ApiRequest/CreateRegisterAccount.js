import randomdata from '../test-data/Randomdata' 
import brandsConfig from '../Config/brandIDconfig';
import { error } from 'console';

module.exports = {
  createRegisterAccountXML: (brand,randomData) => {
    const brandconfig=brandsConfig.PG[brand];
    if (!brandconfig){
        throw new Error('Brand not found in configuration');
    }
    return `
    <soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:bwin="http://bwin.service.userprofile.mds.services.partygaming.com" xmlns:xsd="http://b2b.userprofile.mds.services.partygaming.com/xsd" xmlns:xsd1="http://api.userprofile.mds.services.partygaming.com/xsd">
   <soapenv:Header/>
      <soapenv:Body>
        <bwin:createRegisterAccount>
          <bwin:registerAccountRequest>
            <xsd:accountCurrency>GBP</xsd:accountCurrency>
            <xsd:accountName>${randomData.accountName}</xsd:accountName>
            <xsd:address>${randomData.address}</xsd:address>
            <xsd:address2>${randomData.address2}</xsd:address2>
            <xsd:birthCity>${randomData.city}</xsd:birthCity>
            <xsd:birthCountry>GB</xsd:birthCountry>
            <xsd:birthState>${randomData.city}</xsd:birthState>
            <xsd:bonusCode/>
            <xsd:bonusTncAccpeted>true</xsd:bonusTncAccpeted>
            <xsd:brandId>${brandconfig.BrandId}</xsd:brandId>
            <xsd:channelId>WC</xsd:channelId>
            <xsd:city>${randomData.city}</xsd:city>
            <xsd:country>${brandconfig.Country}</xsd:country>
            <xsd:dateofBirth>${randomData.randomDob}</xsd:dateofBirth>
            <xsd:email>${randomData.emailId}</xsd:email>
            <xsd:event>null</xsd:event>
            <xsd:firstName>${randomData.firstName}</xsd:firstName>
            <xsd:lastName>${randomData.lastName}</xsd:lastName>
            <xsd:frontEndId>${brandconfig.frontendid}</xsd:frontEndId>
            <xsd:geoRestrcitionOverride>Y</xsd:geoRestrcitionOverride>
            <xsd:ip>${brandconfig.ip}</xsd:ip>
            <xsd:isCr>Y</xsd:isCr>
            <xsd:langId>en_US</xsd:langId>
            <xsd:maidenName/>
            <xsd:mobileCountryCode>91</xsd:mobileCountryCode>
            <xsd:mobileNumber>${randomData.mobileNumber}</xsd:mobileNumber>
            <xsd:passWord>Test@123</xsd:passWord>
            <xsd:productId>SPORTSBOOK</xsd:productId>
            <xsd:securityAnswer>1234</xsd:securityAnswer>
            <xsd:securityQuesitonId>9</xsd:securityQuesitonId>
            <xsd:sex>M</xsd:sex>
            <xsd:ssn></xsd:ssn>
            <xsd:state>ZZ</xsd:state>
            <xsd:title>Mr</xsd:title>
            <xsd:tnCAccepted>true</xsd:tnCAccepted>
            <xsd:userTimeZone>GMT Standard Tim</xsd:userTimeZone>
            <xsd:zip>21234</xsd:zip>
          </bwin:registerAccountRequest>
        </bwin:createRegisterAccount>
      </soapenv:Body>
      </soapenv:Envelope>
    `;
  },

  generateXML: (brand) => {
    return module.exports.createRegisterAccountXML(brand,randomdata);  
  }
};
