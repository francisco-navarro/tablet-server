from flask import Flask
from flask import request

#pip install Flask
# https://flask.palletsprojects.com/en/2.2.x/installation/

# run dev: flask --app api run --host=0.0.0.0 
#pip install waitress
# run prod: python api

## -- simconnect
import logging, logging.handlers
# from simconnect_mobiflight import SimConnectMobiFlight
# from mobiflight_variable_requests import MobiFlightVariableRequests

## ------ end simconnect

from main_mobiflight_fake import getVar

app = Flask(__name__)

@app.route("/")
def hello_world():
    return "<p>It works!</p>"

@app.route("/read")
def me_api():
    var = request.args.get('var', '')

    if var:
        return {
            "value": getVar(var)
        }

    return {
        "error": "no 'var' provided",
    }

print("\nExample: http://192.168.1.20:5000/read?var=(L:A32NX_ECAM_SD_CURRENT_PAGE_INDEX)\n\n")

# aqui solo entrara lanzando en prod: python api.py
if __name__ == "__main__":
  from waitress import serve
  serve(app, host="0.0.0.0", port=8080)