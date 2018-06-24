# Running the application locally
- Pull the repo and run npm install in the root directory as well as in the client directory
- Make a copy of .env.dist and rename it to .env
    - change the variables in the .env file
    - You can use a mlab.com to quickly set up a mongodb database
- Run npm start in the root directory to spin up the application

# Todos

## Backend 
- Provide proper error messages to the frontend for authentication
- Authenticate routes / filter results
- Add route for logging out

## Frontend
- Make responsive
- Add link to form for adding address when table is empty
- Build out propTypes for DataForm component to cover properties of config object

## Testing
- Improve coverage

## Deployment
- Deploy demo to heroku