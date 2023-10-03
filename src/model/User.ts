class User {
  constructor(
    public id: string,
    public username: string,
    public email: string,
    public friends: User[] = [],
    public bloquers: User[] = [],
    public message: message[] = []
  ) {}
}


 