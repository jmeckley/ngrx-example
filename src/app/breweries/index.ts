export interface IBrewery {
    id: number;
    name: string;
    brewery_type: string;
    street: string;
    city: string;
    state: string;
    postal_code: string;
    country: string;
    longitude: number;
    latitude: number;
    phone: string;
    website_url: string;
    updated_at: Date;
    tag_list: Array<string>
}

export class Brewery implements IBrewery {
    constructor(brewery?: any) { 
        Object.assign(this, brewery);
    }

    id: number;
    name: string;
    brewery_type: string;
    street: string;
    city: string;
    state: string;
    postal_code: string;
    country: string;
    longitude: number;
    latitude: number;
    phone: string;
    website_url: string;
    updated_at: Date;
    tag_list: Array<string>;
}

export interface ISearchCriteria {
    pageIndex: number;
    pageSize: number;
}