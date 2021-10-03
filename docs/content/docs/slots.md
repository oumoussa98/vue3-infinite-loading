---
description: ""
sidebar: "docs"
prev: "/docs/events/"
---

# Slots

- **name**: complete
- **Details**:
  Used to create a custom display message when there is no more data `$state.complete`

- **example**:

  ```html
  <template #complete>
    <span>No more data found!</span>
  </template>
  ```

###

- **name**: error
- **bind**: `retry` function
- **Details**:
  Used to create a custom display message when an error occures `$state.error`

  - **example**:

  ```html
  <template #error="{ retry }">
    <button @click="retry">Retry</button>
  </template>
  ```
