// takes an adjacencyList
// ->
// returns {id1: distance1, id2: distance2 . . . idn: distancen}
// Maybe should be list? 
exports.findConnections = function findConnections(list, userId, result, distance) {
  result = result || {};
  distance = distance || 0;
  result[userId] = distance;
  list[userId].edges.forEach(function (id) {
    if (!result.hasOwnProperty(id)) {
      findConnections(list, id, result, distance +1); 
    }
  });
  return result;
};

exports.adjacencyList = function (inputArray) {
  return inputArray.reduce(function (newCollection, currentObject) {

    newCollection[currentObject.user_id] = newCollection[currentObject.user_id] || {
      name: currentObject.name,
      edges:[]
    };
    newCollection[currentObject.other_id] = newCollection[currentObject.other_id] || {
      name: currentObject.other_name,
      edges:[]
    };

    newCollection[currentObject.other_id].edges.push(currentObject.user_id);
    newCollection[currentObject.user_id].edges.push(currentObject.other_id);

    return newCollection;
  }, {});
};

