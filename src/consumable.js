function Consumable() {
    this.observers = []
}

Consumable.prototype.subscribe = function(observer) {
    return (this.observers.push(observer) -1)
}

Consumable.prototype.unsubscribe = function(index) {
    this.observers.splice(index, 1)
}

Consumable.prototype.dispatch = function(payload) {
    this.observers.forEach(observer => {
        observer(payload)
    })
}

module.exports = Consumable