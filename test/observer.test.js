const Observable = require('../src/observable')
const Observer = require('../src/observer')
let observable;
let observer;
let callback;
let markNotified;

beforeEach(() => {
    observable = new Observable('jeff')
    observer = new Observer(observable)
    markNotified = jest.fn()
})

test('Should bind to the observable specified in its constructor', () => {
    expect(observer.value).toBe('jeff')
})
test('Should return the updated value of the observable', () => {
    expect(observer.value).toBe('jeff')
    observable.value = 'chris'
    expect(observer.value).toBe('chris')
})
test('Should fire the subscribed callback on update of the observable value', () => {
    observer.subscribe(() => {
        markNotified()
    })
    observable.value = 'chris'
    expect(markNotified).toHaveBeenCalledTimes(1)
})
test('Should stop firing the subscribed callback after unsubscribing', () => {
    observer.subscribe(() => {
        markNotified()
    })
    observer.unsubscribe()
    observable.value = 'chris'
    expect(markNotified).not.toHaveBeenCalled()
    expect(observer.value).toBeUndefined
})
test('Should allow setting a final value after unsubscribing', () => {
    observer.subscribe(() => {
        markNotified()
    })
    observer.unsubscribe('jeff')
    observable.value = 'chris'
    expect(markNotified).not.toHaveBeenCalled()
    expect(observer.value).toBe('jeff')
})
test('Should allow manipulation of the value with a callback', () => {
    let checkedVar = observer.subscribe(() => {
        markNotified()
    }).then((value) => [ ...value ].reverse().join(''))
    observable.value = 'chris'
    expect(markNotified).toHaveBeenCalled()
    expect(observable.value).toBe('chris')
    expect(checkedVar.value).toBe('sirhc')
})