import { ILibrary } from "../../library/interfaces/ilibrary";
import { ILibraryBookshelf } from "../../library/interfaces/ilibrary-bookshelf";
import { IBook } from "../interfaces/ibook";

export class Book implements IBook {
    id?: number;
    title: string;
    author: string;
    subject: string;
    format: string;
    isbn13: string;
    isbn10: string;
    numberOfPages: number;
    publishDate: Date;
    description: string;
    libraryId: number;
    library?: ILibrary;
    libraryBookshelfId: number;
    libraryBookshelf?: ILibraryBookshelf;
    row: number;

    static MockBook(): Book {
        return {
            id: 1,
            title: '',
            author: '',
            subject: '',
            format: '',
            isbn13: '',
            isbn10: '',
            numberOfPages: 1,
            publishDate: new Date(),
            description: '',
            libraryId: 1,
            library: { name: '', createDate: new Date(), bookCount: 1 },
            libraryBookshelfId: 1,
            libraryBookshelf: { name: '', libraryId: 1, numberOfRows: 1 },
            row: 1
          }
    }
}
