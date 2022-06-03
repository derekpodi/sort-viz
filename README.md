This project was meant to implement different sorting algorithms and utilize github pages hosting.

Code for sorting was partially pulled from [Sorting-Visualizer-Tutorial](https://github.com/clementmihailescu/Sorting-Visualizer-Tutorial).

It was adapted for a nextjs project and updated to host on github pages. 

Currently working in: `yarn run dev` as well as `npm run dev`.

Issues with non-static portions of nextjs within gh-pages - not loading interactive visuals.

Track possible fixes [here](https://github.com/vercel/next.js/issues/3335).

Problem currently lies with: line 98 -> this.state.array.map((value, idx) =>.

Works locally, but can't port to Github Pages correctly.


