const express = require("express");

const router = express.Router();

const Table = require("../models/Table");
const LastUpdatedTime = require("../models/LastUpdatedTime");

let options = { upsert: true, new: true, setDefaultsOnInsert: true };

module.exports = router;

router.get("/getTimetable", async (req, res) => {
  try {
    const data = await Table.find({
      course: req.query.course,
      sem: req.query.sem,
      branch: req.query.branch,
      batch: req.query.batch,
    });
    res.status(200).json({ status: "Success", data: { table: data[0].data } });
  } catch (error) {
    res.status(400).json({ status: "Failed", data: { error: error.message } });
  }
});

router.post("/saveTimetable", async (req, res) => {
  try {
    const dataToSave = await Table.updateOne(
      {
        course: req.query.course,
        sem: req.query.sem,
        branch: req.query.branch,
        batch: req.query.batch,
      },
      {
        data: req.body,
      },
      options
    );

    await LastUpdatedTime.updateOne(
      {
        course: req.query.course,
        sem: req.query.sem,
        branch: req.query.branch,
        batch: req.query.batch,
      },
      {
        data: Date.now(),
      },
      options
    );

    res.status(200).json(dataToSave);
  } catch (error) {
    res.status(400).json({ status: "Failed", data: { error: error.message } });
  }
});

router.get("/getLastTimeUpdated", async (req, res) => {
  try {
    const data = await LastUpdatedTime.find({
      course: req.query.course,
      sem: req.query.sem,
      branch: req.query.branch,
      batch: req.query.batch,
    });
    res.status(200).json({ status: "Success", data: { lastUpdatedTime: data[0].data } });
  } catch (error) {
    res.status(400).json({ status: "Failed", data: { error: error.message } });
  }
});
