'use strict';

const { ZigBeeDevice } = require('homey-meshdriver');
const { ZigBeeLightDevice } = require('homey-meshdriver');

class EcoDim07ZigbeeDevice extends ZigBeeLightDevice {

  async onMeshInit() {
    await super.onMeshInit();
    // enable debugging
    // this.enableDebug();

    // print the node's info to the console
    // this.printNode();

    this.log('GreenPowerProxy endpoint: ', this.getClusterEndpoint('genGreenPowerProxy'));

    if (this.getClusterEndpoint('genGreenPowerProxy') !== 0) {
      this.registerAttrReportListener('genOnOff', 'onOff', 1, 300, 1, value => {
        this.log('Report onoff', value);

        this.setCapabilityValue('onoff', value === 1);

        // force request to update dim value if switched on
        if (value === 1) this._getCapabilityValue('dim', 'genLevelCtrl');

        if (this.hasCapability('dim') && value === 0) this.setCapabilityValue('dim', value);
      }, 0);

      this.registerAttrReportListener('genLevelCtrl', 'currentLevel', 3, 300, 3, value => {
        this.log('Report dim', value);
        // only update dim level if onoff state is true
        if (this.getCapabilityValue('onoff') === true) {
          this.setCapabilityValue('dim', value / 254);
        }
      }, 0);
    }

    this.setAvailable();
    this.log('EcoDim.07 Zigbee device has been inited');
  }

}

module.exports = EcoDim07ZigbeeDevice;
/*
2019-09-01 12:34:17 [log] [ManagerDrivers] [eco-dim07-zigbee] [0] ------------------------------------------
2019-09-01 12:34:17 [log] [ManagerDrivers] [eco-dim07-zigbee] [0] Node: 144c4b6a-c483-4bcc-8d2f-df17eaf82053
2019-09-01 12:34:17 [log] [ManagerDrivers] [eco-dim07-zigbee] [0] - Battery: false
2019-09-01 12:34:17 [log] [ManagerDrivers] [eco-dim07-zigbee] [0] - Endpoints: 0
2019-09-01 12:34:17 [log] [ManagerDrivers] [eco-dim07-zigbee] [0] -- Clusters:
2019-09-01 12:34:17 [log] [ManagerDrivers] [eco-dim07-zigbee] [0] --- zapp
2019-09-01 12:34:17 [log] [ManagerDrivers] [eco-dim07-zigbee] [0] --- genBasic
2019-09-01 12:34:17 [log] [ManagerDrivers] [eco-dim07-zigbee] [0] ---- 65533 : 1
2019-09-01 12:34:17 [log] [ManagerDrivers] [eco-dim07-zigbee] [0] ---- cid : genBasic
2019-09-01 12:34:17 [log] [ManagerDrivers] [eco-dim07-zigbee] [0] ---- sid : attrs
2019-09-01 12:34:17 [log] [ManagerDrivers] [eco-dim07-zigbee] [0] ---- zclVersion : 6
2019-09-01 12:34:17 [log] [ManagerDrivers] [eco-dim07-zigbee] [0] ---- appVersion : 1
2019-09-01 12:34:17 [log] [ManagerDrivers] [eco-dim07-zigbee] [0] ---- stackVersion : 6
2019-09-01 12:34:17 [log] [ManagerDrivers] [eco-dim07-zigbee] [0] ---- hwVersion : 1
2019-09-01 12:34:17 [log] [ManagerDrivers] [eco-dim07-zigbee] [0] ---- manufacturerName : Ember
2019-09-01 12:34:17 [log] [ManagerDrivers] [eco-dim07-zigbee] [0] ---- modelId : Dimmer-Switch-ZB3.0
2019-09-01 12:34:17 [log] [ManagerDrivers] [eco-dim07-zigbee] [0] ---- dateCode :
2019-09-01 12:34:17 [log] [ManagerDrivers] [eco-dim07-zigbee] [0] ---- powerSource : 0
2019-09-01 12:34:17 [log] [ManagerDrivers] [eco-dim07-zigbee] [0] ---- swBuildId : 1.01
2019-09-01 12:34:17 [log] [ManagerDrivers] [eco-dim07-zigbee] [0] --- genIdentify
2019-09-01 12:34:17 [log] [ManagerDrivers] [eco-dim07-zigbee] [0] ---- 65533 : 1
2019-09-01 12:34:17 [log] [ManagerDrivers] [eco-dim07-zigbee] [0] ---- cid : genIdentify
2019-09-01 12:34:17 [log] [ManagerDrivers] [eco-dim07-zigbee] [0] ---- sid : attrs
2019-09-01 12:34:17 [log] [ManagerDrivers] [eco-dim07-zigbee] [0] ---- identifyTime : 0
2019-09-01 12:34:17 [log] [ManagerDrivers] [eco-dim07-zigbee] [0] --- genGroups
2019-09-01 12:34:18 [log] [ManagerDrivers] [eco-dim07-zigbee] [0] ---- 65533 : 1
2019-09-01 12:34:18 [log] [ManagerDrivers] [eco-dim07-zigbee] [0] ---- cid : genGroups
2019-09-01 12:34:18 [log] [ManagerDrivers] [eco-dim07-zigbee] [0] ---- sid : attrs
2019-09-01 12:34:18 [log] [ManagerDrivers] [eco-dim07-zigbee] [0] ---- nameSupport : 0
2019-09-01 12:34:18 [log] [ManagerDrivers] [eco-dim07-zigbee] [0] --- genScenes
2019-09-01 12:34:18 [log] [ManagerDrivers] [eco-dim07-zigbee] [0] ---- 65533 : 1
2019-09-01 12:34:18 [log] [ManagerDrivers] [eco-dim07-zigbee] [0] ---- cid : genScenes
2019-09-01 12:34:18 [log] [ManagerDrivers] [eco-dim07-zigbee] [0] ---- sid : attrs
2019-09-01 12:34:18 [log] [ManagerDrivers] [eco-dim07-zigbee] [0] ---- count : 0
2019-09-01 12:34:18 [log] [ManagerDrivers] [eco-dim07-zigbee] [0] ---- currentScene : 0
2019-09-01 12:34:18 [log] [ManagerDrivers] [eco-dim07-zigbee] [0] ---- currentGroup : 0
2019-09-01 12:34:18 [log] [ManagerDrivers] [eco-dim07-zigbee] [0] ---- sceneValid : 0
2019-09-01 12:34:18 [log] [ManagerDrivers] [eco-dim07-zigbee] [0] ---- nameSupport : 0
2019-09-01 12:34:18 [log] [ManagerDrivers] [eco-dim07-zigbee] [0] --- genOnOff
2019-09-01 12:34:18 [log] [ManagerDrivers] [eco-dim07-zigbee] [0] ---- 16387 : 255
2019-09-01 12:34:18 [log] [ManagerDrivers] [eco-dim07-zigbee] [0] ---- 65533 : 1
2019-09-01 12:34:18 [log] [ManagerDrivers] [eco-dim07-zigbee] [0] ---- cid : genOnOff
2019-09-01 12:34:18 [log] [ManagerDrivers] [eco-dim07-zigbee] [0] ---- sid : attrs
2019-09-01 12:34:18 [log] [ManagerDrivers] [eco-dim07-zigbee] [0] ---- onOff : 1
2019-09-01 12:34:18 [log] [ManagerDrivers] [eco-dim07-zigbee] [0] --- genLevelCtrl
2019-09-01 12:34:18 [log] [ManagerDrivers] [eco-dim07-zigbee] [0] ---- 65533 : 1
2019-09-01 12:34:18 [log] [ManagerDrivers] [eco-dim07-zigbee] [0] ---- cid : genLevelCtrl
2019-09-01 12:34:18 [log] [ManagerDrivers] [eco-dim07-zigbee] [0] ---- sid : attrs
2019-09-01 12:34:18 [log] [ManagerDrivers] [eco-dim07-zigbee] [0] ---- currentLevel : 254
2019-09-01 12:34:18 [log] [ManagerDrivers] [eco-dim07-zigbee] [0] --- genOta
2019-09-01 12:34:18 [log] [ManagerDrivers] [eco-dim07-zigbee] [0] ---- cid : genOta
2019-09-01 12:34:18 [log] [ManagerDrivers] [eco-dim07-zigbee] [0] ---- sid : attrs
2019-09-01 12:34:18 [log] [ManagerDrivers] [eco-dim07-zigbee] [0] --- haDiagnostic
2019-09-01 12:34:18 [log] [ManagerDrivers] [eco-dim07-zigbee] [0] ---- 65533 : 1
2019-09-01 12:34:18 [log] [ManagerDrivers] [eco-dim07-zigbee] [0] ---- cid : haDiagnostic
2019-09-01 12:34:18 [log] [ManagerDrivers] [eco-dim07-zigbee] [0] ---- sid : attrs
2019-09-01 12:34:18 [log] [ManagerDrivers] [eco-dim07-zigbee] [0] ---- lastMessageLqi : 188
2019-09-01 12:34:18 [log] [ManagerDrivers] [eco-dim07-zigbee] [0] ---- lastMessageRssi : -53
2019-09-01 12:34:18 [log] [ManagerDrivers] [eco-dim07-zigbee] [0] - Endpoints: 1
2019-09-01 12:34:18 [log] [ManagerDrivers] [eco-dim07-zigbee] [0] -- Clusters:
2019-09-01 12:34:18 [log] [ManagerDrivers] [eco-dim07-zigbee] [0] --- zapp
2019-09-01 12:34:18 [log] [ManagerDrivers] [eco-dim07-zigbee] [0] --- genGreenPowerProxy
2019-09-01 12:34:18 [log] [ManagerDrivers] [eco-dim07-zigbee] [0] ---- cid : genGreenPowerProxy
2019-09-01 12:34:18 [log] [ManagerDrivers] [eco-dim07-zigbee] [0] ---- sid : attrs
2019-09-01 12:34:18 [log] [ManagerDrivers] [eco-dim07-zigbee] [0] ------------------------------------------

2020 Zigbee only hwVersion

2020-03-14 20:48:27 [log] [ManagerDrivers] [eco-dim07-zigbee] [0] ------------------------------------------
2020-03-14 20:48:27 [log] [ManagerDrivers] [eco-dim07-zigbee] [0] Node: d6f42e8f-3ad0-4fd3-aa01-472839e9ed69
2020-03-14 20:48:27 [log] [ManagerDrivers] [eco-dim07-zigbee] [0] - Battery: false
2020-03-14 20:48:27 [log] [ManagerDrivers] [eco-dim07-zigbee] [0] - Endpoints: 0
2020-03-14 20:48:27 [log] [ManagerDrivers] [eco-dim07-zigbee] [0] -- Clusters:
2020-03-14 20:48:27 [log] [ManagerDrivers] [eco-dim07-zigbee] [0] --- zapp
2020-03-14 20:48:27 [log] [ManagerDrivers] [eco-dim07-zigbee] [0] --- genBasic
2020-03-14 20:48:27 [log] [ManagerDrivers] [eco-dim07-zigbee] [0] ---- 65533 : 1
2020-03-14 20:48:27 [log] [ManagerDrivers] [eco-dim07-zigbee] [0] ---- cid : genBasic
2020-03-14 20:48:27 [log] [ManagerDrivers] [eco-dim07-zigbee] [0] ---- sid : attrs
2020-03-14 20:48:27 [log] [ManagerDrivers] [eco-dim07-zigbee] [0] ---- zclVersion : 3
2020-03-14 20:48:28 [log] [ManagerDrivers] [eco-dim07-zigbee] [0] ---- appVersion : 3
2020-03-14 20:48:28 [log] [ManagerDrivers] [eco-dim07-zigbee] [0] ---- stackVersion : 6
2020-03-14 20:48:28 [log] [ManagerDrivers] [eco-dim07-zigbee] [0] ---- hwVersion : 1
2020-03-14 20:48:28 [log] [ManagerDrivers] [eco-dim07-zigbee] [0] ---- manufacturerName : EcoDim B.V
2020-03-14 20:48:28 [log] [ManagerDrivers] [eco-dim07-zigbee] [0] ---- modelId : Dimmer-Switch-ZB3.0
2020-03-14 20:48:28 [log] [ManagerDrivers] [eco-dim07-zigbee] [0] ---- dateCode : 20191105
2020-03-14 20:48:28 [log] [ManagerDrivers] [eco-dim07-zigbee] [0] ---- powerSource : 1
2020-03-14 20:48:28 [log] [ManagerDrivers] [eco-dim07-zigbee] [0] ---- swBuildId : 3.04
2020-03-14 20:48:28 [log] [ManagerDrivers] [eco-dim07-zigbee] [0] --- genIdentify
2020-03-14 20:48:28 [log] [ManagerDrivers] [eco-dim07-zigbee] [0] ---- 65533 : 1
2020-03-14 20:48:28 [log] [ManagerDrivers] [eco-dim07-zigbee] [0] ---- cid : genIdentify
2020-03-14 20:48:28 [log] [ManagerDrivers] [eco-dim07-zigbee] [0] ---- sid : attrs
2020-03-14 20:48:28 [log] [ManagerDrivers] [eco-dim07-zigbee] [0] ---- identifyTime : 0
2020-03-14 20:48:28 [log] [ManagerDrivers] [eco-dim07-zigbee] [0] --- genGroups
2020-03-14 20:48:28 [log] [ManagerDrivers] [eco-dim07-zigbee] [0] ---- 65533 : 1
2020-03-14 20:48:28 [log] [ManagerDrivers] [eco-dim07-zigbee] [0] ---- cid : genGroups
2020-03-14 20:48:28 [log] [ManagerDrivers] [eco-dim07-zigbee] [0] ---- sid : attrs
2020-03-14 20:48:28 [log] [ManagerDrivers] [eco-dim07-zigbee] [0] ---- nameSupport : 0
2020-03-14 20:48:28 [log] [ManagerDrivers] [eco-dim07-zigbee] [0] --- genScenes
2020-03-14 20:48:28 [log] [ManagerDrivers] [eco-dim07-zigbee] [0] ---- 65533 : 1
2020-03-14 20:48:28 [log] [ManagerDrivers] [eco-dim07-zigbee] [0] ---- cid : genScenes
2020-03-14 20:48:28 [log] [ManagerDrivers] [eco-dim07-zigbee] [0] ---- sid : attrs
2020-03-14 20:48:28 [log] [ManagerDrivers] [eco-dim07-zigbee] [0] ---- count : 0
2020-03-14 20:48:28 [log] [ManagerDrivers] [eco-dim07-zigbee] [0] ---- currentScene : 0
2020-03-14 20:48:28 [log] [ManagerDrivers] [eco-dim07-zigbee] [0] ---- currentGroup : 0
2020-03-14 20:48:28 [log] [ManagerDrivers] [eco-dim07-zigbee] [0] ---- sceneValid : 0
2020-03-14 20:48:28 [log] [ManagerDrivers] [eco-dim07-zigbee] [0] ---- nameSupport : 0
2020-03-14 20:48:28 [log] [ManagerDrivers] [eco-dim07-zigbee] [0] --- genOnOff
2020-03-14 20:48:28 [log] [ManagerDrivers] [eco-dim07-zigbee] [0] ---- 16387 : 0
2020-03-14 20:48:28 [log] [ManagerDrivers] [eco-dim07-zigbee] [0] ---- 65533 : 1
2020-03-14 20:48:28 [log] [ManagerDrivers] [eco-dim07-zigbee] [0] ---- cid : genOnOff
2020-03-14 20:48:28 [log] [ManagerDrivers] [eco-dim07-zigbee] [0] ---- sid : attrs
2020-03-14 20:48:28 [log] [ManagerDrivers] [eco-dim07-zigbee] [0] ---- onOff : 0
2020-03-14 20:48:28 [log] [ManagerDrivers] [eco-dim07-zigbee] [0] --- genLevelCtrl
2020-03-14 20:48:28 [log] [ManagerDrivers] [eco-dim07-zigbee] [0] ---- 15 : 0
2020-03-14 20:48:28 [log] [ManagerDrivers] [eco-dim07-zigbee] [0] ---- 65533 : 1
2020-03-14 20:48:28 [log] [ManagerDrivers] [eco-dim07-zigbee] [0] ---- cid : genLevelCtrl
2020-03-14 20:48:28 [log] [ManagerDrivers] [eco-dim07-zigbee] [0] ---- sid : attrs
2020-03-14 20:48:28 [log] [ManagerDrivers] [eco-dim07-zigbee] [0] ---- currentLevel : 64
2020-03-14 20:48:28 [log] [ManagerDrivers] [eco-dim07-zigbee] [0] --- genOta
2020-03-14 20:48:28 [log] [ManagerDrivers] [eco-dim07-zigbee] [0] ---- cid : genOta
2020-03-14 20:48:28 [log] [ManagerDrivers] [eco-dim07-zigbee] [0] ---- sid : attrs
2020-03-14 20:48:28 [log] [ManagerDrivers] [eco-dim07-zigbee] [0] --- haDiagnostic
2020-03-14 20:48:28 [log] [ManagerDrivers] [eco-dim07-zigbee] [0] ---- 65533 : 1
2020-03-14 20:48:28 [log] [ManagerDrivers] [eco-dim07-zigbee] [0] ---- cid : haDiagnostic
2020-03-14 20:48:28 [log] [ManagerDrivers] [eco-dim07-zigbee] [0] ---- sid : attrs
2020-03-14 20:48:28 [log] [ManagerDrivers] [eco-dim07-zigbee] [0] ---- averageMacRetryPerApsMessageSent : 0
2020-03-14 20:48:28 [log] [ManagerDrivers] [eco-dim07-zigbee] [0] ---- lastMessageLqi : 252
2020-03-14 20:48:28 [log] [ManagerDrivers] [eco-dim07-zigbee] [0] ---- lastMessageRssi : -37
2020-03-14 20:48:28 [log] [ManagerDrivers] [eco-dim07-zigbee] [0] --- lightLink
2020-03-14 20:48:28 [log] [ManagerDrivers] [eco-dim07-zigbee] [0] ---- 65533 : 1
2020-03-14 20:48:28 [log] [ManagerDrivers] [eco-dim07-zigbee] [0] ---- cid : lightLink
2020-03-14 20:48:28 [log] [ManagerDrivers] [eco-dim07-zigbee] [0] ---- sid : attrs
2020-03-14 20:48:28 [log] [ManagerDrivers] [eco-dim07-zigbee] [0] - Endpoints: 1
2020-03-14 20:48:28 [log] [ManagerDrivers] [eco-dim07-zigbee] [0] -- Clusters:
2020-03-14 20:48:28 [log] [ManagerDrivers] [eco-dim07-zigbee] [0] --- zapp
2020-03-14 20:48:28 [log] [ManagerDrivers] [eco-dim07-zigbee] [0] --- genGreenPowerProxy
2020-03-14 20:48:28 [log] [ManagerDrivers] [eco-dim07-zigbee] [0] ---- cid : genGreenPowerProxy
2020-03-14 20:48:28 [log] [ManagerDrivers] [eco-dim07-zigbee] [0] ---- sid : attrs
2020-03-14 20:48:28 [log] [ManagerDrivers] [eco-dim07-zigbee] [0] ------------------------------------------

*/
