export interface IProductCategory {
  select (product: string): Promise<any>
}