function Consumable() {
    this.observers = []
}

Consumable.prototype.register = function(observer) {
    return (this.observers.push(observer) -1)
}

Consumable.prototype.unregister = function(index) {
    this.observers.splice(index, 1)
}

Consumable.prototype.dispatch = function(payload) {
    this.observers.forEach(observer => {
        observer.update(payload)
        if (observer.after) observer.after(payload)
    })
}

module.exports = Consumable