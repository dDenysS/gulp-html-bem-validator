const assert = require('assert').strict
const fs = require('fs')
const path = require('path')
const htmlBemValidator1 = require('../src')

describe('gulp-html-bem-validator', () => {
    describe('should work in buffer mode', () => {
        it('should not be errors because a valid bem html is passed', () => {
            const html = fs.readFileSync(path.join(__dirname, '/fixtures/valid.html'))
            const {countBemWarning} = htmlBemValidator1.htmlBemValidator({content: html.toString()})

            assert.equal(countBemWarning, 0)
        })

        it('should be one error bem', () => {
            const html = fs.readFileSync(path.join(__dirname, '/fixtures/no-valid-error-1.html'))
            const {countBemWarning} = htmlBemValidator1.htmlBemValidator({content: html.toString()})

            assert.strictEqual(countBemWarning, 1)
        })

        it('should be one error bem(prefix)', () => {
            const html = fs.readFileSync(path.join(__dirname, '/fixtures/prefix-error.html'))
            const {countBemWarning} = htmlBemValidator1.htmlBemValidator({content: html.toString()})

            assert.strictEqual(countBemWarning, 1)
        })

        it('output the success result to the console', () => {
            const html = fs.readFileSync(path.join(__dirname, '/fixtures/valid.html'))

            htmlBemValidator1.htmlBemValidatorResult({name: 'valid.html', content: html.toString()})
        })

        it('output the error result to the console', () => {
            const html = fs.readFileSync(path.join(__dirname, '/fixtures/no-valid-error-1.html'))

            htmlBemValidator1.htmlBemValidatorResult({name: 'no-valid-error-1.html', content: html.toString()})
        })
    })
})
