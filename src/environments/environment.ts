// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  appName: "lamaterexpress",
  firebase: {
    apiKey: "AIzaSyBhyRrOyHAoMd9nkOxN08dAYVFKPWY9oCg",
    authDomain: "lamaterexpress.firebaseapp.com",
    databaseURL: "https://lamaterexpress.firebaseio.com",
    projectId: "lamaterexpress",
    storageBucket: "lamaterexpress.appspot.com",
    messagingSenderId: "881908901174",
    appId: "1:881908901174:web:1d81cb1f31d1da1678bf97",
    measurementId: "G-YQKY8B0BV5"
  },
  // url: 'http://localhost:8010',
  // storage: 'http://localhost:8010/storage',
  url: 'https://shop.mystore.africa',
  storage: 'https://shop.mystore.africa/storage',
  company_id: 6,
  // api: '/api/2020-04/',
  api: '/api/2021-05/',
  stripe: 'pk_test_93YuwyRJP23j8pPtIxCdbAre'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
