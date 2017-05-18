
'use strict';

const express = require('express');
const router = express.Router();
const knex = require('knex')

router.get('/', function(req, res) {
  knex('classifieds').then(function(classifieds) {
    res.send(classifieds);
  }).catch(function(err) {
    res.send(err);
  });
});

router.get('/:id', function(req, res) {
  knex('classifieds')
    .where({id: req.params.id})
    .first()
    .then(function(ad) {
      res.send(ad);
    }).catch(function(err) {
      res.send(err);
    })
})

router.post('/', function(req, res) {
  knex('classifieds').insert(req.body, '*').then(function(ad) {
    res.send(ad);
  }).catch(function(err) {
    res.send(err);
  });
});

router.delete('/:id', function(req, res) {
  knex('classifieds').where('id', req.params.id).first().del().then(function() {
    res.send("Ad Deleted!");
  }).catch(function(err) {
    res.send(err);
  });
});

router.put('/:id', function(req, res) {
  knex('classifieds')
    .where('id', req.params.id)
    .update(req.body)
    .then(function() {
      res.send("Ad Updated!")
    }).catch(function(err) {
      res.send(err);
    });
});


module.exports = router;
