import { faker } from '@faker-js/faker';

//Fake data par ce que why not

export default {
    title : 'Liste des Characters',
    characters : [
        { id: 1, name: faker.person.fullName('female'), description: faker.person.jobTitle(), image: './public/img/profiles/profile1.png'},
        { id: 2, name: faker.person.fullName('female'), description: faker.person.jobTitle(), image: './public/img/profiles/profile2.png'},
        { id: 3, name: faker.person.fullName('male'), description: faker.person.jobTitle(), image: './public/img/profiles/profile3.png'},
        { id: 4, name: faker.person.fullName('male'), description: faker.person.jobTitle(), image: './public/img/profiles/profile4.png'},
        { id: 5, name: faker.person.fullName('male'), description: faker.person.jobTitle(), image: './public/img/profiles/profile5.png'},
        { id: 6, name: faker.person.fullName('male'), description: faker.person.jobTitle(), image: './public/img/profiles/profile6.png'},
        { id: 7, name: faker.person.fullName('female'), description: faker.person.jobTitle(), image: './public/img/profiles/profile7.png'},
    ]
}