const express = require("express");
const router = express.Router();
const addPage = require("../views/addPage");
const { Page } = require("../models");
const wikiPage = require("../views/wikipage");
const main = require ("../views/main");



router.get("/", async (req, res, next) => {
  const pages = await Page.findAll();
  res.send(main(pages));
});

// router.post("/", async (req, res, next) => {
//   // res.send('Got to POST/wiki');
//   res.json(req.body); // returns object of values entered
// });

router.post('/', async (req, res, next) => {

  // STUDENT ASSIGNMENT:
  // add definitions for `title` and `content`
  const page = new Page({
    title: req.body.title,
    content: req.body.content
  });

  // make sure we only redirect *after* our save is complete!
  // note: `.save` returns a promise.
  try {
    await page.save();
    res.redirect(`/wiki/${page.slug}`);
  } catch (error) { next(error) }
  console.log(page);
});

router.get("/add", async (req, res, next) => {
  res.send(addPage());
});

router.get('/:slug', async (req, res, next) => {
  // console.log("Here");
  // res.send(`hit dynamic route at ${req.params.slug}`);
  try{
    const page = await Page.findOne({
      where: {
        slug: req.params.slug
      }
    });
    // console.log(page);
    res.send(wikiPage(page));
  } catch (error) {next(error)}

});

module.exports = router;
