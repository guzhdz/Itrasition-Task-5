import { Faker, es_MX, it, de } from '@faker-js/faker';
import seedrandom from "seedrandom";

const regions = [es_MX, it, de];
class FakerData {
    constructor(region = 0, seed = 1012001, error = 2) {
        this.region = region;
        this.seed = seed;
        this.rng = seedrandom(seed);
        this.error = error;
        this.faker = new Faker({ locale: regions[this.region] });
        this.faker.seed(this.rng.int32());
    }

    generateFakerData(amount) {
        const idLenght = 20;
        const dataArray = [];
        for (let i = 0; i < amount; i++) {
            const data = {
                id: this.faker.string.alphanumeric(idLenght),
                name: this.faker.person.fullName(),
                address: this.getAddress(),
                phone: this.getPhone(),
            }
            this.getErrors(data);
            dataArray.push(data);
        }
        return dataArray
    }

    changeSeed(page) {
        const seed = this.seed + page;
        this.rng = seedrandom(seed);
        this.faker.seed(this.rng.int32());
    }

    getAddress() {
        const index = this.faker.number.int(3);
        const faker = this.faker.location;
        switch (index) {
            case 0:
                return `${faker.state()}, ${faker.city()}, ${faker.streetAddress()}, ${faker.zipCode()}`;
            case 1:
                return `${this.getRegionName()}, ${faker.state()}, ${faker.city()}, ${faker.streetAddress()}`;
            case 2:
                return `${faker.city()}, ${faker.streetAddress()}, ${faker.secondaryAddress()}, ${faker.zipCode()}`;
            case 3:
                return `${this.getRegionName()}, ${faker.state()}, ${faker.city()}, ${faker.streetAddress()}, ${faker.secondaryAddress()}, ${faker.zipCode()}`;
        }
    }

    getRegionName() {
        switch (this.region) {
            case 0:
                return 'Mexico';
            case 1:
                return 'Italia';
            case 2:
                return 'Deutschland';
        }
    }

    getPhone() {
        const index = this.faker.number.int(2);
        const faker = this.faker.phone;
        switch (index) {
            case 0:
                return faker.number({ style: 'human' });
            case 1:
                return faker.number({ style: 'national' });
            case 2:
                return faker.number({ style: 'international' });
        }
    }

    getErrors(data) {
        for (let i = 0; i < Math.floor(this.error); i++) {
            data = this.generateError(data);
        }
        this.rng() < this.error % 1 && (data = this.generateError(data));
    }

    getErrorAttribute() {
        const attributes = ['name', 'address', 'phone'];
        const index = Math.floor(this.rng() * attributes.length);
        return attributes[index];
    }

    generateError(data) {
        const attribute = this.getErrorAttribute();
        const index = this.rng.int32();
        switch (index) {
            case 0:
                data[attribute] = this.deleteChar(data[attribute]);
                break;
            case 1:
                data[attribute] = this.addCharacter(data[attribute]);
                break;
            case 2:
                data[attribute] = this.swapNearCharacter(data[attribute]);
                break;
        }
        return data;
    }

    deleteChar(string) {
        if (string.length === 0)
            return string;
        const arrayString = string.split('');
        const index = Math.floor(this.rng() * arrayString.length);
        arrayString.splice(index, 1);
        return arrayString.join('');
    }

    addCharacter(string) {
        const arrayString = string.split('');
        let index = 0;
        if (string.length !== 0)
            index = Math.floor(this.rng() * arrayString.length);
        const newChar = this.faker.string.alpha();
        arrayString.splice(index, 0, newChar);
        return arrayString.join('');
    }


    swapNearCharacter(string) {
        if (string.length === 0)
            return string;
        const arrayString = string.split('');
        const index = Math.floor(this.rng() * arrayString.length);
        [arrayString[index], arrayString[index + 1]] = [arrayString[index + 1], arrayString[index]];
        return arrayString.join('');
    }

}

export default FakerData;