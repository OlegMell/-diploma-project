import * as mongoose from 'mongoose';

export const Account = new mongoose.Schema({
    login: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    username: { type: String, required: true },
    followers: [ {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Account'
    } ],
    subscription: [ {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Account'
    } ],
    personalInfo: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'PersonalInfo'
    },
    settings: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Settings'
    },

    isPrivate: { type: Boolean },
    date: { type: Date }
});
