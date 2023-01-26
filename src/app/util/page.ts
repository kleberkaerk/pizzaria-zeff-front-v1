type State = {

    empty: boolean,
    sorted: boolean,
    unsorted: boolean
}

type Pageable = {

    sort: State,
    offset: number,
    pageSize: number,
    pageNumber: number,
    unpaged: number,
    paged: boolean
}

export class Page<T> {

    public content: T;
    public pageable: Pageable;
    public totalPages: number;
    public totalElements: number;
    public last: boolean;
    public size: number;
    public number: number;
    public sort: State;
    public first: boolean;
    public numberOfElements: number;
    public empty: boolean;

    constructor(
        content: T,
        pageable: Pageable,
        totalPages: number,
        totalElements: number,
        last: boolean,
        size: number,
        number: number,
        sort: State,
        first: boolean,
        numberOfElements: number,
        empty: boolean
    ) {

        this.content = content;
        this.pageable = pageable;
        this.totalPages = totalPages;
        this.totalElements = totalElements;
        this.last = last;
        this.size = size;
        this.number = number;
        this.sort = sort;
        this.first = first;
        this.numberOfElements = numberOfElements;
        this.empty = empty;
    }
}