import pandas as pd

def get_results_json(*drugs):
    df = pd.read_csv('../data/CombinedDatasetConservativeTWOSIDES_critical.csv', delimiter='\t')
    interaction_dict = {}
    for drug in drugs:
        filtered_df = df[df['object']==drug]
        drug_interactions = filtered_df['precipitant'].unique().tolist()
        for drug2 in drugs:
            if drug2 in drug_interactions:
                interaction_dict[drug] = drug2
                
    return interaction_dict


# example call
drugs = ['Efavirenz', 'Norgestimate', 'Rifampicin', 'Amprenavir', 'Fentanyl']
get_results_json(*drugs)