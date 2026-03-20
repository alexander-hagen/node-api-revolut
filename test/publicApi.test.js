const
  revolut = require("../index.js");

const
  publicAPI=new revolut.publicApi(),
  timeout=publicAPI.timeout;

const
  symbol="BTC-USD",
  quote="USD",
  base="BTC",
  limit=5,
  depth=5;

// Normal requests

test('Test getLastTades() function', async () => {
  const result=await publicAPI.getLastTrades();
  expect(result).toHaveProperty("data");
}, timeout);

test('Test getOrderbook() function', async () => {
  const result=await publicAPI.getOrderbook(symbol);
  expect(result).toHaveProperty("data");
}, timeout);

// Error testing


// Helper functions

function stringIsJSON(str) {
  try { 
    JSON.parse(str);
    return true;
  } catch {
    return false;
  }
};

function objectIsJSON(obj) {
  try { 
    JSON.parse(JSON.stringify(obj));
    return true;
  } catch {
    return false;
  }
};
