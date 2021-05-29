
import React from "react";
import styled from "styled-components/macro";
import PropTypes from "prop-types";
import { red, green, orange } from "@material-ui/core/colors";

import { format } from "d3-format";
import { timeFormat } from "d3-time-format";

import { ChartCanvas, Chart, ZoomButtons } from "react-stockcharts";
import {
	BarSeries,
	BollingerSeries,
	CandlestickSeries,
	LineSeries,
	StochasticSeries,
} from "react-stockcharts/lib/series";
import { XAxis, YAxis } from "react-stockcharts/lib/axes";
import {
	CrossHairCursor,
	EdgeIndicator,
	CurrentCoordinate,
	MouseCoordinateX,
	MouseCoordinateY,
} from "react-stockcharts/lib/coordinates";

import { discontinuousTimeScaleProvider } from "react-stockcharts/lib/scale";
import {
	OHLCTooltip,
	MovingAverageTooltip,
	BollingerBandTooltip,
	StochasticTooltip,
	GroupTooltip,
} from "react-stockcharts/lib/tooltip";
import { ema, stochasticOscillator, bollingerBand } from "react-stockcharts/lib/indicator";
import { fitWidth } from "react-stockcharts/lib/helper";
import { last } from "react-stockcharts/lib/utils";
import {
	LabelAnnotation,
	Label,
	Annotate,
	SvgPathAnnotation,
	buyPath,
	sellPath
} from "react-stockcharts/lib/annotation";

const bbAppearance = {
	stroke: {
		top: "#FFFFFF",
		middle: "#FFFFFF",
		bottom: "#FFFFFF",
	},
	fill: "#FFFFFF"
};
const stoAppearance = {
	stroke: Object.assign({},
		StochasticSeries.defaultProps.stroke,
		{ top: "#37a600", middle: "#b8ab00", bottom: "#37a600" })
};

class CandleStickChartWithDarkTheme extends React.Component {

	render() {
		const height = 750;
		const { type, data: initialData, width, ratio, tradeslist, supportLevel } = this.props;

		const margin = { left: 70, right: 70, top: 20, bottom: 30 };

		const gridHeight = height - margin.top - margin.bottom;
		const gridWidth = width - margin.left - margin.right;

		const showGrid = true;
		const yGrid = showGrid ? { innerTickSize: -1 * gridWidth, tickStrokeOpacity: 0.2 } : {};
		const xGrid = showGrid ? { innerTickSize: -1 * gridHeight, tickStrokeOpacity: 0.2 } : {};

		const ema20 = ema()
			.id(0)
			.options({ windowSize: 20 })
			.merge((d, c) => { d.ema20 = c; })
			.accessor(d => d.ema20)
			.stroke("#d52727")
			.fill("#d52727");

		const ema60 = ema()
			.id(2)
			.options({ windowSize: 60 })
			.merge((d, c) => { d.ema60 = c; })
			.accessor(d => d.ema60)
			.stroke("#ff7e0e")
			.fill("#ff7e0e");
		
		const ema120 = ema()
			.id(3)
			.options({ windowSize: 120 })
			.merge((d, c) => {d.ema120 = c;})
			.accessor(d => d.ema120)
			.stroke("#1f77b4")
			.fill("#1f77b4");
		
		const ema200 = ema()
			.id(4)
			.options({ windowSize: 200 })
			.merge((d, c) => {d.ema200 = c;})
			.accessor(d => d.ema200)
			.stroke("#298b2c")
			.fill("#298b2c");

		const slowSTO = stochasticOscillator()
			.options({ windowSize: 14, kWindowSize: 3 })
			.merge((d, c) => {d.slowSTO = c;})
			.accessor(d => d.slowSTO);
		const fastSTO = stochasticOscillator()
			.options({ windowSize: 14, kWindowSize: 1 })
			.merge((d, c) => {d.fastSTO = c;})
			.accessor(d => d.fastSTO);
		const fullSTO = stochasticOscillator()
			.options({ windowSize: 14, kWindowSize: 3, dWindowSize: 4 })
			.merge((d, c) => {d.fullSTO = c;})
			.accessor(d => d.fullSTO);

		const bb = bollingerBand()
			.merge((d, c) => {d.bb = c;})
			.accessor(d => d.bb);


		const calculatedData = bb(ema20(ema60(ema120(ema200(slowSTO(fastSTO(fullSTO(initialData))))))));
		const xScaleProvider = discontinuousTimeScaleProvider
			.inputDateAccessor(d => d.date);
		const {
			data,
			xScale,
			xAccessor,
			displayXAccessor,
		} = xScaleProvider(calculatedData);

		const defaultAnnotationProps = {
      		onClick: console.log.bind(console)
		};

		const support_level_line = ["10:10:00", "10:15:00", "10:20:00", "10:25:00", "10:30:00", "10:35:00", "10:40:00", "10:45:00", "10:50:00", "10:55:00", "11:00:00", "11:05:00", "11:10:00","11:15:00", "11:20:00", "11:25:00", "11:30:00", "11:35:00", "11:40:00", "11:45:00", "11:50:00", "11:55:00", "12:00:00"]

		const formatSupTime = timeFormat("%Y%m%d");
		const formatDayTime = timeFormat("%H:%M:%S");

		const draw_short_support_bot = (date) => {
			let datetime = formatSupTime(date);
			for (var i = 0; i < supportLevel.time.length; i++) {
				if (datetime == supportLevel.time[i]) {
					return supportLevel.short_value_bot[i]
				}
			}
			return 0;
		}

		const draw_short_support_top = (date) => {
			let datetime = formatSupTime(date);
			for (var i = 0; i < supportLevel.time.length; i++) {
				if (datetime == supportLevel.time[i]) {
					return supportLevel.short_value_top[i]
				}
			}
			return 0;
		}

		const when_draw_support = (date) => {
			let time = formatDayTime(date);
			for (var i = 0; i < support_level_line.length; i++){
				if (time == support_level_line[i]) {
					return true
				}
			}
			return false
		}

		const shortSupBotAnnotationProps = {
			...defaultAnnotationProps,
			y: ({ yScale, datum }) =>  yScale(draw_short_support_bot(datum.date)),
			fill: "#FFFFFF",
			text: "---",
			tooltip: "support line",
		};

		const shortSupTopAnnotationProps = {
			...defaultAnnotationProps,
			y: ({ yScale, datum }) =>  yScale(draw_short_support_top(datum.date)),
			fill: "#FFFFFF",
			text: "---",
			tooltip: "support line",
		};

		const INAnnotationProps = {
			...defaultAnnotationProps,
			y: ({ yScale, datum }) =>  yScale(datum.low),
			fill: "#FFFFFF",
			path: buyPath,
			text: "buy",
			tooltip: "Go long",
		};

		const OUTAnnotationProps = {
			...defaultAnnotationProps,
			y: ({ yScale, datum }) => yScale(datum.high),
			fill: "#FFFFFF",
			path: sellPath,
			tooltip: "Go short",
		};

		const isTradeIN = (d) => {
			let formatTime = timeFormat("%Y%m%d, %H:%M:%S")
			let datetime = formatTime(d.date)
			for (var i = 0; i < tradeslist.length; i++) {
				if (datetime == tradeslist[i].datetime1) {
					return true;
				}
			}
			return false;
		}

		const isTradeOUT = (d) => {
			let formatTime = timeFormat("%Y%m%d, %H:%M:%S")
			let datetime = formatTime(d.date)
			for (var i = 0; i < tradeslist.length; i++) {
				if (datetime == tradeslist[i].datetime2) {
					return true;
				}
			}
			return false;
		}

		const startX = xAccessor(last(data));
		const endX = xAccessor(data[Math.max(0, data.length - 130)]);

		const xExtents = [startX, endX];

		const seriesName = ""
		
		return (
			<ChartCanvas height={450}
				width={width}
				ratio={ratio}
				margin={margin}
				type={type}
				seriesName={seriesName}
				data={data}
				xScale={xScale}
				xAccessor={xAccessor}
				displayXAccessor={displayXAccessor}
				xExtents={xExtents}
				zoomEvent={false}
				panEvent={true}
				clamp={false}
			>
                
                <Label x={(width - margin.left - margin.right) / 2} y={10}
					fontSize="30" text={seriesName} fill={"#FFFFFF"}/>

				<Chart id={1} height={400}
					yExtents={[d => [d.high, d.low], bb.accessor(), ema20.accessor(), ema60.accessor(), ema120.accessor(), ema200.accessor()]}
					padding={{ top: 10, bottom: 20 }}
				>
					<ZoomButtons
						
					/>
					<YAxis axisAt="right" orient="right" ticks={5} {...yGrid} inverted={true}
						tickStroke="#FFFFFF" />
					<XAxis axisAt="bottom" orient="bottom" showTicks={false} outerTickSize={0}
						stroke="#FFFFFF" opacity={0.2} />

					<MouseCoordinateY
						at="right"
						orient="right"
						displayFormat={format(".2f")} />

					<MouseCoordinateX
            			at="bottom"
            			orient="bottom"
            			displayFormat={timeFormat("%H:%M")} />

					<CandlestickSeries
                        opacity={1}
						stroke={d => d.close > d.open ? "#26a69a" : "#ef5350"}
						wickStroke={d => d.close > d.open ? "#26a69a" : "#ef5350"}
						fill={d => d.close > d.open ? "#26a69a" : "#ef5350"} />

					<LineSeries yAccessor={ema20.accessor()} stroke={ema20.stroke()}/>
					<LineSeries yAccessor={ema60.accessor()} stroke={ema60.stroke()} />
					<LineSeries yAccessor={ema120.accessor()} stroke={ema120.stroke()}/>
					<LineSeries yAccessor={ema200.accessor()} stroke={ema200.stroke()}/>
{/* 
					<BollingerSeries yAccessor={d => d.bb}
						{...bbAppearance} /> */}
					<CurrentCoordinate yAccessor={ema20.accessor()} fill={ema20.stroke()} />
					<CurrentCoordinate yAccessor={ema60.accessor()} fill={ema60.stroke()} />
					<CurrentCoordinate yAccessor={ema120.accessor()} fill={ema120.stroke()} />
					<CurrentCoordinate yAccessor={ema200.accessor()} fill={ema200.stroke()} />

					<EdgeIndicator itemType="last" orient="right" edgeAt="right"
						yAccessor={d => d.close} fill={d => d.close > d.open ? "#26a69a" : "#ef5350"}/>

					<OHLCTooltip origin={[-40, -10]} labelFill={"#FFFFFF"} textFill={"#26a69a"} fontSize={"14px"} />

					<Annotate with={SvgPathAnnotation} when={d => isTradeIN(d)}
						usingProps={INAnnotationProps} />
					<Annotate with={SvgPathAnnotation} when={d => isTradeOUT(d)}
						usingProps={OUTAnnotationProps} />
					
					<Annotate with={LabelAnnotation} when={d => when_draw_support(d.date)}
						usingProps={shortSupBotAnnotationProps} />
					<Annotate with={LabelAnnotation} when={d => when_draw_support(d.date)}
						usingProps={shortSupTopAnnotationProps} />

					<MovingAverageTooltip
						onClick={e => console.log(e)}
						labelFill={"#FFFFFF"}
						textFill={"#FFFFFF"}
						origin={[-38, 15]}
						options={[
							{
								yAccessor: ema20.accessor(),
								type: ema20.type(),
								stroke: ema20.stroke(),
								windowSize: ema20.options().windowSize,
							},
							{
								yAccessor: ema60.accessor(),
								type: ema60.type(),
								stroke: ema60.stroke(),
								windowSize: ema60.options().windowSize,
							},
							{
								yAccessor: ema120.accessor(),
								type: ema120.type(),
								stroke: ema120.stroke(),
								windowSize: ema120.options().windowSize,
							},
							{
								yAccessor: ema200.accessor(),
								type: ema200.type(),
								stroke: ema200.stroke(),
								windowSize: ema200.options().windowSize,
							},
						]}
					/>
					{/* <GroupTooltip
						layout="vertical"
						origin={[-38, 15]}
						verticalSize={20}
                        labelFill={"#FFFFFF"}
						onClick={e => console.log(e)}
						options={[
							{
								yAccessor: ema20.accessor(),
								yLabel: `${ema20.type()}(${ema20.options().windowSize})`,
								valueFill: ema20.stroke(),
								withShape: true,
							},
							{
								yAccessor: ema60.accessor(),
								yLabel: `${ema60.type()}(${ema60.options().windowSize})`,
								valueFill: ema60.stroke(),
								withShape: true,
							},
						]}
					/> */}
				</Chart>
				<Chart id={2}
					yExtents={d => d.volume}
					height={100} origin={(w, h) => [0, h - 100]}
				>
					<YAxis axisAt="left" orient="left" ticks={5} tickFormat={format(".2s")}
						tickStroke="#FFFFFF" />
					<BarSeries
						yAccessor={d => d.volume}
						fill={d => d.close > d.open ? "#26a69a" : "#ef5350"} />
				</Chart>
				<CrossHairCursor stroke="#FFFFFF" />
			</ChartCanvas>
		);
	}
}
CandleStickChartWithDarkTheme.propTypes = {
	data: PropTypes.array.isRequired,
	tradeslist: PropTypes.array.isRequired,
	supportLevel: PropTypes.array.isRequired,
	width: PropTypes.number.isRequired,
	ratio: PropTypes.number.isRequired,
	type: PropTypes.oneOf(["svg", "hybrid"]).isRequired,
};

CandleStickChartWithDarkTheme.defaultProps = {
	type: "svg",
};
CandleStickChartWithDarkTheme = fitWidth(CandleStickChartWithDarkTheme);

export default CandleStickChartWithDarkTheme;
