export interface IProject {
  image?: string;
  id: string;
  clientId:string;
  name:string;
  description:string;
  status:string;
  client: {
    id: string;
    name: string;
    email: string;
    phone: string
  }
}
