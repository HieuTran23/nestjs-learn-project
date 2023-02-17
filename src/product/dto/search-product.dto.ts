export class SearchProductDto {
  category?: string;
  product?: string;
  limit: number;
  page: number;
  order?: string;
}

export default SearchProductDto;
