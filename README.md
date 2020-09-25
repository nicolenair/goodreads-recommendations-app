# goodreads-recommendations-app
A web app to provide personalized book recommendations. Recommendations are collaborative. It is a work in progress. 

# How to Use
~~~
git clone https://github.com/nicolenair/goodreads-recommendations-app
python -m venv goodreads-pyenv
source goodreads-pyenv/bin/activate
pip install -r requirements.txt
node app.js
~~~

Go to localhost:3000 just to check that the app is running. Currently, the app supports the following routes/functionalities, which you can see in more detail in routes.js:

*/daily-update*
- allows you to take a set of users (your dataset), and run principal component analysis, using the books that they have read as the input features, yielding a vectorized model of each user.
- only for development, will not be available to clients in final version of the app. updates will be automated. 

*/compute-recommendations?loggedUserId=USER_ID*
- based on the pca model you ran in daily-update, you can compute which user from your dataset is most similar to the queried user. Then, you can get book recommendations for the queried user from the user in the dataset.
- in the future, this should be expanded to multiple users in the dataset
- currently the similarity metric between users is only using one principal component — will probably use about 10 principal components in the final app, depending on the number that works best in during testing

*/show-all-samples*
- this is just for development convenience. list all users in the database

*/delete-yesterday-samples*
- delete samples from yesterday. only for development. will not be present in final app. 