export class Address {

    private id: number;
    private number: string;
    private road: string;
    private district: string;
    private city: string;
    private state: string;

    constructor(
        id: number,
        number: string,
        road: string,
        district: string,
        city: string,
        state: string
    ) {

        this.id = id;
        this.number = number;
        this.road = road;
        this.district = district;
        this.city = city;
        this.state = state;
    }

    get getId() {

        return this.id;
    }
    get getNumber() {

        return this.number;
    }
    get getRoad() {

        return this.road;
    }
    get getDistrict() {

        return this.district;
    }
    get getCity() {

        return this.city;
    }
    get getState() {

        return this.state;
    }
}