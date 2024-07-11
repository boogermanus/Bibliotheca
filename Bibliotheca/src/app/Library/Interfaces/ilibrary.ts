import { ILibraryBookshelf } from "./ilibrary-bookshelf";
import { ILibraryUser } from "./ilibrary-user";

export interface ILibrary {
    id: number;
    name: string;
    createDate: Date;
    libraryUsers?: ILibraryUser[];
    libraryBookshelves?: ILibraryBookshelf[];
}
