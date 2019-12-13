var zipcodes = require('zipcodes');

class ZipCodeUtil{

    constructor(zipCodes){
        this.zipCodeArr = zipCodes;
    }

    getCityAndState(){
        let lookupArr = [];
        if(Array.isArray(this.zipCodeArr)){
            lookupArr = this.zipCodeArr.map((zipcode) => this.zipCodeLookup(zipcode));
        }else{
            lookupArr.push(this.zipCodeLookup(this.zipCodeArr));
        }
        return lookupArr;
    }

    zipCodeLookup(zipcode){
        return zipcodes.lookup(parseInt(zipcode));
    }
}

module.exports = ZipCodeUtil;