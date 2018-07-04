const Observable = require('../src/observable')
let observable;
let observer;
let markNotified;

beforeEach(() => {
    markNotified = jest.fn()
    observable = new Observable('jeff')
    observer = undefined;
})

test('Should initialize an observable with the value specified in its constructor', () => {
    expect(observable.value).toBe('jeff')
})
test('Should register an observer by adding it to an internal array', () => {
    observer = { update: (observable) => {
        expect(observable.value).toBe('jeff')
    }}
    observable.register(observer)
    expect(observable.observers).toContain(observer)
})
test('Should notify all registered observers when its value updates', () => {    
    observer = { update: (observable) => {
        markNotified()
        expect(observable.value).toBe('chris')
    }}
    observable.register(observer)
    observable.register(observer)
    expect(markNotified).not.toHaveBeenCalled()
    observable.value = 'chris'
    expect(markNotified).toHaveBeenCalledTimes(2)
})
test('Should remove an observer when the unregister method is called', () => {
    observer = { update: (observable) => {
        markNotified()
        expect(observable.value).toBe('chris')
    }}
    const observerIndex = observable.register(observer)
    observable.register(observer)
    observable.unregister(observerIndex)
    expect(markNotified).not.toHaveBeenCalled()
    observable.value = 'chris'
    expect(markNotified).toHaveBeenCalledTimes(1)
    expect(observable.observers).toHaveLength(1)
})
