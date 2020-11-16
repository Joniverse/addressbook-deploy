const router = require('./node_modules/express').Router();
let Contact = require('./model');

// GET ALL CONTACTS
router.route('/:sortBy').get((req, res) => {
  const sort = req.params.sortBy;

  Contact.find()
    .collation({ locale: 'sv', strength: 2 })
    .sort({ [sort]: 1 })
    .then((contacts) => {
      res.json(contacts);
      console.log('Retrieved all contacts');
    })
    .catch((err) => res.status(400).json('Error: ' + err));
});

// // GET SINGLE CONTACT BY ID
// router.route('/get:id').get((req, res) => {
//   Contact.findById(req.params.id)
//     .then((contact) => res.json(contact))
//     .catch((err) => res.status(400).json('Error: ' + err));
// });

// POST SINGLE CONTACT TO DB
router.route('/add').post((req, res) => {
  const fName = req.body.fName;
  const lName = req.body.lName;
  const phone = req.body.phone;
  const email = req.body.email;
  const address1 = req.body.address1;
  const address2 = req.body.address2;
  const address3 = req.body.address3;

  const newContact = new Contact({
    fName,
    lName,
    phone,
    email,
    address1,
    address2,
    address3,
  });

  newContact
    .save()
    .then(() => res.json('User added'))
    .catch((err) => res.status(400).json('Error: ' + err));
});

// DELETE CONTACT
router.route('/delete/:id').delete((req, res) => {
  Contact.findByIdAndDelete(req.params.id)
    .then(() => res.json('Deleted contact'))
    .catch((err) => res.status(400).json('Error: ' + err));
});

// UPDATE ONE CONTACT
router.route('/update/:id').post((req, res) => {
  Contact.findById(req.params.id)
    .then((contact) => {
      contact.fName = req.body.fName;
      contact.lName = req.body.lName;
      contact.phone = req.body.phone;
      contact.email = req.body.email;
      contact.address1 = req.body.address1;
      contact.address2 = req.body.address2;
      contact.address3 = req.body.address3;

      contact
        .save()
        .then(() => res.send('Address updated'))
        .catch((err) => res.status(400).json('Error: ' + err));
    })
    .catch((err) => res.status(400).json('Error: ' + err));
});

module.exports = router;
