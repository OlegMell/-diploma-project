export interface Account extends Document {
    login: string;
    username: string;
    followers: any;
    subscription: any;
    password: string;
    personalInfo: any;
}
