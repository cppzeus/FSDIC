// DEPENDENCIES
var express = require('express');
var router = express.Router();
var path = require('path');
var fsdic_model = require('../models/model_fsdic');

router.use(express.json());
router.use(express.urlencoded({ extended: true }));

/* Get fsdic api document */
router.get('/', (req, res, next) => {
    res.send('respond with a fsdic api resource');
});

/* API for airport info */
// Get all airport infos
router.get('/api/airportinfos', fsdic_model.getAllAirportInfos);

// Get Airport Information by JSON
router.get('/api/airportinfos/json', fsdic_model.getAirportInfosbyJSON);

// Get airport infos by airport name.
router.get('/api/airportinfos/airportname/:airportname', fsdic_model.getAirportInfosbyairportName);

// Get Airport informations by ICAO CODE
router.get('/api/airportinfos/icao/:icao', fsdic_model.getAirportInfosbyICAO);

// Get Airport informations by Country
router.get('/api/airportinfos/country/:country', fsdic_model.getAirportInfosbyCountry);

// Get Airport runways inforation by airport ID
router.get('/api/airportinfos/runway/:airportid', fsdic_model.getAirportRunwayInfobyAirportID);

// Get Airport coms inforation by airport ID
router.get('/api/airportinfos/com/:airportid', fsdic_model.getAirportComInfobyAirportID);

/////////////////////////////////////////////////////////////////////////////////////////////////////////
// Country name in Airport DB
router.get('/api/airportinfos/countrydata', fsdic_model.getCountrysInAirport);

// Region in Airport DB
router.get('/api/airportinfos/regiondata', fsdic_model.getRegionInAirport);

module.exports = router;