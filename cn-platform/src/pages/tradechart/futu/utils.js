import { tsvParse, csvParse, dsv } from  "d3-dsv";
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

const parseDate = timeParse("%Y%m%d  %H:%M:%S");

export function getData() {
	const promiseFUTU = fetch("https://raw.githubusercontent.com/tomliu-hongxiao/cn-files/main/FUTU_5m.csv")
		.then(response => response.text())
		.then(data => csvParse(data, parseData(parseDate)))
	
	return promiseFUTU;
}

export function getTradeList() {
	const promiseTradeList = fetch("https://raw.githubusercontent.com/tomliu-hongxiao/cn-files/main/FUTU_Summary/trade_list.csv")
	.then(response => response.text())
	.then(data => csvParse(data))

return promiseTradeList;
}