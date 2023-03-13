from flask import Flask, jsonify, render_template
from flask_cors import CORS
import pandas as pd

app = Flask(__name__)
CORS(app)

# read data from csv file
df = pd.read_csv('data.csv')  

# convert data to TradingView format
data = []
for index, row in df.iterrows():
    bar = {
        "time": int(pd.Timestamp(row['time']).timestamp()),
        "open": row['open'],
        "high": row['high'],
        "low": row['low'],
        "close": row['close'],
        "volume": row['volume']
    }
    data.append(bar)


@app.route('/chart-data')
def get_chart_data():
    return jsonify(data)


@app.route('/')
def index():
    return render_template('index.html')


if __name__ == '__main__':
    app.run(debug=True)

# import pandas as pd
# import csv

# from flask import Flask, render_template, jsonify, request

# from flask_cors import CORS, cross_origin
# app = Flask(__name__)
# cors = CORS(app)
# app.config['CORS_HEADERS'] = 'Content-Type'

# @app.route('/api/chart_data')
# @cross_origin()
# def chart_data():
#     symbol = request.args.get('symbol', default='BTCUSDT')
#     # print(symbol)
#     # Read the data from the CSV file
#     data = pd.read_csv('data.csv')
#     print("ddd")
#     # Filter the data for the specified symbol
#     filtered_data = data[(data['symbol'] == symbol)] 
#     # Convert the data to the format expected by the Charting Library
#     chart_data = []

#     for index, row in filtered_data.iterrows():
#         timestamp = int(pd.Timestamp(row['time']).timestamp() * 1000)
#         open_price = row['open']
#         high_price = row['high']
#         low_price = row['low']
#         close_price = row['close']
#         volume = row['volume']

#         chart_data.append({'time': timestamp, 'open': open_price, 'high': high_price,'low': low_price, 'close': close_price, 'volume': volume})
    
#     return jsonify(chart_data)

# @app.route('/')
# def index():
#     symbol = request.args.get('symbol', default='BTCUSDT')
    
#     chart_options = {
#         'width': '100%',
#         'height': 500,
#         'symbol': symbol,
#         'interval': 'D',
#         'timezone': 'Etc/UTC',
#         'theme': 'Dark',
#         'style': '1',
#         'toolbar_bg': '#f1f3f6',
#         'enable_publishing': False,
#         'hide_top_toolbar': True,
#         'withdateranges': True,
#         'datafeed': {
#             'url': '/api/chart_data?symbol=' + symbol,
#             'method': 'GET',
#             'headers': { }
#         }
#     }
#     return render_template('index.html', chart_options=chart_options)

# if __name__ == '__main__':
#     app.run(debug=True)




# # # from flask import Flask, render_template, jsonify, request
# # import pandas as pd
# # import csv

# # from flask import Flask, render_template

# # app = Flask(__name__)

# # @app.route('/')
# # def index():
# #     data = pd.read_csv('data.csv')
# #     chart_data = []

# #     for index, row in data.iterrows():
# #         timestamp = int(pd.Timestamp(row["time"]).timestamp() * 1000)
# #         open_price = row["open"]
# #         high_price = row["high"]
# #         low_price = row["low"]
# #         close_price = row["close"]
# #         volume = row["volume"]

# #         chart_data.append(
# #             {
# #                 "time": timestamp,
# #                 "open": open_price,
# #                 "high": high_price,
# #                 "low": low_price,
# #                 "close": close_price,
# #                 "volume": volume,
# #             }
# #         )

# #     # Create options for the TradingView widget
# #     chart_options = {
# #         "symbol": "ddd",
# #         "interval": "D",
# #         "timezone": "UTC",
# #         "theme": "dark",
# #         "width": "100%",
# #         "height": 400,
# #         "datafeed": {"csv": chart_data},
# #         "locale": "en",
# #         "disable_resolution_rebuild": False,
# #         "autosize": True,
# #         "fullscreen": False,
# #         "studies_overrides": {},
# #         "container_id": "tv_chart_container",
# #     }

# #     return render_template("index.html", chart_options=chart_options)

# # if __name__ == '__main__':
# #     app.run(debug=True)

# # # app = Flask(__name__)

# # # @app.route("/")
# # # def index():
 
# # #     return render_template("index.html")

# # # @app.route("/api/chart_data")
# # # def chart_data():
# # #     print("asdkjfkldsjfkjasdfk")
# # #     symbol = request.args.get('symbol', default='BTCUSDT')
# # #     interval = request.args.get('interval', default='15m')

# # #     # Read the data from the CSV file
# # #     data = pd.read_csv('data.csv')
    
# # #     # Filter the data for the specified symbol and interval
# # #     # filtered_data = data[(data['symbol'] == symbol) & (data['interval'] == interval)] 
# # #     filtered_data = data  
# # #     # Convert the data to the format expected by the Charting Library
# # #     chart_data = []

# # #     for index, row in filtered_data.iterrows():
# # #         timestamp = int(pd.Timestamp(row['time']).timestamp() * 1000)
# # #         open_price = row['open']
# # #         high_price = row['high']
# # #         low_price = row['low']
# # #         close_price = row['close']
# # #         volume = row['volume']

# # #         # chart_data.append({'time': timestamp, 'open': open_price, 'high': high_price,'low': low_price, 'close': close_price, 'volume': volume})
# # #         chart_data.append({'time': timestamp, 'open': open_price, 'high':  high_price, 'low': low_price, 'close': close_price,'volume': volume})
# # #     print("API")
# # #     return jsonify(chart_data)

# # # if __name__ == "__main__":
# # #     app.run(debug=True)