export interface IPage {
  title: string;
  content: string;
}

export interface IPageName {
  id: string;
}

export interface IPagesApi {
  [id: string]: IPage;
}