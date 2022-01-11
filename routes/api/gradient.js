const express = require("express");
const router = express.Router();
const Gradient = require("../../models/gradientSchema");
const nodeHtmlToImage = require("node-html-to-image");
router.get("/", async (req, res) => {
  try {
    const result = await Gradient.find();
    res.send(result);
  } catch (error) {
    console.log(error);
    res.status(500);
  }
});

router.post("/", async (req, res) => {
  try {
    const result = new Gradient(req.body);
    await result.save();
    res.send(result);
  } catch (error) {
    console.log(error);
    res.status(500);
  }
});

router.put("/:id", async (req, res) => {
  try {
    const result = await Gradient.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.send(result);
  } catch (error) {
    console.log(error.message);
    res.status(500);
  }
});

router.get("/downloads/:themename", async (req, res) => {
  try {
    const gradient = await Gradient.findOne({ name: req.params.themename });
    await nodeHtmlToImage({
      output: "./images/image.png",
      html: `<div style="width:100%; height:100%; background-image:linear-gradient(${gradient.colors.direction}, ${gradient.colors.start}, ${gradient.colors.end})"></div>`,
    });
    gradient.downloads = gradient.downloads + 1;
    await gradient.save();
    res.download("./images/image.png");
  } catch (error) {
    console.log(error);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    await Gradient.findByIdAndDelete(req.params.id);
  } catch (error) {
    console.log(error.message);
    res.sendStatus(200); 
  }
});

module.exports = router;
