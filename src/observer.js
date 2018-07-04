function Observer(observable) {
    let value = observable.value
    let observableIndex
    let registeredCallback
    function update(observed) {
        if (registeredCallback) {
            value = registeredCallback(observed.value)
        } else {
            value = observed.value
        }
    }
    this.subscribe = (after) => {
        observableIndex = observable.register({ update, after })
        return this
    }
    this.unsubscribe = (finalValue) => {
        observable = undefined
        value = finalValue
        observable.unregister(observableIndex)
    }
    this.then = (callback) => {
        registeredCallback = callback
        value = update(observable.value)
        return this
    }

    Object.defineProperty(this, 'value', {
        get: () => value,
    })
}

module.exports = Observer
