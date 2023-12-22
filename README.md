# Mind Map

## About the project

For a long time I've been very interested in knowledge structurization and knowledge mapping. This mostly stems from me being constantly interesting in a multitude of topics, but often forgetting interesting sources that I found on the internet.

This project is my attempt at playing with mindmaps (check the [definition on wikipedia](https://en.wikipedia.org/wiki/Mind_map)).
I would like to be able to draw both easy to read and nicely looking hierarchical structures of data.
Right now I'm trying to generate trees with 2 styles of visualization:
 - standard top-to-bottom tree
 - radial tree-like graph

This is very alpha-version and a lot of things is not working yet.

## Tech
- TS
- vite
- React
- d3.js
- bulma css (might change)
- plain CSS + BEM
- eslint + prettier

### template
Project was jump started with basic vite `react-ts` template.
I had good experience with it, provided just the basic building blocks but was not very opinionated.

### UI
React 18 is used for all the app UI, and most of state, that is NOT the actual tree visualization. React is the fastest way for me to render the app and manipulate DOM to have good looking interface.
Even though the actual tree layouting and visualization is done in d3 and SVG, React takes care of all the rest.

### Tree layouting
Rendering of the actual tree/mind map is done using d3. This library is very powerful and allows for a lot of customization (which was very good in this project).
Specifically:
 - [d3-hierarchy](https://d3js.org/d3-hierarchy/hierarchy) creates the hierarchy for specific node/tree sizes
 - [d3-tree](https://d3js.org/d3-hierarchy/tree) layouts the tree

The the actual contents and lines are rendered in SVG. For nodes just a plain `div` is attached (via `<foreignNode>` element) into which node contents are rendered using `React.createPortal`

`TODO improve this section``

### Styling
TODO

## Useful articles and sources
 - [Base example of d3 tidy tree from Observable](https://observablehq.com/@d3/tree-component)
 - [A Brief Guide to TypeScript and D3js Hierarchy and Trees](https://javascript.plainenglish.io/a-brief-guide-to-typescript-and-d3js-hierarchy-and-trees-f9bb45871d88) - this was extremely helpful in handling generics from d3 which were quite tricky
 - 