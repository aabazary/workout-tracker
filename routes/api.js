const router = require("express").Router();
const Workout = require("../models/workout");
const path = require("path");

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
        console.log(dbWorkout.exercises)
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



router.get("/exercise", function (req, res) {
    res.sendFile(path.join(__dirname, "../public/exercise.html"));
});

router.get("/stats", function (req, res) {
    res.sendFile(path.join(__dirname, "../public/stats.html"));
});
module.exports = router;