const router = require("express").Router();
const Workout = require("../models/workout");
const path = require("path");

router.get("/exercise", function (req, res) {
    res.sendFile(path.join(__dirname, "../public/exercise.html"));
});

router.get("/stats", function (req, res) {
    res.sendFile(path.join(__dirname, "../public/stats.html"));
});


router.get("/api/workouts", (req, res) => {
    Workout.find({})
        .then(dbWorkout => {
            res.json(dbWorkout);
        })
        .catch(err => {
            res.status(400).json(err);
        });
});

router.get("/api/workouts/range", (req, res) => {

    Workout.find({}).then(dbWorkout => {

        res.json(dbWorkout);
    }).catch(err => {
        res.json(err);
    });

});



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


router.put("/api/workouts/:id", ({
    body,
    params
}, res) => {
    Workout.findByIdAndUpdate(params.id, {
            $push: {
                exercises: body
            }
        }, {
            new: true
        })
        .then(dbWorkout => {
            res.json(dbWorkout);
        })
        .catch(err => {
            res.status(400).json(err);
        });
});

module.exports = router;