# Hooks
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

#### Using Hook in Component
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

# List of hooks

## useKeyPress
This hook makes it easy to detect when the user is pressing a specific key on their keyboard.
```
const isPressed = useKeyPress("h");
```
| Parameter | Description | Type | required |
| --- | --- | --- | --- |
| args1 | Keyboard key | string | true |
