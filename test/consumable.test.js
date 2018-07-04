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
    observer = { update: (payload) => {
        expect(payload).toBe('jeff')
    }}
    consumable.register(observer)
    expect(consumable.observers).toContain(observer)
})
test('Should notify all registered observers when its value updates', () => {    
    observer = { update: (payload) => {
        markNotified()
        expect(payload).toBe('bye forever')
    }}
    consumable.register(observer)
    consumable.register(observer)
    expect(markNotified).not.toHaveBeenCalled()
    consumable.dispatch('bye forever')
    expect(markNotified).toHaveBeenCalledTimes(2)
})
test('Should remove an observer when the unregister method is called', () => {
    observer = { update: (payload) => {
        markNotified()
        expect(payload).toBe('bye forever')
    }}
    const observerIndex = consumable.register(observer)
    consumable.register(observer)
    consumable.unregister(observerIndex)
    expect(markNotified).not.toHaveBeenCalled()
    consumable.dispatch('bye forever')
    expect(markNotified).toHaveBeenCalledTimes(1)
    expect(consumable.observers).toHaveLength(1)
})
