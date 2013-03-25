var numbers = require('numbers')
  , Table   = require('easy-table')
  , states  = require('./data/states')
  , data    = {}
  , groups   = [
      'alcohol_use',
      'gun_ownership',
      'homicide',
      'housing_cost_index',
      'illicit_drug_use',
      'poverty',
      'population_density'
    ]
  ;

groups.forEach(function(group) {
  var numbers = require('./data/' + group + '.json');
  data[group] = numbers;
});

states = states.map(function(name) {
  state = {
    state: name
  };

  groups.forEach(function(group) {
    state[group] = data[group][name];
  });

  return state;
});

var t = new Table();

states.sort(function(a, b) {
  var key = 'homicide';
  return b[key] - a[key];
});

function addPipe(str) {
  return '| ' + str;
}

states.forEach(function(state) {
  t.cell('state', state.state);
  groups.forEach(function(group) {
    t.cell(addPipe(group.replace(/_/g, ' ')), state[group].toFixed(1), addPipe);
  });
  t.newRow();
});

groups.forEach(function(group) {
  if (group === 'homicide') return;
  var homicideArr = states.map(function(state) { return state.homicide });
  var otherArr = states.map(function(state) { return state[group] });
  console.log(group.replace(/_/g, ' ') + ' to homicide:', numbers.statistic.correlation(otherArr, homicideArr));
  console.log();
});

console.log(t.toString());

