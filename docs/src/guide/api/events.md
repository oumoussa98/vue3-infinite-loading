# Events

## infinite

- **Argument**: `$state`
- **Details**:

  This event will be fired if the scroll distance is less than the `distance` property, the component will pass a special argument for the event handler to change loading status named `$state` but you can name it whatever you want

  ### $state.loaded

  - **Type**: `Function`
  - **Details**:

    Informs the component that this loading has been successful

  ### $state.complete

  - **Type**: `Function`
  - **Details**:

    Inform the component that all the data has been loaded successfully

  ### $state.error

  - **Type**: `Function`
  - **Details**:

    Inform the component that this loading failed, the content of `error` slot will be displayed.
