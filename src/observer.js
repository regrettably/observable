function Observer(observable) {
    let value
    let observerIndexPosition
    let registeredCallback
    function update() {
        return this.value
    }
    this.subscribe = (after) => {
        observerIndexPosition = observable.register({ update, after })
        return this
    }
    this.unsubscribe = (finalValue) => {
        observable.unregister(observerIndexPosition)
        observable = undefined
        value = finalValue
    }
    this.then = (callback) => {
        registeredCallback = callback
        return this
    }

    Object.defineProperty(this, 'value', {
        get: () => {
            if (!observable) return value
            if (registeredCallback) return value = registeredCallback(observable.value)
            return value = observable.value
        },
    })
}

module.exports = Observer
