export interface Account extends Document {
    _id: string
    login: string;
    username: string;
    followers: any;
    subscription: any;
    password: string;
    personalInfo: any;
}

export interface PersonalInfo extends Document {
    _id: string;
    firstName: string;
    lastName: string;
    email: string;
    photo: string;
    site: string;
    bio: string;
}
