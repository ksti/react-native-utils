# react-native-utils 

some utils for react-native

Router for React Native based on new React Native Navigation API.

## Documentation

- [httpRequest](docs/httpRequest.md)
- [FormView](docs/FormView.md)


## Features

`react-native-utils` is a routing package that allows you to:

- Define scene transitions in one central location
- Without having to pass navigator objects around, and allow you to
- Call transitions anywhere in your code with a simple syntax (e.g. `Actions.login({username, password})` or `Actions.profile({profile})` or even `Actions.profile(123)` - all params will be part of `this.props` for given Scene component).

## Installation
```
npm i react-native-utils --save
```

## Usage
Check out the [Examples](Examples) for details.

the following is a quick walkthrough of these utils

- httpRequest
```js
  import {httpRequest} from 'react-native-utils';
```

  
- FormView
```js  
  import {FormView} from 'react-native-utils';
```

