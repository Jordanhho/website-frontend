# Personal Website Frontend

## Project Description
This project is to develop my personal website's frontend. The website is developed to access the APIs from the backend.
The website is split into 2 portions, a public area for showcasing my activites and an admin portion for my use. The front end is hosted with nginx.

## Technologies
This is a ReactJS Single Page Application that uses the following framework and libraries:
- [ReactJS](https://reactjs.org/)
- [Redux](https://react-redux.js.org/)
- [Material UI](https://material-ui.com/)
- [Fontawesome](https://fontawesome.com/)
- [Lodash](https://lodash.com/)
- [Recaptcha](https://www.google.com/recaptcha/about/)
- [MomentJS](https://momentjs.com/)
- [axios](https://www.axios.com/)
- [nginx](https://www.nginx.com/)

## NPM Packages
The application uses the following npm packages:

### ReactJS:
- react
- react-dom
- react-router-dom
- react-cookie
- react-app-rewired

### Redux:
- react-redux
- redux-thunk

### UI Frameworks:
Material UI:
- @material-ui/core"
- @material-ui/icons
- @material-ui/lab

ptawesome:
- react-fontawesome
- fontawesome-svg-core
- free-brands-svg-icons
- free-regular-svg-icons
- free-solid-svg-icons

### Utilities:
- react-google-recaptcha
- lodash
- moment
- axios
- react-html-parser
- babel-plugin-module-resolver
- customize-cra

## Requirements
This project is meant to be paired with the personal website backend in order to load apis. However, the website can still be run.

The application has been developed with NodeJS version 14.17.1 LTS

It has been developed targeted towards Chrome Browsers desktops.

## How to Run the project
1. Clone the project to your local directory:

2. install all npm packages
``` 
    $ npm install
```
3.  Run the project to localhost:3000
``` 
    $ npm run start
```

## to build static files
1. Build reactjs when on linux VM:
``` 
    $ INLINE_RUNTIME_CHUNK=false npm run build-rewired-linux
```
Or build on windows dev ENV

``` 
    $ npm run build-rewired-windows
```

2. The built app will be at /build