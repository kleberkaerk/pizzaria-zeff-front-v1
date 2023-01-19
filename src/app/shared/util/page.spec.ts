import { Page } from "./page";

describe("PageTest", () => {

    let page: Page<string>;

    let statePage: {
        empty: boolean,
        sorted: boolean,
        unsorted: boolean
    };

    let pageable: {
        sort: {
            empty: boolean,
            sorted: boolean,
            unsorted: boolean
        },
        offset: number,
        pageSize: number,
        pageNumber: number,
        unpaged: number,
        paged: boolean
    };

    beforeEach(() => {

        statePage = {
            empty: true,
            sorted: true,
            unsorted: true
        };

        pageable = {
            sort: statePage,
            offset: 1,
            pageSize: 1,
            pageNumber: 1,
            unpaged: 1,
            paged: true
        }

        page = new Page("Page string", pageable, 1, 1, true, 1, 1, statePage, true, 1, true);
    });

    it("content", () => {

        expect(page.content)
            .toEqual("Page string");
    });

    it("pageable", () => {

        expect(page.pageable)
            .toEqual(pageable);
    });

    it("totalPages", () => {

        expect(page.totalPages)
            .toEqual(1);
    });

    it("totalElements", () => {

        expect(page.totalElements)
            .toEqual(1);
    });

    it("last", () => {

        expect(page.last)
            .toBeTrue();
    });

    it("size", () => {

        expect(page.size)
            .toEqual(1);
    });

    it("number", () => {

        expect(page.number)
            .toEqual(1);
    });

    it("sort", () => {

        expect(page.sort)
            .toEqual(statePage);
    });

    it("first", () => {

        expect(page.first)
            .toBeTrue();
    });

    it("numberOfElements", () => {

        expect(page.numberOfElements)
            .toEqual(1);
    });

    it("empty", () => {

        expect(page.empty)
            .toBeTrue();
    });
});