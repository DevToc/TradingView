from flask import Flask, render_template, jsonify, request
import pandas as pd
import csv

app = Flask(__name__)

@app.route("/")
def index():
 
    return render_template("index2.html")

@app.route("/api/chart_data")
def chart_data():
    symbol = request.args.get('symbol', default='BTCUSDT')
    interval = request.args.get('interval', default='15m')

    # Read the data from the CSV file
    data = pd.read_csv('data.csv')
    
    # Filter the data for the specified symbol and interval
    # filtered_data = data[(data['symbol'] == symbol) & (data['interval'] == interval)] 
    filtered_data = data  
    # Convert the data to the format expected by the Charting Library
    chart_data = []

    for index, row in filtered_data.iterrows():
        timestamp = int(pd.Timestamp(row['time']).timestamp() * 1000)
        open_price = row['open']
        high_price = row['high']
        low_price = row['low']
        close_price = row['close']
        volume = row['volume']

        chart_data.append([timestamp, open_price, high_price, low_price, close_price, volume])

    return jsonify(chart_data)

if __name__ == "__main__":
    app.run(debug=True)