from flask import Flask, jsonify
import pandas as pd
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route('/locations', methods=['GET'])
def get_locations():
    # Lire le fichier Excel
    df = pd.read_excel('C:\\Users\\a.francesch\\Desktop\\Caroline\\Mise en service_TAC_20240304.xlsx')

    # Nettoyer le DataFrame en supprimant les lignes avec des NaN dans 'Adresse Parc' ou 'Nom du parc'
    df = df.dropna(subset=['Adresse Parc', 'Nom du parc', 'Date', 'Adresse PS'])

    # Diviser 'Adresse Parc' en deux nouvelles colonnes 'lat' et 'lng'
    coords = df['Adresse Parc'].str.split(',', expand=True)
    df['lat'] = pd.to_numeric(coords[0], errors='coerce')
    df['lng'] = pd.to_numeric(coords[1], errors='coerce')

    # Assigner la colonne 'Nom du parc' à 'name'
    df['name'] = df['Nom du parc']
    df['date'] = df['Date'].dt.strftime('%d/%m/%Y')
    df['ps'] = df ['Adresse PS']

    # Supprimer à nouveau les lignes où 'lat' ou 'lng' sont NaN après la conversion
    df = df.dropna(subset=['lat', 'lng'])

    # Créer une liste de dictionnaires pour la conversion en JSON
    locations = df[['lat', 'lng', 'name', 'date', 'ps']].to_dict(orient='records')

    return jsonify(locations)

if __name__ == '__main__':
    app.run(debug=True)




