const
  dotenv = require("dotenv").config(),
  revolut = require("../index.js");

const
  apikey=process.env.MY_API_KEY,
  secret=process.env.MY_API_SECRET,
  privateAPI=new revolut.privateApi({ "apikey": apikey, "secret": secret });
  timeout=privateAPI.timeout;

const
  symbol="BTC-USD",
  quote="USD",
  base="BTC",
  limit=5,
  depth=5;

// Normal requests

describe('Balance', () => {

  test('Test getAllBalances() function', async () => {
    const result=await privateAPI.getAllBalances();
    expect(Array.isArray(result)).toBe(true);
  }, timeout);

});

describe('Configuration', () => {

  test('Test getAllCurrencies() function', async () => {
    const result=await privateAPI.getAllCurrencies();
    expect(result).toHaveProperty("BTC");
  }, timeout);

  test('Test getAllCurrencyPairs() function', async () => {
    const result=await privateAPI.getAllCurrencyPairs();
    expect(result).toHaveProperty("BTC/USD");
  }, timeout);

});

describe('Orders', () => {

  test('Test getActiveOrders() function', async () => {
    const options={limit: 1};
    const result=await privateAPI.getActiveOrders(options);
    expect(result).toHaveProperty("data");
  }, timeout);

  test('Test getHistoricalOrders() function', async () => {
    const options={limit: 1};
    const result=await privateAPI.getHistoricalOrders(options);
    expect(result).toHaveProperty("data");
  }, timeout);

  // RevolutPrivate.prototype.placeOrder
  // RevolutPrivate.prototype.getOrderByID
  // RevolutPrivate.prototype.cancelOrderByID
  // RevolutPrivate.prototype.getFillsByID

  test('Test cancelOrders() function', async () => {
    const result=await privateAPI.cancelOrders();
    expect(result).toBe('');
  }, timeout);

});

describe('Trades', () => {

  test('Test getPublicTrades() function', async () => {
    const options={limit: 1};
    const result=await privateAPI.getPublicTrades(symbol, options);
    expect(result).toHaveProperty("data");
  }, timeout);

  test('Test getClientTrades() function', async () => {
    const options={limit: 1};
    const result=await privateAPI.getClientTrades(symbol, options);
    expect(result).toHaveProperty("data");
  }, timeout);

});

describe('Market Data', () => {

  test('Test getOrderbook() function', async () => {
    const options={limit: 1};
    const result=await privateAPI.getOrderbook(symbol);
    expect(result).toHaveProperty("data");
  }, timeout);

  test('Test getCandles() function', async () => {
    const options={interval: 60};
    const result=await privateAPI.getCandles(symbol, options);
    expect(result).toHaveProperty("data");
  }, timeout);

  test('Test getTickers() function', async () => {
    const options={limit: 1};
    const result=await privateAPI.getTickers(symbo);
    expect(result).toHaveProperty("data");
  }, timeout);

});

// Helper functions

function stringIsJSON(str) {
  try { 
    JSON.parse(str);
    return true;
  } catch {
    return false;
  }
};

function stringIsArray(str) {
  try { 
    return Array.isArray(str);
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

function checkError(obj,code,reason) {
  if(obj.code==code && obj.reason==reason) { return true; }
  return false;
};