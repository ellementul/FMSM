import test from 'ava'
import { StateMachine, INIT_STATE_NAME, INIT_ACTION_NAME } from './index.js'

const SECOND_STATE_NAME = "Second State Uniq Name"

const FIRST_ACTION_NAME = "Action Uniq Name"
const SECOND_ACTION_NAME = "Second Action Uniq  Name"

test("Main flow", t => {
    t.plan(10)

    const stateMachine = new StateMachine() 
    t.truthy(stateMachine)

    stateMachine.addAction(FIRST_ACTION_NAME, INIT_STATE_NAME, SECOND_STATE_NAME)
    stateMachine.on(FIRST_ACTION_NAME, (actionName, prevState, nextState) => {
        t.is(actionName, FIRST_ACTION_NAME)
        t.is(prevState, INIT_STATE_NAME)
        t.is(nextState, SECOND_STATE_NAME)
    })
    stateMachine.start()
    stateMachine.call(FIRST_ACTION_NAME)

    stateMachine.addAction(SECOND_ACTION_NAME, SECOND_STATE_NAME, INIT_STATE_NAME)
    stateMachine.on(SECOND_ACTION_NAME, (actionName, prevState, nextState) => {
        t.is(actionName, SECOND_ACTION_NAME)
        t.is(prevState, SECOND_STATE_NAME)
        t.is(nextState, INIT_STATE_NAME)
    })
    stateMachine.call(SECOND_ACTION_NAME)

    stateMachine.setState(SECOND_STATE_NAME)
})