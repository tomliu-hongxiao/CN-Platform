import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyAPTUtXrRvvMGRctolLcA1aXupxPjsk9sg",
  authDomain: "cn-platform-bf548.firebaseapp.com",
  databaseURL: "https://cn-platform-bf548-default-rtdb.firebaseio.com",
  projectId: "cn-platform-bf548",
  storageBucket: "cn-platform-bf548.appspot.com",
  messagingSenderId: "738725706734",
  appId: "1:738725706734:web:0261f6e92b7322ddd06cff"
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