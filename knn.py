import sys
import json    # or `import simplejson as json` if on Python < 2.6
import numpy as np
import pandas as pd
from sklearn.decomposition import PCA

dic = json.loads(sys.argv[1])


cols_lab = []
for i in list(dic.values()):
    for e in i:
        cols_lab.append(e)

cols = {}
for i in cols_lab:
    curr_row = []
    for e in list(dic.values()):
        if i in e:
            curr_row.append(1)
        else:
            curr_row.append(0)
        cols[i] = curr_row

data = pd.DataFrame(cols)
data = data.set_index([list(dic.keys())])
out = {}
for i in range(len(data)):
    out[data.index[i]] = list(data.iloc[i, :])

model = PCA(n_components=1)
X = [i for i in out.values()]
reduced = model.fit( X)
transformed_X = reduced.transform(X)

cols_final = {}
for i in range(len(list(out.keys()))):
    cols_final[list(out.keys())[i]] = list(transformed_X[i])

print(json.dumps(cols_final))

