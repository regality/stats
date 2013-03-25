var numbers           = require('numbers')
  , Table             = require('easy-table')
  , gunRates          = require('./data/gun_rates.json')
  , homicideRates     = require('./data/homicide_rates.json')
  , povertyRates      = require('./data/poverty_rates.json')
  , populationDensity = require('./data/population_density.json')
  , housingIndex      = require('./data/housing_cost_index.json')
  , states            = []
  ;

for (var state in gunRates) {
  states.push({
    state: state,
    guns: gunRates[state],
    homicides: homicideRates[state],
    poverty: povertyRates[state],
    density: populationDensity[state],
    housing: housingIndex[state]
  });
}

var t = new Table();

states.sort(function(a, b) {
  var key = 'guns';
  return b[key] - a[key];
});

console.log(states);

states.forEach(function(state) {
  t.cell('state', state.state);
  t.cell('guns owners', state.guns.toFixed(1));
  t.cell('homicides', state.homicides.toFixed(1));
  t.cell('poverty', state.poverty.toFixed(1));
  t.cell('density', state.density.toFixed(1));
  t.cell('housing', state.housing.toFixed(1));
  t.newRow();
});

console.log(t.toString());

var gunsArr     = states.map(function(state) { return state.guns });
var homicideArr = states.map(function(state) { return state.homicides });
var povertyArr  = states.map(function(state) { return state.poverty });
var densityArr  = states.map(function(state) { return state.density });
var housingArr  = states.map(function(state) { return state.housing });

console.log('poverty to density:', numbers.statistic.correlation(povertyArr, densityArr));

console.log('guns to homicide:', numbers.statistic.correlation(gunsArr, homicideArr));
console.log('poverty to homicide:', numbers.statistic.correlation(povertyArr, homicideArr));
console.log('density to homicide:', numbers.statistic.correlation(densityArr, homicideArr));
console.log('housing cost to homicide:', numbers.statistic.correlation(housingArr, homicideArr));

