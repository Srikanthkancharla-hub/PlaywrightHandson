import { faker } from "@faker-js/faker";
const randomdata={
    firstName:faker.person.firstName(),
    lastName:faker.person.lastName(),
    emailId:'coreapitest'+faker.number.int({min:10000,max:99999})+'@yopmail.com',
    address:faker.location.secondaryAddress(),
    address2:faker.location.buildingNumber(),
    city:faker.location.city(),
    zipcode:faker.location.zipCode(),
    accountName:'anuse'+faker.number.int(({min:10000,max:99999})),
    mobileNumber: '90123'+faker.number.int(({min:10000,max:99999})),
    randomDob:`${String(faker.number.int({ min: 1, max: 31 }))}`.padStart(2, '0') +
    `-${String(faker.number.int({ min: 1, max: 12 }))}`.padStart(2, '0') +
    `-${faker.number.int({ min: 1990, max: 2000 })}`,
};
module.exports=randomdata;