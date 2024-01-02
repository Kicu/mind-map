# Mind Map

## About the project

For a long time I've been drawn to knowledge structurization and mapping. This mostly comes from me often getting interested in a multitude of random topics, then doing research on them, but ultimately forgetting a lot of it. After that I would have a hard time coming back to the sources that I found on the internet knowledge that I gathered.

Normal note making and saving links didn't cut it (I tried notion), so I wanted a more visual way to keep such notes.

This project is my attempt at playing with mindmaps (check out the definition on [wikipedia](https://en.wikipedia.org/wiki/Mind_map)).  
It's purpose is to be able to draw both easy to read and pretty looking hierarchical structures of data.
Right now I'm trying to generate trees with 2 styles of visualization:

- standard top-to-bottom tree
- radial tree-like graph

This is very alpha-version and a lot of things is not working yet.

## Tech

- TypeScript
- Vite
- React
- [d3.js](https://d3js.org/)
- [bulma css](https://bulma.io) (might change)
- plain CSS + BEM
- eslint + prettier

After experimenting with some other ideas d3 was chosen as the main library for managing the hierarchical data. The mindmap is represented as a tree.

### Project template

Project was jump started with basic vite `react-ts` template.
It provides just the basic building blocks but is not very opinionated, I further updated linting config, the rest of build scripts is left mostly unchanged.

### UI and state

- React (18) is used for most of app UI and state, BUT NOT the actual tree visualization.  
- React is the fastest way for me to render the app and manipulate DOM to have good looking, responsive interface.
Even though the actual tree layouting and visualization is done in d3 and SVG, React takes care of all the rest. There is one exception - actual html content of nodes is also React (_more below_).
- State is handled via mostly standard React practices: POJOs and `useState` hook.

### Map/Tree layouting

Rendering of the actual tree/mind map is done using d3. This library is very powerful and allows for a lot of customization (which was very good in this project).
Specifically:

- [d3-hierarchy](https://d3js.org/d3-hierarchy/hierarchy) creates the hierarchy for specific node/tree sizes
- [d3-tree](https://d3js.org/d3-hierarchy/tree) layouts the tree

The lines (branches) of the map are rendered in SVG. The nodes are also rendered in svg (as we need tree data for them), however a "node" in the map just a plain `div` with specific id, attached via `<foreignNode>` element. That...

The actual visual content of the nodes is later rendered using `React.createPortal`

`TODO improve this section`

### Styling

TODO

## Useful articles and sources

- [Base example of d3 tidy tree from Observable](https://observablehq.com/@d3/tree-component)
- [A Brief Guide to TypeScript and D3js Hierarchy and Trees](https://javascript.plainenglish.io/a-brief-guide-to-typescript-and-d3js-hierarchy-and-trees-f9bb45871d88) - this was extremely helpful in handling generics from d3 which were quite tricky
-
