from flask import Flask, render_template, redirect, session, flash, request, url_for
#import results as res
import os 

app = Flask(__name__)
DRUG_LIST_SEPERATOR = ';'

import pandas as pd
import json

def get_results_json(*drugs):
    df = pd.read_csv('../data/CombinedDatasetConservativeTWOSIDES_critical.csv', delimiter='\t')
    interaction_dict = {}
    for drug in drugs:
        filtered_df = df[df['object']==drug]
        drug_interactions = filtered_df['precipitant'].unique().tolist()
        for drug2 in drugs:
            if drug2 in drug_interactions:
                interaction_dict[drug] = drug2
                
    # Write the dictionary to a JSON file
    return interaction_dict


@app.route('/')
def init():
    session.clear()
    return render_template('homepage.html')


# @app.route('/result', methods=['POST'])
# def result():
#     data = request.get_json()
    
#     
#     result = res.get_results_json(data)
    
#     
#     response_data = {'result': result}
#     return response_data



@app.route('/drug_conflicts/<drug_list>', methods=['GET'])
def drug(drug_list : str):
    drugs : list[str] = drug_list.split(DRUG_LIST_SEPERATOR)
    intersections : dict[str]  =  get_results_json(*drugs)

    return intersections

if __name__ == '__main__':
    app.secret_key = 'super secret key'
    app.config['SESSION_TYPE'] = 'filesystem'

    #session.init_app(app)
    app.debug = True
    app.run(host='0.0.0.0', port='5000')

