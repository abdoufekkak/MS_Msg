import { message } from "./message";
export class User {
  constructor(
    public username: string,
    public email: string,
    public friends: User[] = [],
    public bloquers: User[] = [],
    public message: message[] = [],
    public id?: number,
  ) {}
}


 