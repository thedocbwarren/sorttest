import { DirectiveView } from "presentation-decorator";
import { sortObjects, quicksortObjects } from "next-core-sort";
import { prettyPrint } from "next-core-utilities";
const MOUNT_POINT = "#main";

import { DATA, SORTED, LARGE } from "../testData.js";

const sortStuff = async () => {
  const arrays = {};
  arrays.a = await sortObjects(LARGE, "zindex", false);
  const array = LARGE.slice(0);
  await array.push({
    "id": 0,
    "latitude": 37,
    "longitude": -121,
    "name": 0,
    "zindex": 10
  });
  arrays.b = await sortObjects(array, "zindex", false);

  const array2 = LARGE.slice(0);
  await array2.unshift({
    "id": 0,
    "latitude": 37,
    "longitude": -121,
    "name": 0,
    "zindex": 10
  });
  arrays.c = await sortObjects(array2, "zindex", false);

  arrays.d = await quicksortObjects(LARGE, "zindex", false);

  const array3 = LARGE.slice(0);
  await array3.push({
    "id": 0,
    "latitude": 37,
    "longitude": -121,
    "name": 0,
    "zindex": 10
  });
  arrays.e = await quicksortObjects(array3, "zindex", false);

  const array4 = LARGE.slice(0);
  await array4.unshift({
    "id": 0,
    "latitude": 37,
    "longitude": -121,
    "name": 0,
    "zindex": 10
  });
  arrays.f = await quicksortObjects(array4, "zindex", false);

  return /*HTML*/`
    <h1>Test of Sorting</h1>
    <p><strong>Given object sort ...<strong></p>
    <p>Can objectsort a large array:<p>
    <textarea>${prettyPrint(arrays.a)}</textarea>

    <p>Can objectsort a large array after push:<p>
    <textarea>${prettyPrint(arrays.b)}</textarea>

    <p>Can objectsort a large array after unshift:<p>
    <textarea>${prettyPrint(arrays.c)}</textarea>
    <hr/>
    <p><strong>Given object quicksort ...<strong></p>
    <p>Can quicksort a large array after push:<p>
    <textarea>${prettyPrint(arrays.d)}</textarea>

    <p>Can quicksort a large array after push:<p>
    <textarea>${prettyPrint(arrays.e)}</textarea>

    <p>Can quicksort a large array after unshift:<p>
    <textarea>${prettyPrint(arrays.f)}</textarea>
  `;
};


class HomeView extends DirectiveView {
  constructor() {
    super({
      "el": MOUNT_POINT,
      "name": "homeview",
      "style": "view"
    });
  };

  async render() {
    this.template = await sortStuff();
    return await super.render();
  };
};

export default HomeView;
