import pandas as pd
import json

def get_results_json(*drugs):
    df = pd.read_csv('./data/CombinedDatasetConservativeTWOSIDES_critical.csv', delimiter='\t')
    interaction_dict = {}
    for drug in drugs:
        filtered_df = df[df['object']==drug]
        drug_interactions = filtered_df['precipitant'].unique().tolist()
        for drug2 in drugs:
            if drug2 in drug_interactions:
                interaction_dict[drug] = drug2
                
    # Write the dictionary to a JSON file
    with open('result.json', 'w') as json_file:
        json.dump(interaction_dict, json_file)


# example call
drugs = ['Efavirenz', 'Norgestimate', 'Rifampicin', 'Amprenavir', 'Fentanyl']
get_results_json(*drugs)

# data access
with open('result.json', 'r') as json_file:
    data = json.load(json_file)

print(data)