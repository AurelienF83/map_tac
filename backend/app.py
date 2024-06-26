from flask import Flask, jsonify
import pandas as pd
from flask_cors import CORS
import requests
from io import BytesIO

app = Flask(__name__)
CORS(app)

@app.route('/locations', methods=['GET'])
def get_locations():
    # URL du fichier Excel à télécharger
    file_url = 'https://hidrive.ionos.com/api/file?attachment=true&pid=b1665251943.30982&access_token=C6pBVB2FSgPHHFqJIdCp'

    # Télécharger le fichier Excel
    response = requests.get(file_url, allow_redirects=True)
    if response.status_code == 200:
        print("File downloaded successfully")
        # Charger le contenu du fichier Excel dans un DataFrame pandas
        file_content = BytesIO(response.content)
        df = pd.read_excel(file_content)
    else:
        return jsonify({"error": f"Failed to download file. Status code: {response.status_code}"}), 500

    # Nettoyer le DataFrame en supprimant les lignes avec des NaN dans 'les colonnes du xlsx
    df = df.dropna(subset=['Adresse Parc', 'Nom du parc', 'Date', 'Adresse PS'])

    # Diviser 'Adresse Parc' en deux nouvelles colonnes 'lat' et 'lng'
    coords = df['Adresse Parc'].str.split(',', expand=True)
    df['lat'] = pd.to_numeric(coords[0], errors='coerce')
    df['lng'] = pd.to_numeric(coords[1], errors='coerce')

    # Assigner les colonnes df à celle du xlsx
    df['name'] = df['Nom du parc']
    df['date'] = df['Date'].dt.strftime('%d/%m/%Y')
    df['ps'] = df['Adresse PS']
    df['status'] = df['Status']

    # Supprimer à nouveau les lignes où 'lat' ou 'lng' sont NaN après la conversion
    df = df.dropna(subset=['lat', 'lng'])

    # Liste retournée au format JSON
    locations = df[['lat', 'lng', 'name', 'date', 'ps', 'status']].to_dict(orient='records')

    return jsonify(locations)

if __name__ == '__main__':
    app.run(debug=True)





