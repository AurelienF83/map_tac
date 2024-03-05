from flask import Flask, jsonify
import pandas as pd
from flask_cors import CORS  # Import CORS

app = Flask(__name__)
CORS(app) 

@app.route('/locations', methods=['GET'])
def get_locations():
    # Lire le fichier Excel et convertir en JSON
    df = pd.read_excel('G:\\DL\\ps2.xlsx')
    locations = df['geo_point_2d'].str.split(',', expand=True).values.tolist()
    return jsonify(locations)

if __name__ == '__main__':
    app.run(debug=True)


