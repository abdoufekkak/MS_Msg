
export class message {
    constructor(
      public senderId: number,
      public receiverId: number,
      public contente: string,
      public send_date:Date,
      public contry_msg:string,
      public deleted_al:Date,
      public deleted_fr_me:Date,
      public messageType: MessageType,
      public id?: number,
    ) {}
  }