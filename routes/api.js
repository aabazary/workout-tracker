const router = require("express").Router();
const Workout = require("../models/workout");
const path = require("path");


//get route in order to show the data of the workout
router.get('/api/workouts', (req, res) => {
   //assistance from ask BCS, required an aggregate instead of a find method
    Workout.aggregate([
        {
            $addFields: {
                totalDuration: {
                    $sum: '$exercises.duration',
                },
            },
        },
    ])
        .then((dbWorkouts) => {
            res.json(dbWorkouts);
        })
        .catch((err) => {
            res.json(err);
        });
});

//get route to show the range of workout used in the stats page as well to display the chart for the exercises duration
router.get("/api/workouts/range", (req, res) => {
   //assistance from ask BCS, required an aggregate instead of a find method
    Workout.aggregate([
        {
            $addFields: {
                totalDuration: {
                    $sum: '$exercises.duration',
                },
            },
        },
    ])
        .sort({ day: -1 })
        .limit(7)
        .sort({ day: 1 })
        .then((dbWorkouts) => {
            res.json(dbWorkouts);
        })
        .catch((err) => {
            res.json(err);
        });

});


//post route to add a workout
router.post("/api/workouts", ({
    body
}, res) => {
    Workout.create(body)
        .then(dbWorkout => {
            res.json(dbWorkout);
        })
        .catch(err => {
            res.status(400).json(err);
        });
});


//put route to input data for the workout with a specific id
router.put("/api/workouts/:id", (req, res) => {
    Workout.findOneAndUpdate({
        _id: req.params.id
    }, {
        $push: {
            exercises: req.body
        }
    }, {
        new: true
    })
    .then(dbWorkout => {
        res.json(dbWorkout);
    }).catch(err => {
        res.json(err);
    });
});


//get route for the exercise page
router.get("/exercise", function (req, res) {
    res.sendFile(path.join(__dirname, "../public/exercise.html"));
});


//get route for the stats page
router.get("/stats", function (req, res) {
    res.sendFile(path.join(__dirname, "../public/stats.html"));
});

module.exports = router;