# goodreads-recommendations-app
A web app to provide personalized book recommendations. Recommendations are collaborative. It is a work in progress. 

# How to Use
~~~
git clone https://github.com/nicolenair/goodreads-recommendations-app
python -m venv goodreads-pyenv
source goodreads-pyenv/bin/activate
pip install -r requirements.txt
npm install
node app.js
~~~

Go to localhost:3000 just to check that the app is running. Currently, the app supports the following routes/functionalities, which you can see in more detail in routes.js:

*/daily-update*
- allows you to take a set of users (your dataset), and run principal component analysis, using the books that they have read as the input features, yielding a vectorized model of each user.
- this route is only for development, will not be available to clients in final version of the app. updates will be automated. 

*/compute-recommendations?loggedUserId=USER_ID*
- based on the pca model you ran in daily-update, you can compute which user from your dataset is most similar to the queried user. Then, you can get book recommendations for the queried user from the most similar user in the dataset. in the future, the output book recommendations will be sampled from the top n similar users (based on past books read)
- currently the similarity metric between users is only using one principal component — will probably use more in the final app.
- immediate issue to be fixed: make sure that the queried user does not get recommended books that they have already read

*/show-all-samples*
- this route is only for development convenience. list all users in the database

*/delete-yesterday-samples*
- delete samples from yesterday. only for development purposes. will not be present in final app. 
