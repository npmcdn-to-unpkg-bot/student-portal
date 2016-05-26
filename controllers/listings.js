var Listing = require('../models/Listing');

module.exports = {
  index: index,
  show: show,
  create: create,
  update: update,
  destroy: destroy
}

function index(req, res, next) {
  Listing.find({}, function(err, listings) {
    if (err) next(err);

    res.json(listings);
  });
}

function show(req, res, next) {
  var id = req.params.id;

  Listing.findById(id, function(err, listing) {
    if (err) next(err);
    res.json(listing);
  });
}

function create(req, res, next) {
  var newListing = new Listing(req.body);

  //add the user's profile pic to the listing
  newListing.hostImgUrl = req.decoded.imageUrl
  newListing.hostId = req.decoded._id


  newListing.save(function(err, savedListing) {
    if (err) next(err);

    res.json(savedListing);
  });

}

function update(req, res, next) {
  var id = req.params.id;

  Listing.findById(id, function(err, listing) {
    if (err) next(err);

    for (var key in req.body) {
      listing[key] = req.body[key]
    }

    listing.save(function(err, updatedListing) {
      if (err) next(err);

      res.json(updatedListing);
    });

  });
}

function destroy(req, res, next) {
  var id = req.params.id;
  Listing.remove({_id:id}, function(err) {
    if (err) next(err);

    res.json({message: 'Listing successfully deleted'});
  });
}
