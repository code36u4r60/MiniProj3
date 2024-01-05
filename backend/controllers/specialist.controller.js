const Specialist = require('../models/specialist.model');
const {
    validationResult
} = require('express-validator');
const SpecialistMessages = require("../messages/specialist.messages");

exports.get = (req, res) => {
    Specialist.find(req.query, (error, specialists) => {
        if (error) throw error;

        let message = SpecialistMessages.success.s2;

        if (specialists.length < 0)
            message = SpecialistMessages.success.s5;

        message.body = specialists;
        return res.status(message.http).send(message);
    });
}

exports.create = (req, res) => {
    const errors = validationResult(req).array();
    if (errors.length > 0) return res.status(406).send(errors);

    new Specialist({
        name: req.body.name,
        job: req.body.job,
        active: true,
        description: req.body.description,
        expertise: req.body.expertise,
    }).save((error, specialist) => {
        if (error) throw error;
        let message = SpecialistMessages.success.s0;
        message.body = specialist;
        return res.header("location", "/specialists/" + specialist.id).status(message.http).send(message);
    });
}

exports.update = (req, res) => {
    const errors = validationResult(req).array();
    if (errors.length > 0) return res.status(406).send(errors);

    Specialist.findOneAndUpdate({
        id: req.params.id
    }, {
        $set: req.body
    }, {
        new: true
    }, (error, specialist) => {
        if (error) throw error;
        if (!specialist) return res.status(SpecialistMessages.error.e0.http).send(SpecialistMessages.error.e0);

        let message = SpecialistMessages.success.s1;
        message.body = specialist;
        return res.status(message.http).send(message);

    });
}

exports.delete = (req, res) => {
    const errors = validationResult(req).array();
    if (errors.length > 0) return res.status(406).send(errors);

    Specialist.deleteOne({
        id: req.params.id
    }, (error, result) => {
        if (error) throw error;
        if (result.deletedCount <= 0) return res.status(SpecialistMessages.error.e0.http).send(SpecialistMessages.error.e0);
        return res.status(SpecialistMessages.success.s3.http).send(SpecialistMessages.success.s3);

    });
}

exports.getOne = (req, res) => {
    const errors = validationResult(req).array();
    if (errors.length > 0) return res.status(406).send(errors);

    Specialist.findOne({
        id: req.params.id
    }, (error, specialist) => {
        if (error) throw error;
        if (!specialist) return res.status(SpecialistMessages.error.e1.http).send(SpecialistMessages.error.e1);
        let message = SpecialistMessages.success.s2;
        message.body = specialist;
        return res.status(message.http).send(message);
    });
}

exports.activate = (req, res) => {
    const errors = validationResult(req).array();
    if (errors.length > 0) return res.status(406).send(errors);

    Specialist.updateOne({
        id: req.params.id
    }, {
        $set: {
            active: true
        }
    }, (error, result) => {
        if (error) throw error;

        if (result.n <= 0) return res.status(SpecialistMessages.error.e0.http).send(SpecialistMessages.error.e0);
        return res.status(SpecialistMessages.success.s6.http).send(SpecialistMessages.success.s6);

    });
}

exports.deactivate = (req, res) => {
    const errors = validationResult(req).array();
    if (errors.length > 0) return res.status(406).send(errors);

    Specialist.updateOne({
        id: req.params.id
    }, {
        $set: {
            active: false
        }
    }, (error, result) => {
        if (error) throw error;

        if (result.n <= 0) return res.status(SpecialistMessages.error.e0.http).send(SpecialistMessages.error.e0);
        return res.status(SpecialistMessages.success.s4.http).send(SpecialistMessages.success.s4);

    });
}