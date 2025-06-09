# UnintelligentInterface

CSS development to be branched from `branch:demo`, this currently shows all html elements, but uses none of the API or netlify lambda functionality.

Create `.env` file in root directory, with key value `API_ROUTE="<api-route>"`

Netlify-cli tool must be installed globally to run developer environment:

`npm install -g netlify-cli`

In project directory, run netlify developer environment to use API lambda, this will also set up a live server on local host:

`netlify dev`