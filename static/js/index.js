const widget = new window.TradingView.widget({
  container_id: "tv_chart_container",
  symbol: "BITSTAMP:BTCUSD", // Replace with your desired symbol and exchange
  interval: "60",           // Candlestick interval in seconds
  timezone: "Etc/UTC",
  theme: "dark",
  style: "1",
  toolbar_bg: "#f1f3f6",
  withdateranges: true,
  hide_side_toolbar: false,
  allow_symbol_change: true,
  save_images: true,
  hotlist: true,
  timeframe: "1D",          // Initial timeframe (e.g. 1D = 1 day)
  overrides: {
    "mainSeriesProperties.candleStyle.upColor": "lime",
    "mainSeriesProperties.candleStyle.downColor": "red"
  },
  studies: [
    {
      "id": "volume@tv-basicstudies",
      "name": "Volume",
      "fullname": "Volume",
      "short_name": "Vol",
      "inputs": {}
    },
    {
      "id": "macd@tv-basicstudies",
      "name": "Moving Average Convergence Divergence",
      "fullname": "Moving Average Convergence Divergence",
      "short_name": "MACD",
      "inputs": {
        "fast_length": 12,
        "slow_length": 26,
        "source": "close",
        "signal_length": 9
      }
    }
  ]
});


// const chartProperties = {
//   width: 1500,
//   height: 600,
//   timeScale: {
//     timeVisible: true,
//     secondsVisible: false,
//   },
// };

// const domElement = document.getElementById("tvchart");
// const chart = LightweightCharts.createChart(domElement, chartProperties);

// const candleSeries = chart.addCandlestickSeries();

// fetch(`http://localhost:5000/chart-data`)
//   .then((res) => res.json())
//   .then((data) => {
//     const cdata = data.map((d) => {
//       return {
//         time: d.time,
//         open: parseFloat(d.open),
//         high: parseFloat(d.high),
//         low: parseFloat(d.low),
//         close: parseFloat(d.close),
//       };
//     });
//     candleSeries.setData(cdata);
//   })
//   .catch((err) => log(err));
