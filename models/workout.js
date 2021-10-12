const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const workoutSchema = new Schema({
    exercises: [{
        name: {
            type: String,
            required: "Enter a name for the Workout"
        },
        type: {
            type: String,
            required: "Enter a type of Workout"
        },
        duration: {
            type: Number
        },
        distance: {
            type: Number
        },
        weight: {
            type: Number
        },
        reps: {
            type: Number
        },
        sets: {
            type: Number
        },
    }],
    day: {
        type: Date,
        default: Date.now
    }
});

const Workout = mongoose.model("Workout", workoutSchema);

module.exports = Workout;