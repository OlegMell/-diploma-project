export interface Account extends Document {
    login: string;
    username: string;
    followers: any;
    subscription: any;
    password: string;
    personalInfo: any;
}

export interface PersonalInfo extends Document {
    firstname?: string;
    lastname?: string;
    email?: string;
    phone?: string;
    photo?: string;
    site?: string;
    bio?: string;
}
