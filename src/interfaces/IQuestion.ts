export interface IQuestion {
  select (product: string): Promise<any>
}