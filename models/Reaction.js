const { Schema, Types } = require('mongoose');
const moment = require('moment');

const reactionSchema = new Schema(
    {
        reactionId: {
            type: Schema.Types.ObjectId, 
            default: () => new Types.ObjectId(),
        },
        reactionBody: {
            type: String,
            required: 'Reaction is required',
            maxLength: 280,
        },
        username: {
            type: String,
            required: true,
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: (timeCreated) => moment(timeCreated).format('MMMM Do YYYY, h:mm:ss a')
        },
    },
    {
        toJSON: {
          virtuals: true,
        },
      }
);

module.exports = reactionSchema;