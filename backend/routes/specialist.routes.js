const express = require('express');
let router = express.Router();
const SpecialistController = require('../controllers/specialist.controller');
const {
    body,
    param
} = require('express-validator');
const CONFIG = require("../config/config");
const AuthController = require("../controllers/auth.controller");

router.route('/')
    .get(AuthController.checkAuth, SpecialistController.get)
    .post(AuthController.checkAuth, [
        body('name').isString(),
        body('group').isString()
    ], SpecialistController.create);

router.route("/deactivate/:id")
    .put(AuthController.checkAuth, [param("id").isMongoId()], SpecialistController.deactivate);

router.route("/activate/:id")
    .put(AuthController.checkAuth, [param("id").isMongoId()], SpecialistController.activate);

router.route('/:id')
    .get(AuthController.checkAuth, [param("id").isMongoId()], SpecialistController.getOne)
    .put(AuthController.checkAuth, [param("id").isMongoId()], SpecialistController.update)
    .delete(AuthController.checkAuth, [param("id").isMongoId()], SpecialistController.delete);

module.exports = router;