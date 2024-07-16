export interface IBook {
    id?: number;
    title: string;
    author: string;
    subject: string;
    format: string;
    isbn13: string;
    isbn10: string;
    numberOfPages: number;
    publishDate: Date
    description: string;
    libraryId: number;
    libraryBookshelfId: number;
    row: number
}
