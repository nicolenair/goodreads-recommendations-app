import sys
import json    # or `import simplejson as json` if on Python < 2.6
import numpy as np
import pandas as pd
from sklearn.decomposition import PCA
import pickle
# dic={"nfjekrn":["cjdnc", "nfjenf", "nnnn", "3ems"],"ckjnefjcnefjnc":["ckjenkje"], "ddd":["dumnmkxm"], "nxjn":["ddddd"], "jxidujxm":["dekmcxke"], "eiemmxxcn":['jdknckjne'], "cmcmcmcmc":["kjdcxmkjdsc"], "nnndjdjd":["cjfdjkc"], "iencmjkemnfjk":["jcndkjcnd"], "dcnmejkcnmjekcm":["icec"]}
dic = json.loads(sys.argv[1])


cols_lab = []
for i in list(dic.values()):
    for e in i:
        if e not in cols_lab:
            cols_lab.append(e)

with open("indices.txt", "w") as f:
    for e in cols_lab:
        f.write(e + "\n")
cols = {}
for i in cols_lab:
    curr_row = []
    for e in list(dic.values()): #each e is a list of a user's books
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
reduced = model.fit(X)
transformed_X = reduced.transform(X)

cols_final = {}
for i in range(len(list(out.keys()))):
    cols_final[list(out.keys())[i]] = list(transformed_X[i])

filename = 'finalized_model.sav'
pickle.dump(reduced, open(filename, 'wb'))

print(json.dumps(cols_final))
