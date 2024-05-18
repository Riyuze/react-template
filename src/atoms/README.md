# Recoil
For reasons of compatibility and simplicity, it's best to use React's built-in state management capabilities rather than external global state management.
Recoil lets you create a data-flow graph that flows from atoms (shared state) through selectors (pure functions) and down into your React components. Atoms are units of state that components can subscribe to. Selectors transform this state either synchronously or asynchronously.

### Atoms
Atoms are units of state. They're updatable and subscribable: when an atom is updated, each subscribed component is re-rendered with the new value. They can be created at runtime, too. Atoms can be used in place of React local component state. If the same atom is used from multiple components, all those components share their state.

```jsx
const fontSizeState = atom({
  key: 'fontSizeState',
  default: 14,
});
```
Atoms need a unique key. so make sure they're globally unique. Like React component state, they also have a default value.

To read and write an atom from a component, we use a hook called useRecoilState. It's just like React's useState, but now the state can be shared between components:
```jsx
function FontButton() {
  const [fontSize, setFontSize] = useRecoilState(fontSizeState);
  return (
    <button onClick={() => setFontSize((size) => size + 1)} style={{fontSize}}>
      Click to Enlarge
    </button>
  );
}
```
### Local Storage Persistence
Atom effects can be used to persist atom state with browser local storage. localStorage is synchronous, so we can retrieve the data directly without async await or a Promise.
```jsx
import { localStorageEffect } from "./helper";

const currentUserIDState = atom({
  key: 'CurrentUserID',
  default: 1,
  effects: [
    localStorageEffect('CurrentUserID'),
  ]
});
```
### Commonly used Recoil API
#### useRecoilState
This is the recommended hook to use when a component intends to read and write state.
Using this hook in a React component will subscribe the component to re-render when the state is updated.
```jsx
function TempCelsius() {
  const [tempF, setTempF] = useRecoilState(tempFahrenheit);
  return (
    <div>
      Temp (Fahrenheit): {tempF}
      <br />
      <button onClick={addTenFahrenheit}>Add 10 Fahrenheit</button>
    </div>
  );
}
```
#### useRecoilValue
This is the recommended hook to use when a component intends to read state without writing to it.
```jsx
function NameDisplay() {
  const names = useRecoilValue(namesState);
  return (
    <>
      Original names: {names}
    </>
  );
}
```
#### useSetRecoilState
This is the recommended hook to use when a component intends to write to state without reading it. If a component used the useRecoilState() hook to get the setter, it would also subscribe to updates and re-render when the atom or selector updated. Using useSetRecoilState() allows a component to set the value without subscribing the component to re-render when the value changes.
```jsx
function Form() {
  const setNamesState = useSetRecoilState(namesState);
  
  return <FormContent setNamesState={setNamesState} />;
}
```

#### useResetRecoilState
Using useResetRecoilState() allows a component to reset the state to its default value without subscribing the component to re-render whenever the state changes.
```jsx
const ResetButton = () => {
  const resetName = useResetRecoilState(namesState);
  return <button onClick={resetName}>Reset</button>;
};
```
----

