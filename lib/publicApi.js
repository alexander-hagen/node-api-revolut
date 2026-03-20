const
  axios = require('axios'),
  { RateLimiter,TokenBucket } = require('limiter');

const
  bucket={
    default: new TokenBucket({ bucketSize: 50, tokensPerInterval: 20, interval: "second" })
  };

// 1️⃣ Define the constructor first
var RevolutPublic = function() {
  this.endPoint = "https://revx.revolut.com";
  this.timeout = 5000;
  this.keepalive = false;
};

var publicApi = module.exports = function() {
  return new RevolutPublic();
};

// 2️⃣ Define prototype methods

// Core query method
RevolutPublic.prototype.query = async function(options) {
  try {
    const res = await axios(options);
    return res.data;
  } catch (err) {
    // Normalize error response
    const response = { data: options };

    if (!err.response) {
      Object.assign(response, { status: "503", error: err.code });
    } else {
      Object.assign(response, { status: err.response.status, error: err.response.statusText });

      if (err.response.data && typeof err.response.data === "object") {
        Object.assign(response, { error: err.response.data.code, reason: err.response.data.message });
      }
    }

    return response;
  }
};

// Helper for GET requests
RevolutPublic.prototype.getQuery = async function(path, query) {
  const options = {
    method: "GET",
    url: this.endPoint + path,
    params: query,   // Corrected from qs: query
  };
  return this.query(options);
};

// Public Market Data

RevolutPublic.prototype.getLastTrades = async function() {
  const path = "/api/1.0/public/last-trades";
  const remaining=await bucket["default"].removeTokens(1);
  return await new Promise(async (resolve, reject) => {
    const result=await this.getQuery(path,{});
    if(result.hasOwnProperty("error_id")) { reject(result); } else { resolve(result); };
  });
};

RevolutPublic.prototype.getOrderbook = async function(symbol) {
  const path = "/api/1.0/public/order-book/"+symbol;
  const remaining=await bucket["default"].removeTokens(1);
  return await new Promise(async (resolve, reject) => {
    const result=await this.getQuery(path,{});
    if(result.hasOwnProperty("error_id")) { reject(result); } else { resolve(result); };
  });
};

