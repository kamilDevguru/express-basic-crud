const express = require('express');
const uuid = require('uuid');
const members = require('../../Members');

const router = express.Router();

// Get all members

router.get('/', (req, res) => {
  res.json(members);
});

// Get member

router.get('/:id', (req, res) => {
  const found = members.some(member => member.id === parseInt(req.params.id));

  if (found) {
    res.json(members.find(member => member.id === parseInt(req.params.id)))
  } else {
    res.status(400).json({ msg: `No member with id ${req.params.id}` });
  }
})

// Post member

router.post('/', (req, res) => {
  const newMember = {
    id: uuid.v4(),
    name: req.body.name,
    email: req.body.email,
    status: 'active'
  };

  if (!req.body.name || !req.body.email) {
    res.status(400).json({ msg: 'Email and Name is required' });
  } else {
    members.push(newMember);
    // res.json(members);
    res.redirect('/');
  }
})

// Update member

router.put('/:id', (req, res) => {
  const found = members.some(member => member.id === parseInt(req.params.id));

  if (found) {
    if (!req.body.email && !req.body.name) {
      res.status(400).json({ msg: 'Email or Name is required' });
    } else {
      members.forEach(member => {
        if (member.id === parseInt(req.params.id)) {
          member.name = req.body.name || member.name;
          member.email = req.body.email || member.email;
        }
      });

      res.json({ msg: 'Member updated', members })
    }
  } else {
    res.status(400).json({ msg: `No member with id ${req.params.id}` });
  }
})

// Delete member

router.delete('/:id', (req, res) => {
  const found = members.some(member => member.id === parseInt(req.params.id));

  if (found) {
    res.json({ msg: 'Member deleted', members: members.filter(member => member.id !== parseInt(req.params.id)) })
  } else {
    res.status(400).json({ msg: `No member with id ${req.params.id}` });
  }
})
module.exports = router;