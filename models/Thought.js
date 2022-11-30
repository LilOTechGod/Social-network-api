const { Schema, Types } = require('mongoose');

const thoughtSchema = new Schema(
    {
        thoughtId: {
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId(),
        },
        thoughtText: {
            type: String,
            required: 'Your thoughts are required',
            minLength: 1,
            maxLength: 280,
        },
        createdAt: {
            type: Date,
            default: Date.now,
        },
        username: {
            type: String,
            required: true,
        },
        reactions: {

        },
    },
    {
        toJSON: {
          getters: true,
        },
        id: false,
      }
);

module.exports = thoughtSchema;