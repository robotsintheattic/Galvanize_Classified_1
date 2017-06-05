
'use strict';

const express = require('express');
const router = express.Router();
const knex = require('../knex')

router.get('/classifieds', (req, res, next) => {
  knex('classifieds')
  .select('id', 'title', 'title', 'description', 'price', 'item_image')
  .orderBy('id')
  .then((data) => {
    res.send(data);
  })
  .catch((err) => {
    next(err);
  });
});

router.get('/classifieds/:id', (req, res, next) => {
  let id = Number.parseInt(req.params.id)

  knex('classifieds')
    .select(['id', 'title', 'description', 'price', 'item_image'])
    .where('id', id)
    .then((data) => {
      res.send(data[0]);
    })
    .catch((err) => {
      next(err);
    })
})

router.post('/classifieds', (req, res, next) => {
  knex('classifieds')
  .returning(['id', 'title', 'description', 'price', 'item_image'])
  .insert({
    title: req.body.title,
    description: req.body.description,
    price: req.body.price,
    item_image: req.body.item_image
  })
  .then((data) => {
    res.send(data[0]);
  })
  .catch((err) => {
    next(err);
  });
});

router.patch('/classifieds/:id', (req, res, next) => {
  let id = Number.parseInt(req.params.id)
  console.log(req.body)
  knex('classifieds')
    .where('id', id)
    .returning(['id', 'title', 'description', 'price', 'item_image'])
    .update(req.body)
    .then((data) => {
      console.log(data[0])
      res.send(data[0])
      // "Ad Updated!"
    })
    .catch((err) => {
      next(err);
    });
});

router.delete('/classifieds/:id', (req, res, next) => {
  let id = Number.parseInt(req.params.id)

  knex('classifieds')
    .where('id', req.params.id)
    .returning(['id', 'title', 'description', 'price', 'item_image'])
    .del()
    .then((data) => {
      res.send(data[0]);
    // "Ad Deleted!"
    })
    .catch((err) => {
      next(err);
    });
});

module.exports = router;
