""" Selecting 5-letter words containing in nominative case or infinitive mode"""

# Write extracted values into the new file
import pandas as pd

dictionary_data = pd.read_excel('Excel_Word.v.10.xlsx', usecols='A,I')

allowed_cases = ["-", "називний"]
with open("all_words.js", "w") as output_file:
    output_file.write('export const ALL_WORDS = [ \n')
    for row in range(dictionary_data.shape[0]):
        if len(dictionary_data['word_binary'][row]) == 5 and (dictionary_data['kind'][row] in allowed_cases):
            # Write a formatted word into a text file
            output_file.write('"%s", \n' % dictionary_data['word_binary'][row].lower())
    output_file.write(']')

