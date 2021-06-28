import * as mongoose from 'mongoose';

export const PersonalInfo = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: true, unique: true },
    photo: { type: String, default: '/profile-images/thumb.png' },
    bio: { type: String },
    site: { type: String }
});
