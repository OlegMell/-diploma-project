import * as mongoose from 'mongoose';

export const PersonalInfo = new mongoose.Schema({
    firstName: { type: String, default: '' },
    lastName: { type: String, default: '' },
    email: { type: String,  unique: true },
    phone: { type: String, default: '', unique: true },
    photo: { type: String, default: '/profile-images/thumb.png' },
    bio: { type: String , default: ''},
    site: { type: String, default: '' }
});
