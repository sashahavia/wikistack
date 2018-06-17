const express = require("express");
const router = express.Router();
const { Page, User } = require("../models");
const { addPage, editPage, main, userList, userPages, wikiPage} = require("../views");

router.get("/", async (req, res, next) => {
  const pages = await Page.findAll();
  res.send(main(pages));
});

router.post('/', async (req, res, next) => {
  // STUDENT ASSIGNMENT:
  // add definitions for `title` and `content`
  const page = new Page(req.body);

  // make sure we only redirect *after* our save is complete!
  // note: `.save` returns a promise.
  try {
    const [user, wasCreated] = await User.findOrCreate({
      where: {
        name: req.body.name,
        email: req.body.email
      }
    });

    await page.save();
    page.setAuthor(user);
    res.redirect(`/wiki/${page.slug}`);
  } catch (error) { next(error) };

});

router.get("/add", async (req, res, next) => {
  res.send(addPage());
});

router.get('/:slug', async (req, res, next) => {
  try{
    const page = await Page.findOne({
      where: {
        slug: req.params.slug
      }
    });
    if(page === null){
      res.sendStatus(404);
    }
    const author = await page.getAuthor();
    res.send(wikiPage(page, author));
  } catch (error) { next(error) };

});

router.post('/:slug', async (req, res, next) => {
  try {
    const [updatedRowCount, updatedPages] = await Page.update( req.body, {
      where: {
        slug: req.params.slug
      },
      returning: true
    });

    res.redirect(`/wiki/${updatedPages[0].slug}`)

  } catch (err) { next(err) };
});

router.get('/:slug/delete', async (req, res, next) => {
  try {
    await Page.destroy({
      where: {
        slug: req.params.slug
      }
    });
    res.redirect('/wiki');
  } catch (err) { next(err) };
});

router.get('/:slug/edit', async (req, res, next) => {
  try{
    const page = await Page.findOne({
      where: {
        slug: req.params.slug
      }
    });
    if(page === null){
      res.sendStatus(404);
    } else {
      const author = await page.getAuthor();
      res.send(editPage(page, author));
    }

  } catch (error) {next(error)};

});

module.exports = router;
