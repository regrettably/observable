const ObservablesJS = require('../index')

test('We should export an object containing Observable and Observer', () => {
    expect(ObservablesJS).toHaveProperty('Observable')
    expect(ObservablesJS).toHaveProperty('Observer')
})