import { IReviewDTO } from "../ReviewDTOs/reviewDTo";

export interface IViewBookDTo {
    id: number;
    title: string;
    author: string;
    cover: string;
    content: string;
    rating: number;
    gener: string;
    reviews: IReviewDTO[]
}
