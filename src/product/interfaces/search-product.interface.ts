export interface ISearchProductOptions {
  filterOptions?: IFilterOptions;
  paginationOptions: IPaginationOptions;
  sortOptions?: ISortOptions;
}

export interface IFilterOptions {
  category?: string;
  product?: string;
}

export interface IPaginationOptions {
  limit: number;
  page: number;
}

export interface ISortOptions {
  order?: string;
}

export default ISearchProductOptions;
