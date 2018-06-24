const mongoose = require('mongoose');
const Person = mongoose.model('Person');

exports.getPersons = async (req, res) => {
    const limit = parseInt(req.query.limit, 10) || 10;
    const offset = parseInt(req.query.offset, 10) || 0;
    
    const personsPromise = Person.find().sort({'lastName': 'asc', 'firstName': 'asc'}).skip(offset).limit(limit);
    const countPromise = Person.count();
    const [persons, count] = await Promise.all([personsPromise, countPromise]);
    
    const _links = {
        base: `${req.protocol}://${req.get('host')}${req.baseUrl}`,
        self: `${req.path}/?limit=${limit}&offset=${offset}`
    };

    if (offset + limit < count) {
        _links['next'] = `${req.path}?limit=${limit}&offset=${offset + limit}`;
        _links['last'] = `${req.path}?limit=${limit}&offset=${limit * (Math.ceil(count / limit) - 1)}`;
    }

    if (offset > 0) {
        _links['prev'] = `${req.path}?limit=${limit}&offset=${Math.max(0, offset - limit)}`;
        _links['first'] = `${req.path}?limit=${limit}&offset=0`;
    }

    res.send({
        _links: _links,
        results: persons,
        count: count,
        start: offset
    });
};

exports.getPerson = async (req, res) => {
    const person = await Person.findById(req.params.id);
    res.send(person);
};

exports.editPerson = async (req, res) => {
    const person = await Person.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.send(person);
};

exports.createPerson = async (req, res) => {
    const person = await new Person(req.body).save();
    res.send(person);
};

exports.deletePerson = async (req, res) => {
    const result = await Person.findByIdAndRemove(req.params.id);
    res.send(result);
};