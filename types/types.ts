export interface Rec_storage {
  name: string;
  duration: string;
  audioURI: string;
  createdAt: Date;
}
export interface Recording {
    name: string;
    duration: string;
    audioURI: string;
    createdAt: string;
  }

export interface User {
  _id : string,
  username : string,
  email : string,
  password : string,
}