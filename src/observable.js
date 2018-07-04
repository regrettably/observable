function Observable(value) {
    this.observers = []
    Object.defineProperty(this, 'value', {
        get: () => value,
        set: (newValue) => {
            value = newValue
            this.notifyObservers()
        }
    })
}

Observable.prototype.register = function(observer) {
    return (this.observers.push(observer) -1)
}

Observable.prototype.unregister = function(index) {
    this.observers.splice(index, 1)
}

Observable.prototype.notifyObservers = function() {
    this.observers.forEach(observer => {
        observer.update(this)
        if (observer.after) observer.after(this)
    })
}

module.exports = Observable
