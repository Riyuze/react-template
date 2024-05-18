# React Template
This template provides a starting point for creating React projects with TypeScript, Tailwind CSS, and Vite. Project structure is also included, along with a pre-commit hook to auto-format your files before committing them.

## Features
- **TypeScript**: Develop with confidence using static type-checking and improved tooling.
- **React**: Build dynamic user interfaces with the popular React library.
- **Tailwind CSS**: Easily style and customize your components using the utility-first approach of Tailwind CSS.
- **Vite**: Enjoy fast development and instant hot module replacement with Vite's lightning-fast dev server.
- **Husky**: Automatically lint your code upon committing.
----

## How to Get Started
1. Clone the project
```
git clone https://github.com/Riyuze/react-template.git
```
2. Navigate into the project directory
```
cd react-template
```
3. Install dependencies
```
npm install
```

----
## Usage
To start the development server and run the project, use the following command:
```
npm run dev
```
This will start the development server and open your project in the browser. Any changes you make to the source code will be automatically reflected in the browser.

----
## Building for Production
To build the project for production, use the following command:
```
npm run build
```
This will create an optimized build of your project in the dist directory.

----
## Project Structure
```
├── main.tsx (main application component)
├── routes.tsx  (routes for the application)
├── main.css (main stylesheet)
├── atoms (recoil atom)
├── components (shared components)
├── hocs (HOC files)
├── hooks (react hooks)
├── index.tsx (main index application)
├── models (data model for application)
├── pages (pages)
│   ├── _403.tsx  (do not delete this file)  
│   ├── _app.tsx (do not delete this file)  
│   ├── index.tsx 
├── services (API call function)
└── utils (utility function)
```
----
## Recoil
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
#### Local Storage Persistence
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
#### Commonly used Recoil API
##### useRecoilState
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
##### useRecoilValue
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
##### useSetRecoilState
This is the recommended hook to use when a component intends to write to state without reading it. If a component used the useRecoilState() hook to get the setter, it would also subscribe to updates and re-render when the atom or selector updated. Using useSetRecoilState() allows a component to set the value without subscribing the component to re-render when the value changes.
```jsx
function Form() {
  const setNamesState = useSetRecoilState(namesState);
  
  return <FormContent setNamesState={setNamesState} />;
}
```

##### useResetRecoilState
Using useResetRecoilState() allows a component to reset the state to its default value without subscribing the component to re-render whenever the state changes.
```jsx
const ResetButton = () => {
  const resetName = useResetRecoilState(namesState);
  return <button onClick={resetName}>Reset</button>;
};
```
----
## Components
Components let you split the UI into independent, reusable pieces, and think about each piece in isolation

The simplest way to define a component is to write a JavaScript function:
```jsx
interface Props {
    name: string;
}

function Welcome(props: Props) {
  return <h1>Hello, {props.name}</h1>;
}
```

### Rendering a Component
When React sees an element representing a user-defined component, it passes JSX attributes and children to this component as a single object. We call this object “props”.

```jsx
function HomePage() {
  return <Welcome name="hello world" />;
}
```

Note: Always start component names with a capital letter.

React treats components starting with lowercase letters as DOM tags. For example, `<div />` represents an HTML div tag, but `<Welcome />` represents a component and requires Welcome to be in scope.

### Composing Components
Components can refer to other components in their output. This lets us use the same component abstraction for any level of detail
```jsx
function HomePage() {
  return (
    <div>
        <Welcome name="hello world" />
        <Welcome name="hello OCBC NISP" />
    </div>
  );
}
```

### Conditional Rendering
Conditional rendering in React works the same way conditions work in JavaScript. Use JavaScript operators like if or the conditional operator to create elements representing the current state, and let React update the UI to match them.
```jsx
function Greeting(props) {
  const isLoggedIn = props.isLoggedIn;
  if (isLoggedIn) {
    return <UserGreeting />;
  }
  return <GuestGreeting />;
}
```

### Inline If with Logical && Operator
You may embed expressions in JSX by wrapping them in curly braces. This includes the JavaScript logical && operator. It can be handy for conditionally including an element:
```jsx
function Mailbox(props) {
  const unreadMessages = props.unreadMessages;
  return (
    <div>
      <h1>Hello!</h1>
      {unreadMessages.length > 0 &&
        <h2>
          You have {unreadMessages.length} unread messages.
        </h2>
      }
    </div>
  );
}
```
----
## HOCs
A higher-order component (HOC) is an advanced technique in React for reusing component logic. HOCs are not part of the React API, per se. They are a pattern that emerges from React’s compositional nature. 

Concretely, a higher-order component is a function that takes a component and returns a new component.

----
## Hooks
Hooks are a feature in React that allow you use state and other React features without writing classes.
A custom Hook is a JavaScript function whose name starts with ”use” and that may call other Hooks. For example, useFriendStatus below is our first custom Hook:
```jsx
import { useState, useEffect } from 'react';

function useFriendStatus(friendID) {
  const [isOnline, setIsOnline] = useState(null);

  useEffect(() => {
    function handleStatusChange(status) {
      setIsOnline(status.isOnline);
    }

    ChatAPI.subscribeToFriendStatus(friendID, handleStatusChange);
    return () => {
      ChatAPI.unsubscribeFromFriendStatus(friendID, handleStatusChange);
    };
  });

  return isOnline;
}
```
Just like in a component, make sure to only call other Hooks unconditionally at the top level of your custom Hook.

### Using Hook in Component
```jsx
function FriendStatus(props) {
  const isOnline = useFriendStatus(props.userId);

  if (isOnline === null) {
    return 'Loading...';
  }
  return isOnline ? 'Online' : 'Offline';
}
```

### FAQ
#### Do I have to name my custom Hooks starting with “use”? 
Please do. This convention is very important. Without it, we wouldn’t be able to automatically check for violations of rules of Hooks because we couldn’t tell if a certain function contains calls to Hooks inside of it.

#### Do two components using the same Hook share state? 
No. Custom Hooks are a mechanism to reuse stateful logic (such as setting up a subscription and remembering the current value), but every time you use a custom Hook, all state and effects inside of it are fully isolated.

#### How does a custom Hook get isolated state? 
Each call to a Hook gets isolated state. Because we call useFriendStatus directly, from React’s point of view our component just calls useState and useEffect. And as we learned earlier, we can call useState and useEffect many times in one component, and they will be completely independent.

## List of hooks

### useKeyPress
This hook makes it easy to detect when the user is pressing a specific key on their keyboard.
```
const isPressed = useKeyPress("h");
```
| Parameter | Description | Type | required |
| --- | --- | --- | --- |
| args1 | Keyboard key | string | true |
----
## Models
All Data Types related to application.

#### Example: 

```
export namespace AuthTypes {
  export interface ReqIntrospect {
    ClientId: string;
    CookiesDomain: string;
    CookiesPrefix: string;
  }

  export interface ResIntrospect {
    isSuccess: boolean;
    data: {
      access_token: string;
      status: string;
      scope: string;
      user_info: string;
      local_role: string;
    };
    description: string;
  }
}

```
----
## Pages

### Title and Meta Tags
default Title and Meta Tags is at `public/index.html` file. If you need to dynamically update the page title and meta tag based on the page, you can use `react-helmet`

#### Example: 

src/pages/index.tsx
```
import {Helmet} from 'react-helmet';

function HomePage(){
  return (
    <>
      <Helmet>
        <title> Home | OCBC NISP </title>
        <meta name="description" content="Meta description for home page">
      </Helmet>
      <div>
      <h1> Home </h1>
      </div>
    </>
  )
}

export default HomePage;

```
### File-based routing

#### Index routes

- src/pages/index.tsx -> /
- src/pages/posts/index.tsx -> /posts

#### Nested routes

- src/pages/posts/topic.tsx -> /posts/topic
- src/pages/settings/profile.tsx -> /settings/profile

#### Dynamic routes

- src/pages/posts/[slug].tsx -> /posts/:slug
- src/pages/[user]/settings.tsx -> /:user/settings
- src/pages/posts/[...all].tsx -> /posts/\*

----
## Services
All API call functions must be created inside this directory. 

#### Example: 

```
import { UserTypes } from "models/user";
import { api } from "./api";

export async function createUser(payload: UserTypes.ReqCreateUser) {
  return api.post<UserTypes.ReqCreateUser, UserTypes.ResCreateUser>("/user", payload)
}

export async function getUser(userId: string) {
  return api.get<UserTypes.ResUser>(`/user/${userId}`)
}

export async function deleteUser(userId: string ) {
  return api.delete<UserTypes.ResUser>(`/user/${userId}`)
}

```
----
