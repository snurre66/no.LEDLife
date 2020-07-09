'use strict';

const Homey = require('homey');

class EcoDimApp extends Homey.App {

  onInit() {
    this.log('EcoDim app is running...');
  }

}

module.exports = EcoDimApp;
