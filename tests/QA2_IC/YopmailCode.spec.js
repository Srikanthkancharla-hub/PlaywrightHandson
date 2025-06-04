const {test,expect}=require('@playwright/test'); 
test.describe.configure({retries:1, timeout:120000});
test ('Yopmail OTP Retrive',async ({page}) => {
    await page.goto('https://yopmail.com/');
    await page.getByRole('link', { name: ' Home' }).click();
    await page.getByPlaceholder('Enter your inbox here').click();
  await page.getByPlaceholder('Enter your inbox here').fill('oosritest040');
  await page.getByPlaceholder('Enter your inbox here').press('Enter');
  await page.getByRole('button', { name: '' }).click();
  console.log('Refresh button is clicked in inbox')
  const iframeElementHandle = await page.waitForSelector('iframe[name="ifinbox"]');
  const iframe= await iframeElementHandle.contentFrame();
  await iframe.locator('button', { hasText: 'Senha Única Segura' }).first().waitFor({timeout:90000});
   const topmail= await iframe.locator('button', { hasText: 'Senha Única Segura' }).first();
   await topmail.click();
   console.log('Clicked  on top mail in inbox');
   const ifmailBodyHandle= await page.waitForSelector('iframe[name="ifmail"]');
   const ifmailconetnt= await ifmailBodyHandle.contentFrame();
   //console.log(ifmailconetnt);
   await ifmailconetnt.locator('text=Use a Senha Única:').waitFor({timeout:90000});
   const emailBody=await ifmailconetnt.locator('text=Use a Senha Única:').textContent();
   console.log(emailBody);
   const otpMatch = emailBody.match(/\d{6}/);
   if (otpMatch) {
    const otp = otpMatch[0];  
    console.log('OTP:', otp); 
    await page.close();
    return otp;
  } else {
    console.log('OTP not found in the email body.');
    await page.close();
    return null;
  }
}
 
  
);