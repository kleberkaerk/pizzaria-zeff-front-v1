export class AddressDTO {
    
    id: string;
    number: string;
    road: string;
    district: string;
    city: string;
    state: string;

    constructor(
        id: string,
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
}