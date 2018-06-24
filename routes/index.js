const express = require('express');
const router = express.Router();
const passport = require('passport');

const personController = require('../controllers/personController');
const userController = require('../controllers/userController');

const { catchErrors } = require('../handlers/errorHandlers');

router.get('/init', (req, res) => {
    res.json({ message: 'API Initialized!' });
});

router.get('/persons', catchErrors(personController.getPersons));
router.get('/persons/:id', catchErrors(personController.getPerson));
router.put('/persons/:id', catchErrors(personController.editPerson));
router.post('/persons', catchErrors(personController.createPerson));
router.delete('/persons/:id', catchErrors(personController.deletePerson));

router.post('/users', userController.createUser);
router.post('/users/authenticate', catchErrors(userController.authenticateUser));
router.get('/protected', passport.authenticate('jwt', {session: false}), (req, res) => res.send('Go ahead'));

module.exports = router;
