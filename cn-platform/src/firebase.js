import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

const firebaseConfig = {
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

export const getTSLASummary = () => {
  return db.collection('backtesting')
    .doc('TSLA_Summary').get()
}

export const getTSLATradeList = () => {
  return db.collection('backtesting')
    .doc('TSLA_TradeList').get()
}

export const getFUTUSummary = () => {
  return db.collection('backtesting')
    .doc('FUTU_Summary').get()
}

export const getFUTUTradeList = () => {
  return db.collection('backtesting')
    .doc('FUTU_TradeList').get()
}

export const getTSLAShortSupportLevel = () => {
  return db.collection('backtesting')
    .doc('TSLA_short_support_level').get()
}

export const getFUTUShortSupportLevel = () => {
  return db.collection('backtesting')
    .doc('FUTU_short_support_level').get()
}

export const getTSLAChart = () => {
  return db.collection('stockData_5m')
    .doc('TSLA').get()
}

getTSLAChart().then(result => {
  const temp = result.data()
  console.log(temp)
  for (var key in temp) {
    console.log(temp[key])
}
})