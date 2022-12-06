const { Schema, model } = require('mongoose');
const moment = require('moment');
const reaction = require('./Reaction');

const thoughtSchema = new Schema(
    {
        // thoughtId: {
        //     type: Schema.Types.ObjectId,
        //     default: () => new Types.ObjectId(),
        // },
        thoughtText: {
            type: String,
            required: true,
            minLength: 1,
            maxLength: 280,
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: (timeCreated) => moment(timeCreated).format('MMMM Do YYYY, h:mm:ss a'),
        },
        username: {
            type: String,
            required: true,
        },
        reactions: 
            [reaction]
    },
    {
        toJSON: {
          virtuals: true,
        },
      }
);

thoughtSchema.virtual('reactionCount').get(function () {
    return this.reactions.length;
});

const Thought = model('Thought', thoughtSchema);
module.exports = Thought;