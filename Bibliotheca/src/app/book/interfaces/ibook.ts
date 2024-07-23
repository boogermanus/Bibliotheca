import { ILibrary } from "../../library/interfaces/ilibrary";
import { ILibraryBookshelf } from "../../library/interfaces/ilibrary-bookshelf";

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
    library?: ILibrary
    libraryBookshelfId: number;
    libraryBookshelf?: ILibraryBookshelf
    row: number
}
