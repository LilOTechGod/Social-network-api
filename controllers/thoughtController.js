const { Thought } = require('../models');

module.exports = {
    //get all Thoughts
    getThought(req, res) {
        Thought.find()
            .then((thoughts) => res.json(thoughts))
            .catch((err) => res.status(500).json(err));
    },
    // Get a single thought
    getSingleThought(req, res) {
        Thought.findOne({ id: req.params.toughtId })
            .select('-__v')
            .then((thought) =>
                !thought
                    ? res.status(404).json({ message: 'No thought with that ID' })
                    : res.json(thought)
            )
            .catch((err) => res.status(500).json(err));
    },
    // Create a thought
    createThought(req, res) {
        Thought.create(req.body)
            .then((thought) => res.json(thought))
            .catch((err) => {
                console.log(err);
                return res.status(500).json(err);
            });
    },
    // Delete a thought
    deleteThought(req, res) {
        Thought.findOneAndDelete({ id: req.params.thoughtId })
            .then((deleteThought) => res.json({ message: 'Thought deleted!' }))
            .catch((err) => res.status(500).json(err));
    },
    // Update a thought 
    updateThought(req, res) {
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $set: req.body },
            { runValidators: true, new: true }
        )
            .then((thought) =>
                !thought
                    ? res.status(404).json({ message: 'No thought with this id!' })
                    : res.json(thought)
            )
            .catch((err) => res.status(500).json(err));
    },
    // create a reaction
    createReaction(req, res) {
        console.log(req.body)
        Thought.findOneAndUpdate({id: req.params.thoughtId}, {$push: {reactions:req.body}}, {new:true})
        .then((newReact) => res.status(200).json(newReact))
        .catch((err) => res.status(500).json(err));
    },
    // delete a reaction 
    deleteReaction(req,res) {
        Thought.findOneAndDelete({id:req.params.thoughtId}, {$pull:  {reactions:{reactionId: req.params.reactionId}}}, {new:true})
        .then((response) => res.status(200).json(response))
        .catch((err) => res.status(500).json(err));

    }
};