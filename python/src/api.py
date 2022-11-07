from flask import Flask
from flask import request
from flask import jsonify

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

from main_mobiflight import getVar

app = Flask(__name__)

@app.route("/")
def hello_world():
    return "<p>It works!</p>"

@app.route("/read")
def me_api():
    var = request.args.get('var', '')

    if var:
        return jsonify({
            "value": getVar(var)
        });

    return {
        "error": "no 'var' provided",
    }

@app.route("/fcu")
def fcu():
    #docu https://docs.flybywiresim.com/fbw-a32nx/feature-guides/autopilot-fbw/#common
    return jsonify({
        "AUTOPILOT_SPEED_SELECTED": getVar('(L:A32NX_AUTOPILOT_SPEED_SELECTED)'),
        "FCU_SPD_MANAGED_DOT": getVar('(L:A32NX_FCU_SPD_MANAGED_DOT)'),
        "AUTOPILOT_HEADING_SELECTED": getVar('(L:A32NX_AUTOPILOT_HEADING_SELECTED)'),
        "FCU_HDG_MANAGED_DASHES": getVar('(L:A32NX_FCU_HDG_MANAGED_DASHES)'),
        "FCU_HDG_MANAGED_DOT": getVar('(L:A32NX_FCU_HDG_MANAGED_DOT	)'),
        "AUTOPILOT ALTITUDE LOCK": getVar('(A:AUTOPILOT ALTITUDE LOCK VAR:3, feet)'),
        "FCU_ALT_MANAGED": getVar('(L:A32NX_FCU_ALT_MANAGED)'),
        "AUTOPILOT_VS_SELECTED": getVar('(L:A32NX_AUTOPILOT_VS_SELECTED)'),
        "A32NX_FCU_ALT_MANAGED": getVar('(L:A32NX_FCU_ALT_MANAGED)'),
        "A32NX_FCU_LOC_MODE_ACTIVE": getVar('(L:A32NX_FCU_LOC_MODE_ACTIVE)'),
        "EXPED": getVar('(L:A32NX_FMA_EXPEDITE_MODE)'),
        "V/S FPA knob VS_SELECTED": getVar('(L:A32NX_AUTOPILOT_VS_SELECTED)'),
        "V/S FPA knob FCU_VS_INC": getVar('(L:A32NX.FCU_VS_INC)'),
        "APPR_MODE_ACTIVE": getVar('(L:A32NX_FCU_APPR_MODE_ACTIVE)'),
        "AUTOPILOT_1_ACTIVE": getVar('(L:A32NX_AUTOPILOT_1_ACTIVE)'),
        "AUTOPILOT_2_ACTIVE": getVar('(L:A32NX_AUTOPILOT_2_ACTIVE)'),
        "A/THR": getVar('(L:A32NX_AUTOTHRUST_STATUS)'),
        "HDG-TRK / V/S-FPA": getVar('(L:A32NX_TRK_FPA_MODE_ACTIVE)'),
    })


print("\nExample: http://192.168.1.20:5000/read?var=(L:A32NX_ECAM_SD_CURRENT_PAGE_INDEX)\n\n")

#http://192.168.1.20:5000/read?var=(L:A32NX_AUTOPILOT_SPEED_SELECTED)

# aqui solo entrara lanzando en prod: python api.py
if __name__ == "__main__":
  from waitress import serve
  serve(app, host="0.0.0.0", port=8080)