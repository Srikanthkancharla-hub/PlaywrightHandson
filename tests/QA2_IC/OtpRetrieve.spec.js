const {test,expect}=require('@playwright/test');
const {connectToMongo}=require('../../Pages/MongoDb');

test.beforeAll(async () => {
    await connectToMongo();
});

test.afterAll(async () => {
    await closeMongo();
});

test('Get OTP from MongoDB Test' , async({page})=>{
    const db= await connectToMongo();
    const userId='ld_ldTimmo3618768';
    const otpdoc= await db.collection('otpdetails').findOne({userId});
    expect(otpdoc).not.toBeNull();
    const otp=otpdoc.otpCode;
    console.log(otp);
}

);