export interface IOpenLibraryBook {
  title: string;
  author: string;
  authors: string[];
  publishDate: Date,
  isbn10: string;
  isbn13: string;
  numberOfPages: number;
  description: string;
  subjects: string[];
}
