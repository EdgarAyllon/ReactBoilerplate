 /*
 *
 * This generates a fake array of X elements containing position( top, left ) in viewport with random size( width, height )
 * @param {number} maxItems is the number of elements to generate, if ommited sets 10 as default.
 * @param {number} gridHeight is the grid height, if ommited sets 4000(px) as default.
 * @param {number} gridWidth is the width of the grid, if ommited set 4000(px) as default.
 * @return {array<object>} array containing generated fake elements
 */
function generateFakeObject(maxItems = 10, gridHeight = 4000, gridWidth = 4000) {
    const fakeElements = [];
    // Generates a random value, it's a helper.
    const random = (max=1, min=0) => Math.floor(Math.random()*(max - min) + min);
    
    // generate X elements ( based on maxItems param ) filled with properties:
    // - id, self explanatory ;), the ID(number) that identifies the object.
    // - zIndex, the z (visual deepth) coord, random( range 0...10 ).
    // - top/left, the x/y coord position in grid, random( range 0...max body width ).
    // - width / height, the element dimension area, random( range( minSize...maxSize) ).
    for(let acc=0; acc < maxItems; acc++){
        fakeElements[acc] = {
            id: acc,
            zIndex: random(10,0),
            top: random(3800),
            left: random(3800),
            width: 100,
            height: 100,
        };
    }
    return fakeElements;
}

export { generateFakeObject };