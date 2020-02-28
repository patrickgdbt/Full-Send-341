export interface FirebaseRequirements {
  auth: firebase.auth.Auth;
  db: firebase.database.Database;
  storage: firebase.storage.Storage;
}

export interface IPost {
  postID: string;
  caption: string;
  imageURL: string;
  userID: string;
  userName: string;
  comments: IComment[];
}

export interface IComment {
  userID: string;
  userName: string;
  comment: string;
}

export interface NoProps { }