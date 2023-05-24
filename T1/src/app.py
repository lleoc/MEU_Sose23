from flask import Flask, render_template, redirect, session, flash, request, url_for
from results import get_results_json

app = Flask(__name__)
DRUG_LIST_SEPERATOR = ';'

@app.route('/')
def init():
    session.clear()
    return render_template('homepage.html')

@app.route('/drug_conflicts/<drug_list>', methods=['GET'])
def drug(drug_list : str):
    drugs : list[str] = drug_list.split(DRUG_LIST_SEPERATOR)
    intersections : dict[str]  =  get_results_json(*drugs)

    return intersections

if __name__ == '__main__':
    app.secret_key = 'super secret key'
    app.config['SESSION_TYPE'] = 'filesystem'

    app.debug = True
    app.run(host='0.0.0.0', port='5000')

