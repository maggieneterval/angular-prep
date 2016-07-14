# Angular Prep

## Getting started

- **Fork** this repo then clone your fork locally.
- `npm install`
- `npm test` (which starts up testem)
- Open up [localhost:7357](http://localhost:7357) to view the full HTML report.
- Start going through the specs.

## Things you should be aware of

- For your code, there will be a frontend global `app` which represents the angular module.
- For the directives, there is a global variable being assigned inline. This is not normal directive syntax, but is used here to make testing simpler.
- All of the html is already there, and if you want context for the various contoller methods etc you are building, it could be a good idea to go check out how it is being used in the html.
- You can run `npm start` to fire up a server. Use this if you want to get a sense of what your app actually looks and feels like as you're passing the specs. If so, you can also seed the database with `npm run seed`. Additionally, you may need to "finish" your states and directives to act accordingly outside of passing the test specs.
