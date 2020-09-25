import sys
import json    # or `import simplejson as json` if on Python < 2.6
import numpy as np
import pandas as pd
from sklearn.decomposition import PCA
import pickle


ls = json.loads(sys.argv[1])
# ls = {"090909":["jfmkj", "jfnekjf", "djnkfdj", "nkdjfv", "infkjdsf", "nfjksns", "nfiernf", "dnewsk", "jjjj", "aaaaa"]}


book_indices = []
with open("indices.txt", "r") as f:
    for r in f.readlines():
        book_indices.append(r)

curr_row = []

for i in book_indices:
    if i in list(ls.values())[0]:
        curr_row.append(1)
    else:
        curr_row.append(0)
filename = 'finalized_model.sav'
f2 = open(filename, 'rb')
loaded_model = pickle.load(f2)
out = loaded_model.transform([curr_row])

# print(sys.argv[1])
print(out)

#find most similar