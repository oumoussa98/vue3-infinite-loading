# Props

## target

- **Type**: `String | HTMLElement`
- **Default**: `window`
- **Details**:
  This property is used to specify the scrollable element, it can be any valid css selector
  If not set it defaults to the window

## distance

- **Type**: `Number`
- **Default**: `0`
- **Details**:
  The `infinite` event will be fired if the scroll distance is less than this value.

## top

- **Type**: `Boolean`
- **Default**: `false`
- **Details**:
  This property is used to set the load direction to top.

## identifier

- **Type**: `any`
- **Details**:
  The component will be reset if this property has changed

## firstload

- **Type**: `Boolean`
- **Default**: `true`
- **Details**:
  This property is used to specify weither you want the component to handle first load or not.

## manualload

- **Type**: `Boolean`
- **Default**: `false`
- **Details**:
  When true, the component will not load data automatically on scroll. Instead, it will show a button to load more data using the slot `loadMore`.

  This is usefull if you'd like the user to manually click a button to load the first set of data, which prevents the common issue where the user can't scroll to the footer of the page.

  You can change this props at any time to enable or disable manual loading, for example within the load function.

## slots

- **Type**: `Object`
- **Details**:

  ### slots.complete

  - **Type**: `String`
  - **Default**: `No more results!`
  - **Details**:
    override text message display on complete

  ### slots.error

  - **Type**: `String`
  - **Default**: `Oops something went wrong!`
  - **Details**:
    override text message display on complete
