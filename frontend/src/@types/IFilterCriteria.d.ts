export interface IFilterCriteria {
    genres: {
        title: string[];
        value: boolean[];
    }
    provider: {
        title: string[];
        value: boolean[];
    }
    status: {
        title: string[];
        value: boolean[];
    }
    averageRating: {
        from: number;
        to: number;
    }
}