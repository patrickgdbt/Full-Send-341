export interface FirebaseRequirements {
  auth: firebase.auth.Auth;
  db: firebase.database.Database;
  storage: firebase.storage.Storage;
}

export interface IBasicUser {
  userID: string;
  userName: string;
}

export interface IPost extends IBasicUser{
  postID: string;
  caption: string;
  imageURL: string;
  comments: IComment[];
}

export interface IComment extends IBasicUser {
  comment: string;
}

export interface INotification extends IBasicUser {
  type: string;
}

export interface NoProps { }