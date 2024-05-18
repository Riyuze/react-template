# Components
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

## Rendering a Component
When React sees an element representing a user-defined component, it passes JSX attributes and children to this component as a single object. We call this object “props”.

```jsx
function HomePage() {
  return <Welcome name="hello world" />;
}
```

Note: Always start component names with a capital letter.

React treats components starting with lowercase letters as DOM tags. For example, `<div />` represents an HTML div tag, but `<Welcome />` represents a component and requires Welcome to be in scope.

## Composing Components
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

## Conditional Rendering
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

## Inline If with Logical && Operator
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


