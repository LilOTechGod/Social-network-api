const { Schema, model } = require('mongoose');

const userSchema = new Schema(
    {
        // userId: {
        //     type: Schema.Types.ObjectId,
        //     default: () => new Types.ObjectId(),
        // },
        username: {
            type: String,
            unique: true,
            required: 'Username is required',
            trim: true
        },
        email: {
            type: String,
            required: 'Email address is required',
            unique: true,
            validate: [validateEmail, 'Please fill a valid email address'],
        },
        thoughts: [{ 
            type: Schema.ObjectId, 
            ref: 'Thought' 
        }],
        friends: [{
            type: Schema.ObjectId,
            ref: 'User'
        }]
    },
    {
        toJSON: {
          virtuals: true,
        },
    }
);

userSchema.virtual('friendCount').get(function () {
    return this.friends.length;
});

const User = model('User', userSchema);
module.exports = User;