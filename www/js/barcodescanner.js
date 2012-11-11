/**
 * cordova is available under *either* the terms of the modified BSD license *or* the
 * MIT License (2008). See http://opensource.org/licenses/alphabetical for full text.
 *
 * Copyright (c) Matt Kane 2010
 * Copyright (c) 2011, IBM Corporation
 */
var BarcodeScanner = function () {};

//-------------------------------------------------------------------
BarcodeScanner.Encode = {
    TEXT_TYPE: "TEXT_TYPE",
    EMAIL_TYPE: "EMAIL_TYPE",
    PHONE_TYPE: "PHONE_TYPE",
    SMS_TYPE: "SMS_TYPE",
    //  CONTACT_TYPE: "CONTACT_TYPE",  // TODO:  not implemented, requires passing a Bundle class from Javascriopt to Java
    //  LOCATION_TYPE: "LOCATION_TYPE" // TODO:  not implemented, requires passing a Bundle class from Javascriopt to Java
};

//-------------------------------------------------------------------
BarcodeScanner.prototype.scan = function (successCallback, errorCallback) {
    if (errorCallback == null) {
        errorCallback = function () {}
    }

    if (typeof errorCallback != "function") {
        console.log("BarcodeScanner.scan failure: failure parameter not a function");
        return
    }

    if (typeof successCallback != "function") {
        console.log("BarcodeScanner.scan failure: success callback parameter must be a function");
        return
    }

    cordova.exec(successCallback, errorCallback, 'BarcodeScanner', 'scan', []);
};

//-------------------------------------------------------------------
BarcodeScanner.prototype.encode = function (type, data, successCallback, errorCallback, options) {
    if (errorCallback == null) {
        errorCallback = function () {}
    }

    if (typeof errorCallback != "function") {
        console.log("BarcodeScanner.scan failure: failure parameter not a function");
        return
    }

    if (typeof successCallback != "function") {
        console.log("BarcodeScanner.scan failure: success callback parameter must be a function");
        return
    }

    cordova.exec(successCallback, errorCallback, 'BarcodeScanner', 'encode', [{
        "type": type,
        "data": data,
        "options": options
    }]);
};

//-------------------------------------------------------------------

if (!window.plugins) {
    window.plugins = {};
}
if (!window.plugins.barcodeScanner) {
    window.plugins.barcodeScanner = new BarcodeScanner();
}


//-------------------------------------------------------------------
// Custom codes by kevin ############################################
//-------------------------------------------------------------------
function init() {
    console.log("GOT AN ONLOAD!!!")
    document.addEventListener("touchmove", preventBehavior, false);
    document.addEventListener("deviceready", deviceInfo, true);
}

var preventBehavior = function (e) {
    e.preventDefault();
};

var deviceInfo = function () {
    console.log("In deviceInfo!");
    document.getElementById("platform").innerHTML = device.platform;
    document.getElementById("version").innerHTML = device.version;
    document.getElementById("uuid").innerHTML = device.uuid;
}

function scan() {
    window.plugins.barcodeScanner.scan(function (result) {
        // alert("We got a barcode\n" +
        //       "Result: " + result.text + "\n" +
        //       "Format: " + result.format); 

        getEmployeeList(result.text);

    }, function (error) {
        alert("Scanning failed: " + error);
    });
}

/**
 * fetch the book details
 *
 */
function getEmployeeList(isbn) {
    // alert('working');

    // $.getJSON('https://www.googleapis.com/books/v1/volumes?q=harry+potter', function(data) {
    //     alert(data.totalItems);
    // });


    //var isbn = '9780316078245';

    $.getJSON('https://www.googleapis.com/books/v1/volumes?q=isbn:' + isbn, function (data) {
        //alert(data.totalItems);
        alert(data.items[0].volumeInfo.title);
    })
    .error(function () {
        alert("error. make sure you are connected to the internet");
    });

    return false;
}


function encode(type, data) {
    window.plugins.barcodeScanner.encode(type, data, function (result) {
        alert("encode success: " + result);
    }, function (error) {
        alert("encoding failed: " + error);
    });
}