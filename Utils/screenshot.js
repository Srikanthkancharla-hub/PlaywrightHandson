const {test,expect} =require('@playwright/test');

 async function takescreenshot(){
    const now= new Date();
    const timestamp=now.toISOString().replace(/[:.-]/g, '_');
};