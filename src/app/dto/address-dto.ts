export class AddressDTO {
    
    private id: string;
    private number: string;
    private road: string;
    private district: string;
    private city: string;
    private state: string;

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