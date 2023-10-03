class message {
    constructor(
      public id: string,
      public senderId: number,
      public receiverId: number,
      public content: string,
      public send_date:Date,
      public contry_msg:string,
      public deleted_al:Date,
      public deleted_fr_me:Date,
      public messageType: MessageType
    ) {}
  }