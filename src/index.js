const htmlParser = require('node-html-parser')
const CAT = require('classic-ancii-tree')
const randomItem = require('random-item')
const chalk = require('chalk')

const COLORS = ['green', 'yellow', 'blue']

let prevNameHtmlNode = ''
let prevNameHtmlColor = 'white'
let countBemWarning = 0

function resetInitialState() {
    prevNameHtmlNode = ''
    prevNameHtmlColor = 'white'
    countBemWarning = 0
}

function createNode({label, color}) {
    return {
        label,
        color,
        nodes: []
    }
}

function createLabelTree(element) {
    let label = element.tagName
    if (element.id) label += `#${element.id.split(' ').join('#')}`
    if (element.classNames.length) label += `.${element.classNames.join('.')}`

    return label
}

function generateRandomColor(name) {
    if (prevNameHtmlNode !== name) {
        const color = randomItem(COLORS)
        if (color === prevNameHtmlColor) {
            prevNameHtmlColor = color
            return 'black'
        }

        prevNameHtmlColor = color
        prevNameHtmlNode = name
        return color
    }

    return prevNameHtmlColor
}

function htmlThreeFormatAst(htmlTree) {
    let ast = {}
    for (const element of htmlTree.childNodes) {
        if (element.nodeType !== 1) continue
        ast = createNode({label: createLabelTree(element), color: generateRandomColor(element.tagName)})

        element.parentElement = null

        formatTree({
            htmlNodes: element.childNodes,
            astNodes: ast.nodes,
            parent: element
        })
    }

    return ast
}


/**
 * Function copies classes to a child element from parent!
 * @param {Object} elements - The element of a node-html-parse three.
 * @param {Object} elements.element - The element of a node-html-parse three.
 * @param {Object} elements.parent - The parent of a element node-html-parse three.
 */
function copyParentPrefixes({element, parent}) {
    if (!parent || !parent.customDataSet) {
        return
    }

    for (const prefix in parent.customDataSet.prefixes) {
        element.customDataSet.prefixes[prefix] = prefix
    }
}

/**
 * Function copies and split classes.
 * @param {Object} elements - The element of a node-html-parse three.
 * @param {Object} elements.element - The element of a node-html-parse three.
 * @param {Object} elements.parent - The parent of a element node-html-parse three.
 */
function addClassesAsPrefixes({element, parent}) {
    copyParentPrefixes({element, parent})

    element.classNames.forEach(name => {
        if (name.split('__').length === 1 && name.split('--').length === 1) {
            element.customDataSet.prefixes[name] = name
        }
    })
}

/**
 * Function formats a ast tree. This function is recursive!
 * @param {Object} nodes - The trees what are  for the project.
 * @param {Object} nodes.htmlNodes[] - The html tree of node-html-parse.
 * @param {Object} nodes.astNodes[] - The ast tree classic-ancii-tree.
 * @param {Object} nodes.parent - The parent element of htmlNodes.
 */
function formatTree({htmlNodes, astNodes, parent}) {
    for (const element of htmlNodes) {
        if (element.nodeType !== 1) continue

        if (!element.customDataSet) {
            element.customDataSet = {
                prefixes: {},
                parentElement: parent
            }
        }

        addClassesAsPrefixes({element, parent})
        checkBemElement(element)

        const node = createNode({
            label: createLabelTree(element),
            color: element.customDataSet.hasError ? 'red' : generateRandomColor(element.tagName)
        })
        astNodes.push(node)


        if (element.childNodes.length) {
            formatTree({htmlNodes: element.childNodes, astNodes: node.nodes, parent: element})
        }
    }
}

function checkBemElement(element) {
    if (element.classNames.join().indexOf('__') < 0 &&
        element.classNames.join().indexOf('--') < 0) {
        return false
    }

    element.classNames.forEach(classItem => {
        if (classItem.split('__').length > 1) {
            let prefixCorrect = false
            const prefix = classItem.split('__')[0]

            if (element.customDataSet.prefixes[prefix]) {
                prefixCorrect = true
            }

            if (!prefixCorrect) {
                countBemWarning++

                element.customDataSet.hasError = true
            }
        }

        // modifier
        if (classItem.split('--').length > 1) {
            let modifierPrefixCorrect = false
            const modifierPrefix = classItem.split('--')[0]

            if (~element.classNames.indexOf(modifierPrefix)) modifierPrefixCorrect = true

            if (!modifierPrefixCorrect) {
                countBemWarning++

                element.customDataSet.hasError = true
            }
        }
    })
}

function htmlBemValidator({content}) {
    const htmlThree = htmlParser.parse(content)
    const treeAst = htmlThreeFormatAst(htmlThree)

    const result = {
        countBemWarning,
        treeAst
    }
    resetInitialState()

    return result
}

function htmlBemValidatorResult({name, content}) {
    const {countBemWarning, treeAst} = htmlBemValidator({name, content})

    if (countBemWarning) {
        console.log(CAT(treeAst))
        console.log(chalk.black.bgRed.bold(`❌ ${countBemWarning} - count bem warning. Filename:${name}`))
    } else {
        console.log(chalk.bgBlack.green(`✔ Gulp-html-bem-validator: Success. Filename:${name}`))
    }
}

module.exports = {
    htmlBemValidator,
    htmlBemValidatorResult
}
