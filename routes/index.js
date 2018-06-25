const express = require('express');
const router = express.Router();
const passport = require('passport');

const personController = require('../controllers/personController');
const userController = require('../controllers/userController');

const { catchErrors } = require('../handlers/errorHandlers');

router.get('/init', (req, res) => {
    res.json({ message: 'API Initialized!' });
});

router.get('/persons', passport.authenticate('jwt', {session: false}), catchErrors(personController.getPersons));
router.get('/persons/:id', passport.authenticate('jwt', {session: false}), catchErrors(personController.getPerson));
router.put('/persons/:id', passport.authenticate('jwt', {session: false}), catchErrors(personController.editPerson));
router.post('/persons', passport.authenticate('jwt', {session: false}), catchErrors(personController.createPerson));
router.delete('/persons/:id', passport.authenticate('jwt', {session: false}), catchErrors(personController.deletePerson));

router.post('/users', userController.createUser);
router.post('/users/authenticate', catchErrors(userController.authenticateUser));
router.get('/protected', passport.authenticate('jwt', {session: false}), (req, res) => res.send('Go ahead'));

module.exports = router;
