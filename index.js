class StateMachine {
    constructor() {
        this.actions = new Map
        this.currentState = null
    }

    addAction(actionName, exitState, enterState, callback) {
        if(this.actions.has(actionName))
            throw new Error(`StateMachine: this action name(${actionName}) exists already!`)

        if(callback && typeof callback !== "function")
            throw new Error(`Callback has to be function!`)

        if(INIT_ACTION_NAME === actionName)
            this.actions.set(actionName, [null, exitState])
        else
            this.actions.set(actionName, [exitState, enterState, callback])
    }

    on(actionName, callback) {
        if(!this.actions.has(actionName))
            throw new Error(`StateMachine: action with this name(${actionName}) don't exist!`)

        if(typeof callback !== "function")
            throw new Error(`Callback has to be function!`)

        this.actions.get(actionName)[2] = callback
    }

    start(initState) {
        initState ||= INIT_STATE_NAME

        if(!this.actions.has(INIT_ACTION_NAME))
            this.addAction(INIT_ACTION_NAME, initState)

        this.call(INIT_ACTION_NAME)
    }

    call(actionName) {
        if(!this.actions.has(actionName))
            throw new Error(`StateMachine: action with this name(${actionName}) don't exist!`)

        let [ exitState, enterState, callback ] = this.actions.get(actionName)
        

        if(INIT_ACTION_NAME !== actionName && this.currentState !== exitState)
            return false

        this.currentState = enterState

        if(callback)
            callback(actionName, exitState, enterState)
    }

    setState(state) {
        for (const [actionName, [exitState, enterState]] of this.actions) {
            if(exitState === this.currentState && enterState === state)
                return this.call(actionName)
        }

        throw new Error(`StateMachine: Machine didn't find action to move from ${this.currentState} state to ${state} state`)
    }
}

const INIT_STATE_NAME = "InitStateForFMSM"
const INIT_ACTION_NAME = "InitActionForFMSM"

export { StateMachine, INIT_STATE_NAME, INIT_ACTION_NAME }