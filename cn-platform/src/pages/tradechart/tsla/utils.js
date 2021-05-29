import { csvParse } from  "d3-dsv";
import { timeParse } from "d3-time-format";

function parseData(parse) {
	return function(d) {
		d.date = parse(d.date);
		d.open = +d.open;
		d.high = +d.high;
		d.low = +d.low;
		d.close = +d.close;
		d.volume = +d.volume;

		return d;
	};
}

function parseTradeData(parse) {
	return function (d) {
		d.date1 = parse(d.datetime1);
		d.date2 = parse(d.datetime2);

		return d;
	}
}

const parseTradeDate = timeParse("%Y%m%d, %H:%M:%S")

const parseDate = timeParse("%Y%m%d  %H:%M:%S");

export function getData() {
	const promiseTSLA = fetch("https://raw.githubusercontent.com/tomliu-hongxiao/cn-files/main/TSLA_5m.csv")
		.then(response => response.text())
		.then(data => csvParse(data, parseData(parseDate)))
	
	console.log(promiseTSLA);
	return promiseTSLA;
}

export function getTradeList() {
	const promiseTradeList = fetch("https://raw.githubusercontent.com/tomliu-hongxiao/cn-files/main/TSLA_Summary/trade_list.csv")
	.then(response => response.text())
		.then(data => csvParse(data, parseTradeData(parseTradeDate)))

return promiseTradeList;
}