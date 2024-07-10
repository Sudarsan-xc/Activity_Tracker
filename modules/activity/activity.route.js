const router = require("express").Router();
const activityController = require("./activity.controller");

router.get("/", async (req, res, next) => {
  try {
    const data = await Controller.list();
    res.json({ msg: "List of all activities" });
  } catch (e) {
    next(e);
  }
});
router.get("/:id", async (req, res, next) => {
  try {
    const data = await Controller.getById(req.params.id);
    res.json({ data: req.body, msg: "getting one data" });
  } catch (e) {
    next(e);
  }
});
router.post("/", async (req, res, next) => {
  try {
    const data = await PDFController.createPDF(req.body);
    res.json({ data: data, msg: "added new data  " });
  } catch (e) {
    next(e);
  }
});
//   router.put("/:id", (req, res) => {
//     const id = req.params.id;
//     res.json({ data: req.body, msg: "Updating new data" });
//   });
router.patch("/:id", async (req, res, next) => {
  try {
    const data = await Controller.updateById(req.params.id, req.body);
    res.json({ data: req.body, msg: "updatng new data" });
  } catch (e) {
    next(e);
  }
});
router.delete("/:id", async (req, res, next) => {
  try {
    const data = await Controller.removeById(req.params.id);
    res.json({ msg: "Deleting  data" });
  } catch (e) {
    next(e);
  }
});

module.exports = router;
