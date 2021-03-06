//
// Copyright 2014 Create-net.org
// All Rights Reserved.
//

'use strict';
var nagios = require('./common/nagios');

// Region information plugin parses all information from the OpenStack Data Collector component
// nRegion, nVMActive, nVMTot, nCoreUsed, nCoreTot, nRamUsed, nRamTot,nHDUsed, nHDTot,nUsers, location, latitude, longitude

var parser = Object.create(nagios.parser);
parser.getContextAttrs = function(multilineData, multilinePerfData) {
    var data  = multilineData.split('\n')[0];   // only consider first line of data, discard perfData
    var attrs = { coreUsed: NaN, coreTot: NaN , vmUsed: NaN, vmTot: NaN,hdUsed: NaN,hdTot: NaN,ramUsed: NaN,ramTot: NaN,  nUser: NaN,location: NaN, latitude: NaN, longitude: NaN};
    var items = data.split(',');
    if ((items.length)>0 ) {
        for (var i = 0; i < items.length; i++){
            var element=items[i]
            if (element.split(':')[0].replace(/\s/g, '')=="coreUsed")
                attrs.coreUsed=element.split(':')[1].replace(/\s/g, '')
            if (element.split(':')[0].replace(/\s/g, '')=="coreTot")
                attrs.coreTot=element.split(':')[1].replace(/\s/g, '')
            if (element.split(':')[0].replace(/\s/g, '')=="vmUsed")
                attrs.vmUsed=element.split(':')[1].replace(/\s/g, '')
            if (element.split(':')[0].replace(/\s/g, '')=="vmTot")
                attrs.vmTot=element.split(':')[1].replace(/\s/g, '')
            if (element.split(':')[0].replace(/\s/g, '')=="hdUsed")
                attrs.hdUsed=element.split(':')[1].replace(/\s/g, '')
            if (element.split(':')[0].replace(/\s/g, '')=="hdTot")
                attrs.hdTot=element.split(':')[1].replace(/\s/g, '')
            if (element.split(':')[0].replace(/\s/g, '')=="ramUsed")
                attrs.ramUsed=element.split(':')[1].replace(/\s/g, '')
            if (element.split(':')[0].replace(/\s/g, '')=="ramTot")
                attrs.ramTot=element.split(':')[1].replace(/\s/g, '')
            if (element.split(':')[0].replace(/\s/g, '')=="nUser")
                attrs.nUser=element.split(':')[1].replace(/\s/g, '')
            if (element.split(':')[0].replace(/\s/g, '')=="location")
                attrs.location=element.split(':')[1].replace(/\s/g, '')
            if (element.split(':')[0].replace(/\s/g, '')=="latitude")
                attrs.latitude=element.split(':')[1].replace(/\s/g, '')
            if (element.split(':')[0].replace(/\s/g, '')=="longitude")
                attrs.longitude=element.split(':')[1].replace(/\s/g, '')
	}
    }
    else{
        throw new Error('No valid users data found');
    }
    console.log(attrs);
    return attrs;
};
exports.parser = parser;
