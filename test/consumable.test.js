const Consumable = require('../src/consumable')
let consumable;
let observer;
let markNotified;

beforeEach(() => {
    markNotified = jest.fn()
    consumable = new Consumable()
    observer = undefined;
})

test('Should register an observer by adding it to an internal array', () => {
    observer = (payload) => {
        expect(payload).toBe('jeff')
    }
    consumable.subscribe(observer)
    expect(consumable.observers).toContain(observer)
})
test('Should notify all registered observers when its value updates', () => {    
    observer = (payload) => {
        markNotified()
        expect(payload).toBe('bye forever')
    }
    consumable.subscribe(observer)
    consumable.subscribe(observer)
    expect(markNotified).not.toHaveBeenCalled()
    consumable.dispatch('bye forever')
    expect(markNotified).toHaveBeenCalledTimes(2)
})
test('Should remove an observer when the unregister method is called', () => {
    observer = (payload) => {
        markNotified()
        expect(payload).toBe('bye forever')
    }
    const observerIndex = consumable.subscribe(observer)
    consumable.subscribe(observer)
    consumable.unsubscribe(observerIndex)
    expect(markNotified).not.toHaveBeenCalled()
    consumable.dispatch('bye forever')
    expect(markNotified).toHaveBeenCalledTimes(1)
    expect(consumable.observers).toHaveLength(1)
})
