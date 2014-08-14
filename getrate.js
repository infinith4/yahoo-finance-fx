'use strict';
var util = require('util');
var child_process = require('child_process');
require('colors');
require('date-utils');
var cheerio = require('cheerio');
//var sleep = require('sleep');
var csv = require('csv');

//var formatted = dt.toFormat("YYYYMMDDHH24MISS");
//console.log(formatted);
var sleeptime = 5000; // 1 second: 1000
var max_count = 2;
var url = 'http://info.finance.yahoo.co.jp/fx/list/';
var wgetcmd = 'wget ' + url + ' -T 6000 -t 5';

var fs = require("fs");

var request = require('request');
var IntervalStream  = require('interval-stream');
var is = new IntervalStream(1000);
var dir = 'data';
var chartbid = '_chart_bid';
var chartask = '_chart_ask';
var IDArray = ['EURJPY', 'AUDJPY', 'GBPJPY', 'NZDJPY', 'CADJPY', 'CHFJPY', 'ZARJPY', 'CNHJPY', 'EURUSD', 'GBPUSD', 'AUDUSD', 'NZDUSD', 'HKDJPY', 'EURGBP', 'EURAUD', 'USDCHF', 'EURCHF', 'GBPCHF', 'AUDCHF', 'CADCHF', 'USDHKD']
for(var i=0; i<max_count; i++){
    var dt = new Date();
    var today = dt.toFormat("YYYYMMDD");
    console.log(i + "回目\n");
    
    var currentdate = dt.toFormat("YYYYMMDDHH24MISS");
    console.log(currentdate);
    request(url)
	.pipe(fs.createWriteStream(dir + '/' + 'rate' + currentdate +'.html'));
    request(
	{
	    uri: url,
	},function(error, response, body){
	    var $ = cheerio.load(body);
	    //console.log('USDJPY_chart_bid:' + $('#USDJPY_chart_bid').text() );
	    var dat = IDArray[0] + ',' + $('#' + IDArray[0] + chartbid).text() + ',' + $('#' + IDArray[0] + chartask).text() + ',' + currentdate;
	    var data = []
	    for(var j=0;j < IDArray.length; j++){
		var item = [IDArray[j], $('#' + IDArray[j] + chartbid).text(), $('#' + IDArray[j] + chartask).text(), currentdate, '\n']
		console.log(item.toString());
		//data.push(item);
		//var stream = fs.createWriteStream("data" + today + ".csv");
		fs.appendFile("data" + today + ".csv", item.toString() ,'utf8', function (err) {
		    console.log(err);
		});
		//fs.close(); 
		
		//fs.end();
	    }
	    //console.log(test[1].toString());
	    /*var data = [
		[IDArray[0], $('#' + IDArray[0] + chartbid).text(), $('#' + IDArray[0] + chartask).text()]
		[IDArray[1], $('#' + IDArray[1] + chartbid).text(), $('#' + IDArray[1] + chartask).text()]
	    ];*/
	    //console.log(data.toString());
/*stream.once('open', function(fd) {
  stream.write(data.toString());
  stream.end();
});
*/
	    /*
	    fs.once('open', function(fd) {
		fs.write("My first row\n");
		fs.write("My second row\n");
		fs.end();
	    });
	    */
	    //csv()
		//.from.stream(fs.createReadStream(dir + '/data.csv'))
		//.topath()
	}
    )
    /*child_process.exec(wgetcmd, function(error, stdout, stderr){
	console.log(stdout);
	console.log('wget ' + i);
    });
    */
    sleep(sleeptime);
}

function sleep(milliSeconds) {
    var startTime = new Date().getTime();
    while (new Date().getTime() < startTime + milliSeconds);
}

/*
var fs = require("fs");
var request = require('request');
var IntervalStream  = require('interval-stream');
var is = new IntervalStream(2000);

request(url)
  .pipe(is)
  .pipe(fs.createWriteStream('rate.html'));
*/
