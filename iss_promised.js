const request = require('request-promise-native');

const fetchMyIP = function() {
  return request('https://api.ipify.org?format=json');
};

// iss_promised.js: 

// ...

/* 
 * Makes a request to ipvigilante.com using the provided IP address, to get its geographical information (latitude/longitude)
 * Input: JSON string containing the IP address
 * Returns: Promise of request for lat/lon
 */
const fetchCoordsByIP = function(body) {
  const ip = JSON.parse(body).ip;
  return request(`https://ipvigilante.com/json/${ip}`);  
};


const fetchISSFlyOverTimes = function(body) {
  // ...
  const {longitude, latitude}  = JSON.parse(body).data;
  return request(`http://api.open-notify.org/iss-pass.json?lat=${latitude}&lon=${longitude}`);
};


const nextISSTimesForMyLocation = function() {
  return fetchMyIP().then(body => fetchCoordsByIP(body))
           .then(body => fetchISSFlyOverTimes(body))
           .then((data) => {
            const { response } = JSON.parse(data);
            return response;
          });
  
}

module.exports = { nextISSTimesForMyLocation };
//module.exports = { fetchMyIP, fetchCoordsByIP, fetchISSFlyOverTimes };