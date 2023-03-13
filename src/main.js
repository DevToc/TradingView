// Datafeed implementation, will be added later
import Datafeed from './datafeed.js';
window.tvWidget = new TradingView.widget({
	symbol: 'BTCUSDT', // default symbol
	interval: '1s', // default interval
	fullscreen: true, // displays the chart in the fullscreen mode
	container: 'tv_chart_container',
	datafeed: Datafeed,
	autosize: true,
  timezone: "Etc/UTC",
  theme: "light",
	timeframe:'1',
  // style:2,
  // locale: "en",
  // toolbar_bg: "#f1f3f6",
  // enable_publishing: false,
  // allow_symbol_change: true,
	library_path: '../charting_library_cloned_data/',
	// overrides: {
  //   volumePaneSize:" medium"
  // }
});
