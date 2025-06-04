import { faker } from "@faker-js/faker";
const randomdata=[{
    firstName:faker.person.firstName(),
    lastName:faker.person.lastName(),
    emailId:'coreapitest'+faker.number(10000)+'@yopmail.com',
    address:faker.location.address(),
    address2:faker.location.address2(),
    city:faker.location.city(),
    zipcode:faker.location.zipCode(),
    randomDob:`${String(faker.number.int({ min: 1, max: 31 }))}`.padStart(2, '0') +
    `-${String(faker.number.int({ min: 1, max: 12 }))}`.padStart(2, '0') +
    `-${faker.number.int({ min: 1990, max: 2000 })}`,
}];
//const randomDOB= randomdata[0].randomDob();