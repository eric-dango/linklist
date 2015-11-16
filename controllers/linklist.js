var LinkList = require('../models/linkListModel');
var populate = require('../lib/helpers').populate;

module.exports = {
  index: function (req, res, next) {
    LinkList.find({userId: req.user._id}, function (err, list) {
      if (err) {
        return next(new Error('Error getting templist'));
      }
      res.status(200).json(list);
    })
  },

  show: function (req, res, next) {
    LinkList.find({userId: req.user._id, _id: req.params.list_id}, function (err, list) {
      if (err) {
        return next(new Error('Error saving new temp list'));
      }
      res.status(200).json(list);
    })
  },

  // add: function (req, res) {

  // },

  create: function (req, res, next) {
    console.log(req.body);
    if(!req.body.href || !req.user._id) {
      return next(new Error('Missing url'));
    }
    var newSite = new LinkList();
    populate(newSite, req.body, req.user._id);
    newSite.save(function (err, site) {
      if (err) {
        return next(new Error('Error saving new temp list: MongoDb'));
      }
      res.status(200).json({site});
    });

  },

  // edit: function (req, res) {

  // },

  update: function (req, res, next) {
    var listId = req.params.list_id;
    if(req.params.list_id && req.body.url) {
      LinkList.update({_id: listId, userId: req.user._id}, req.body, function (err, site) {
        if(err) {
          return next(err);
        }
        res.status(200).json({site});
      })
    }
  },

  delete: function (req, res, next) {
    LinkList.remove({_id: req.params.list_id, userId: req.user._id}, function (err, site) {
      if (err) {
        return next(err);
      }
      res.status(200).json(site);
    })
  }
}