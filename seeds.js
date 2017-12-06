const mongoose = require('mongoose');
const Campground = require('./models/campground');
const Comment = require('./models/comment');

const data = [
  {
    name: 'Clouds Rest',
    image: 'https://farm3.staticflickr.com/2464/3694344957_14180103ed.jpg',
    description: 'Where clouds go to sleep'
  },
  {
    name: 'Hunters Lodge',
    image: 'https://farm1.staticflickr.com/130/321487195_ff34bde2f5.jpg',
    description: 'Redneck heaven'
  },
  {
    name: 'Mt. view',
    image: 'https://farm2.staticflickr.com/1424/1430198323_c26451b047.jpg',
    description: 'Big mountains'
  }
];

function seedDB() {
  Campground.remove({}, (err) => {
    if (err) {
      console.log(err);
    } else {
      console.log('Removed campgrounds!');
      // data.forEach((seed) => {
      //   Campground.create(seed, (err, campground) => {
      //     if (err) {
      //       console.log(err);
      //     } else {
      //       console.log('Added', campground);
      //       Comment.create(
      //         {
      //           text: 'This place is great',
      //           author: 'Homer'
      //         }, (err, comment) => {
      //           if (err) {
      //             console.log(err);
      //           } else {
      //             campground.comments.push(comment);
      //             campground.save();
      //             console.log('Created new comment');
      //           }
      //         });
      //     }
      //   });
      // });
    }
  });
}

module.exports = seedDB;
