// DEPENDENCIES
var pool = require('../db_fsdic');
const { log } = require('debug');

/* AIRPORT INFORMATION API MODEL*/
var col_name = 'airport_id, ident, iata, name, country, region, tower_frequency, unicom_frequency, longest_runway_width, longest_runway_length, longest_runway_heading, num_runways, left_lonx, top_laty, right_lonx, bottom_laty, mag_var, altitude, lonx, laty, transition_altitude';
// CREATE

// READ
// Get ALL AIRPORT INFORMATIONS
var getAllAirportInfos = function(req, res, next) {
    pool.query(getAirportQuerybyParam('', req), (err, results) => {
        console.log('[API-GET]Getting all airport information');
        if (err) throw err;
        res.status(200).set('content-Type', 'application/json').json(results.rows);
    });
};

// Get Airport informations by airport name
var getAirportInfosbyairportName = function(req, res, next) {
    var name = req.params.airportname;
    name = '\%' + name.toUpperCase() + '\%';
    console.log('[API-GET]Getting airport information by airport name => ' + name);
    pool.query(getAirportQuerybyParam('airportname', req), (err, results) => {
        if (err) throw err;
        res.status(200).set('content-Type', 'application/json').json(results.rows);
    });
};

// Get Airport informations by ICAO CODE
var getAirportInfosbyICAO = function(req, res, next) {
    var icao = req.params.icao;
    icao = '\%' + icao.toUpperCase() + '\%';
    console.log('[API-GET]Getting airport information by icao => ' + icao);
    pool.query(getAirportQuerybyParam('icao', req), (err, results) => {
        if (err) throw err;
        res.status(200).set('content-Type', 'application/json').json(results.rows);
    });
};

// Get Airport Information by Country
var getAirportInfosbyCountry = function(req, res, next) {
    var country = req.params.country;
    icao = '\%' + country.toUpperCase() + '\%';
    console.log('[API-GET]Getting airport information by country => ' + country);
    pool.query(getAirportQuerybyParam('country', req), (err, results) => {
        if (err) throw err;
        res.status(200).set('content-Type', 'application/json').json(results.rows);
    });
};

// Get Airport Information by JSON
var getAirportInfosbyJSON = function(req, res, next) {
    var query = getAirportQuery(req);
    console.log(query);
    pool.query(query, (err, results) => {
        if (err) throw err;
        res.status(200).set('content-Type', 'application/json').json(results.rows);
    });
};

// Get Airport runway Inforamtion by airport_id
var getAirportRunwayInfobyAirportID = function(req, res, next) {
    var query = getRunwayQuery('runway', req.params.airportid);
    console.log('airport info get query for runway info: ' + query);
    pool.query(query, (err, results) => {
        if (err) throw err;
        res.status(200).set('content-Type', 'application/json').json(results.rows);
    });
};

// Get Airport runway Inforamtion by airport_id
var getAirportComInfobyAirportID = function(req, res, next) {
    var query = getRunwayQuery('com', req.params.airportid);
    console.log('airport info get query for com info: ' + query);
    pool.query(query, (err, results) => {
        if (err) throw err;
        res.status(200).set('content-Type', 'application/json').json(results.rows);
    });
};

// Get Country name in Airport DB
var getCountrysInAirport = function(req, res, next) {
    pool.query('SELECT DISTINCT country FROM airport;', (err, results) => {
        if (err) throw err;
        res.status(200).set('content-Type', 'application/json').json(results.rows);
    });
};
// Get Region in Airport DB
var getRegionInAirport = function(req, res, next) {
    pool.query('SELECT DISTINCT region FROM airport;', (err, results) => {
        if (err) throw err;
        res.status(200).set('content-Type', 'application/json').json(results.rows);
    });
};

/////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Make sql query by url param
var getAirportQuerybyParam = function(getype, req) {
    var query = 'SELECT ' + col_name + ' FROM airport';

    if (getype === 'airportname') {
        query = query + ' WHERE UPPER(name) LIKE \'\%' + (req.params.airportname).toUpperCase() + '\%\'';
    } else if (getype === 'icao') {
        query = query + ' WHERE UPPER(ident) LIKE \'\%' + (req.params.icao).toUpperCase() + '\%\'';
    } else if (getype === 'country') {
        query = query + ' WHERE UPPER(country) LIKE \'\%' + (req.params.country).toUpperCase() + '\%\'';
    } else {

    }

    query = query + ' ORDER BY airport_id ASC;';

    console.log('airport info get query by param: ' + query);

    return query;
};

// Make sql query by body(json)
var getAirportQuery = function(req) {
    var ident = req.body.ident;
    var name = req.body.name;
    var country = req.body.country;
    var region = req.body.region;

    var query = 'SELECT ' + col_name + ' FROM airport WHERE ';

    if (ident) {
        query = query + 'UPPER(ident) LIKE ' + '\'\%' + ident.toUpperCase() + '\%\'';
    }

    if (name) {
        if (ident) query = query + ' AND ';
        query = query + 'UPPER(name) LIKE ' + '\'\%' + name.toUpperCase() + '\%\'';
    }

    if (country) {
        if (ident || name) query = query + ' AND ';
        query = query + 'UPPER(country) LIKE ' + '\'\%' + country.toUpperCase() + '\%\'';
    }

    if (region) {
        if (ident || name || country) query = query + ' AND ';
        query = query + 'UPPER(region) LIKE ' + '\'\%' + region.toUpperCase() + '\%\'';
    }

    query = query + ' ORDER BY airport_id ASC;';

    console.log('airport info get query by json: ' + query);

    return query;
};

// Make sql query by airportid for airport runway or getype info.
var getRunwayQuery = function(getype, id) {
    var tableName = '';

    if (getype === 'runway') {
        tableName = 'runway';
    } else if (getype === 'com') {
        tableName = 'com';
    }

    var query = 'SELECT * FROM ' + tableName + ' WHERE airport_id = \'' + id + '\';';

    return query;
};

module.exports = {
    getAllAirportInfos,
    getAirportInfosbyairportName,
    getAirportInfosbyICAO,
    getAirportInfosbyCountry,
    getCountrysInAirport,
    getRegionInAirport,
    getAirportInfosbyJSON,
    getAirportRunwayInfobyAirportID,
    getAirportComInfobyAirportID
};