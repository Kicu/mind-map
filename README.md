# Mind Map

## About the project

For a long time I've been drawn to knowledge structurization and mapping. This mostly comes from me often getting interested in a multitude of random topics, then doing research on them, but ultimately forgetting a lot of it. After that I would have a hard time coming back to the sources that I found on the internet knowledge that I gathered.

Normal note making and saving links didn't cut it (I tried Notion among others), so I wanted a more visual way to keep such notes.

This project is my attempt at playing with mindmaps (check out the definition on [wikipedia](https://en.wikipedia.org/wiki/Mind_map)).  
It's purpose is to be able to draw both easy to read and pretty looking hierarchical structures of data.
Right now I'm trying to generate trees with 2 styles of visualization:

- standard top-to-bottom tree
- radial tree-like graph

This is very alpha and a lot of things are not yet working correctly. The app also only works based on static data commited inside this repo in `/src/state/static`.

That being said here are some screenshots of maps generated by version `0.1`
<p>
    <img width="380" alt="radial-2" src="https://github.com/Kicu/mind-map/assets/3929868/81e2f469-9efb-4192-a9ab-78cda3732d1a">
    <img width="420" alt="radial-1" src="https://github.com/Kicu/mind-map/assets/3929868/df1f28ad-44a4-4fe4-81cd-801f47c504a7">
</p>
<img width="800" alt="tree-1" src="https://github.com/Kicu/mind-map/assets/3929868/9a733699-e2be-4440-8410-59493cbc2ca1">

## Tech ⚙️

- TypeScript
- Vite
- React
- [d3.js](https://d3js.org/)
- [bulma css](https://bulma.io) (might change)
- plain CSS + BEM
- eslint + prettier

After experimenting with some other ideas d3 was chosen as the main library for managing and displaying hierarchical data.

### Running
  - clone repo
  - `npm install` to install deps (`yarn` should also work)
  - `npm run dev` to start the dev task

### Project template

Project was jump started with basic vite `react-ts` template.
It provides just the basic building blocks but is not very opinionated, I further updated linting config, the rest of build scripts is left mostly unchanged.

### UI and state

- React (18) is used for most of app UI and state, but NOT the actual drawing of the tree (map). React is the fastest way for me to render the app and manipulate DOM to have good looking, responsive interface.
- The actual tree layouting and visualization is done in d3 and SVG but there is one exception - the content of the nodes is also React (_more below_).
- State is handled via mostly standard React practices: POJOs and `useState` hook.

### Map (Tree) layouting and visualization

Rendering of the actual graph/tree/mind map (I sometimes use these terms interchangeably) is done using d3.  
Specifically:
- [d3-hierarchy](https://d3js.org/d3-hierarchy/hierarchy) creates the hierarchy object
- [d3-tree](https://d3js.org/d3-hierarchy/tree) layouts the tree and calculates coords for all nodes and branches 

The map is then rendered as an SVG.  
Lines (branches) of the tree are rendered as SVG line objects, but nodes are rendered via `<foreignObject>` for better flexibility. Thanks to that map is currently agnostic of _what_ specifically lands in the nodes - a node rendering function is injected via function arguments.

To be able to use React for nodes content, the provided rendering function simply renders only a plain `<div>` with specific id.
Then the actual visual content of the nodes is rendered using `React.createPortal`. Thanks to that all the nodes are actual react components connected to main react tree, however visually the are nicely rendered in the SVG.

### Styling
Styling is done via plain old CSS using BEM. I have also used bulmacss to get some nicely looking form elements to save time.

`TODO: improve this section`

## Next steps & bugs 🔧
### 1. add scrolling, panning and zooming ✅
  - ~~right now mindmap is an svg with static size, if it gets too big nodes cannot be viewed~~
  - DONE

### 2. improve displaying nodes and their content
  - right now nodes are very rudimentary and long words will not fit in them, this needs to be improved
  - allow for other kinds of content: hyperlinks, images etc

### 3. proper data manipulation
  - currently user cannot in any way edit data - data is a just a static file with a js object inside
  - allow adding new nodes and removing existing nodes
  - actual api with some storage - either mock db (file based) or some actual db 

### list of known bugs
  - on hover/on click z-indexes don't work correctly, nodes get covered with children nodes
  - no easy way to fit and center radial map on the viewbox, makes it look bad in initial render (lots of whitespace)
  - nodeWidth isn't really taken into account for radial map - refactor this

## Useful articles and sources

- [Base example of d3 tidy tree from Observable](https://observablehq.com/@d3/tree-component)
- [Base example of d3 radial tree from Observable](https://observablehq.com/@d3/radial-tree-component)
- [A Brief Guide to TypeScript and D3js Hierarchy and Trees](https://javascript.plainenglish.io/a-brief-guide-to-typescript-and-d3js-hierarchy-and-trees-f9bb45871d88) - this was extremely helpful in handling generics from d3 which were quite tricky
- [D3 Zoom - The Missing Manual](https://www.datamake.io/blog/d3-zoom) - an amazing resource helping to make sense of zooming in d3