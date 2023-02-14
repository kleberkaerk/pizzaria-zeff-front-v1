export class AddressDTO {
    
    id: number;
    number: string;
    road: string;
    district: string;
    city: string;
    state: string;

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
}