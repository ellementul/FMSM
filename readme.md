# Friendly Minimal State Machine
## Constructor
```js
import { StateMachine } from '@ellementul/state-machine'

const stateMachine = new StateMachine() // without options
```

## How to defined states and actions
**_Recommendation:_** use constants for names of actions and states, methods to call actions will make automatically by them names!
```js
const FIRST_STATE_NAME = "Uniq State Name"
const SECOND_STATE_NAME = "Second State Uniq Name"

const FIRST_ACTION_NAME = "Action Uniq Name"
const SECOND_ACTION_NAME = "Second Action Uniq  Name"

stateMachine.addAction(
    FIRST_ACTION_NAME, // States will be defined by Uniq name automatically if one of them is not exist yet. 
    FIRST_STATE_NAME, 
    SECOND_STATE_NAME
)
.addAction( //chaining calling
    SECOND_ACTION_NAME, // States will be find automatically for new action
    SECOND_STATE_NAME,
    FIRST_STATE_NAME,
    () => {} // optionally set callback on action
)

```

#### Defined Init Action
```js
stateMachine.addAction(StateMachine.INIT_ACTION_NAME, FIRST_STATE_NAME)//Second argument optionaly
// default it is
stateMachine.addAction(StateMachine.INIT_ACTION_NAME, StateMachine.INIT_STATE_NAME)
//or just run state machine
stateMachine.start()
```

## Start machine
```js
stateMachine.start(FIRST_STATE_NAME) //Optionally first argument it need if you didn't set init Action yet, then init action will be create automatically
```

## Set callback on action

```js
    const callback = (actionName, prevState, nextState) => {}
    stateMachine.on(FIRST_ACTION_NAME, callback)
```
**_NOTE:_** Old callback will be rewrite!

### If need remove callback:
```js
    stateMachine.off(FIRST_ACTION_NAME)
```


## Call your action
```js
    const result = stateMachine.call(FIRST_ACTION_NAME)
```
### Restart machine
```js
    const result = stateMachine.call(StateMachine.INIT_ACTION_NAME)
```

Method return ```true``` if it is successfully

## Call to enter in defined state
Find action to exit current state and to enter next state
If so action don't exist, then call Exeption 
```js
    stateMachine.setState(FIRST_STATE_NAME)
```

## TODO if it will need
### Actions chain
Find chain of actions to enter needed state
```js
    stateMachine.findActionsToEnter(FIRST_STATE_NAME)
```