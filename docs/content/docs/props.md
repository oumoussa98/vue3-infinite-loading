---
description: ""
sidebar: "docs"
prev: "/docs/simple-example/"
next: "/docs/events/"
---

# Props

### target

- **Type**: `String`
- **Default**: `window`
- **Details**:
  This property is used to specify the scrollable element, it can be any valid css selector
  If not set it defaults to the window

### distance

- **Type**: `Number`
- **Default**: `0`
- **Details**:
  The `infinite` event will be fired if the scroll distance is less than this value.

### top

- **Type**: `Boolean`
- **Default**: `false`
- **Details**:
  This property is used to set the load direction to top.

### identifier

- **Type**: `any`
- **Details**:
  The component will be reset if this property has changed

### firstLoad

- **Type**: `Boolean`
- **Default**: `true`
- **Details**:
  This property is used to specify weither you want the component to handle first load or not.

### slots

- **Type**: `Object`
- **Details**:

#### slots.complete

- **Type**: `String`
- **Default**: `No more results!`
- **Details**:
  override text message display on complete

#### slots.error

- **Type**: `String`
- **Default**: `Oops something went wrong!`
- **Details**:
  override text message display on complete
