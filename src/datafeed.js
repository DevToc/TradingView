import {
	makeApiRequest,
	generateSymbol,
	parseFullSymbol,
} from './helpers.js';
import {
	subscribeOnStream,
	unsubscribeFromStream,
} from './streaming.js';

let count = 1;

const lastBarsCache = new Map();

const configurationData = {
	supported_resolutions: ['S', '1', '5','15', '30', '60', '1D', '1W', '1M'],
	exchanges: [{
		value: 'BTCUSDT',
		name: 'BTCUSDT',
		desc: 'BTCUSDT',
	}],
	// {
	// 	// `exchange` argument for the `searchSymbols` method, if a user selects this exchange
	// 	value: 'BTCUSDT',

	// 	// filter name
		// name: 'BTCUSDT',

	// 	// full exchange name displayed in the filter popup
	// 	desc: 'Kraken bitcoin exchange',
	// },
	// ],
	// symbols_types: [{
	// 	name: 'crypto',

	// 	// `symbolType` argument for the `searchSymbols` method, if a user selects this symbol type
	// 	value: 'crypto',
	// },
	// 	// ...
	// ],
};

// async function getAllSymbols() {
// 	const data = await makeApiRequest('data/v3/all/exchanges');
// 	let allSymbols = [];

// 	for (const exchange of configurationData.exchanges) {
// 		const pairs = data.Data[exchange.value].pairs;

// 		for (const leftPairPart of Object.keys(pairs)) {
// 			const symbols = pairs[leftPairPart].map(rightPairPart => {
// 				const symbol = generateSymbol(exchange.value, leftPairPart, rightPairPart);
// 				return {
// 					symbol: symbol.short,
// 					full_name: symbol.full,
// 					description: symbol.short,
// 					exchange: exchange.value,
// 					type: 'crypto',
// 				};
// 			});
// 			allSymbols = [...allSymbols, ...symbols];
// 		}
// 	}
// 	return allSymbols;
// }

export default {
	onReady: (callback) => {
		console.log('[onReady]: Method call');
		setTimeout(() => callback(configurationData),0);
	},

	searchSymbols: async (
		userInput,
		exchange,
		symbolType,
		onResultReadyCallback,
	) => {
		console.log('[searchSymbols]: Method call');
		// const symbols = await getAllSymbols();
		// const newSymbols = symbols.filter(symbol => {
		// 	const isExchangeValid = exchange === '' || symbol.exchange === exchange;
		// 	const isFullSymbolContainsInput = symbol.full_name
		// 		.toLowerCase()
		// 		.indexOf(userInput.toLowerCase()) !== -1;
		// 	return isExchangeValid && isFullSymbolContainsInput;
		// });
		// onResultReadyCallback(newSymbols);
		return true;
	},

	resolveSymbol: async (
		symbolName,
		onSymbolResolvedCallback,
		onResolveErrorCallback,
		extension
	) => {
		console.log('[resolveSymbol]: Method call', symbolName);
		// const symbols = await getAllSymbols();
		// const symbolItem = symbols.find(({
		// 	full_name,
		// }) => full_name === symbolName);
		// if (!symbolItem) {
		// 	console.log('[resolveSymbol]: Cannot resolve symbol', symbolName);
		// 	onResolveErrorCallback('cannot resolve symbol');
		// 	return;
		// }
		const symbolInfo = {
			ticker: 'BTCUSDT',
			name: "BTCUSDT",
			description: "BTCUSDT",
			type: "Crypto",
			session: '24x7',
			timezone: 'Etc/UTC',
			exchange: "OK",
			minmov: 1,
			pricescale: 100,
			has_intraday: true,
			has_seconds:true,
			has_no_volume: true,
			has_weekly_and_monthly: false,
			supported_resolutions: configurationData.supported_resolutions,
			volume_precision: 2,
			// data_status: 'streaming',
		};

		console.log('[resolveSymbol]: Symbol resolved', symbolName);
		onSymbolResolvedCallback(symbolInfo);
	},

	getBars: async (symbolInfo, resolution, periodParams, onHistoryCallback, onErrorCallback) => {
		const { from, to, firstDataRequest } = periodParams;
		// console.log('[getBars]: Method call', symbolInfo, resolution, from, to);
		// const parsedSymbol = parseFullSymbol(symbolInfo.full_name);
		// const urlParameters = {
		// 	e: parsedSymbol.exchange,
		// 	fsym: parsedSymbol.fromSymbol,
		// 	tsym: parsedSymbol.toSymbol,
		// 	toTs: to,
		// 	limit: 2000,
		// };
		// const query = Object.keys(urlParameters)
		// 	.map(name => `${name}=${encodeURIComponent(urlParameters[name])}`)
		// 	.join('&');
		console.log("getBars is called")
		if(count!==1)
			 return;
		try {
			count =2;
			// const data = await makeApiRequest(`data/histoday?${query}`);
			const data = await makeApiRequest(`chart-data`);
			console.log(data)
			// if (data && data === 'Error' || data.length === 0) {
			// 	// "noData" should be set if there is no data in the requested period.
			// 	onHistoryCallback([], {
			// 		noData: true,
			// 	});
			// 	return;
			// }
			let bars = [];
			data.forEach(bar => {
				// if (bar.time >= from && bar.time < to) {
					bars = [...bars, {
						time: bar.time * 1000,
						low: bar.low,
						high: bar.high,
						open: bar.open,
						close: bar.close,
					}];
				// }
			});
			if (firstDataRequest) {
				lastBarsCache.set("BTCUSDT", {
					...bars[bars.length - 1],
				});
			}
			console.log(`[getBars]: returned ${bars.length} bar(s)`);
			onHistoryCallback(bars, {
				noData: false,
			});
		} catch (error) {
			console.log('[getBars]: Get error');
			onErrorCallback(error);
		}
	},

	subscribeBars: (
		symbolInfo,
		resolution,
		onRealtimeCallback,
		subscriberUID,
		onResetCacheNeededCallback,
	) => {
		console.log('[subscribeBars]: Method call with subscriberUID:', subscriberUID);
		subscribeOnStream(
			symbolInfo,
			resolution,
			onRealtimeCallback,
			subscriberUID,
			onResetCacheNeededCallback,
			lastBarsCache.get("BTCUSDT"),
		);
	},

	unsubscribeBars: (subscriberUID) => {
		console.log('[unsubscribeBars]: Method call with subscriberUID:', subscriberUID);
		unsubscribeFromStream(subscriberUID);
	},
};
