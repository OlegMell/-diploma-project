import * as mongoose from 'mongoose';

export const PersonalInfo = new mongoose.Schema({
    firstName: { type: String, },
    lastName: { type: String, },
    email: { type: String,  unique: true },
    phone: { type: String, unique: true },
    photo: { type: String, default: '/profile-images/thumb.png' },
    bio: { type: String },
    site: { type: String }
});
