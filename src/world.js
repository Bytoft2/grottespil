export let blocks = [];

export function generateWorld() {
  for (let i = 0; i < 27; i++) {
    let vert = [];
    for (let j = 0; j < 15; j++) {
      if (j < 3) {
        vert.push(add([pos(i * 128, j * 128), { type: "air" }]));
      } else if(j==3) {
        vert.push(
            add([
              pos(i * 128, j * 128),
              sprite("grass"),
              { type: "grass" },
              area(),
              body({ isStatic: true }),
            ])
          );
      } else {
        vert.push(
          add([
            pos(i * 128, j * 128),
            sprite("dirt"),
            { type: "dirt" },
            area(),
            body({ isStatic: true }),
          ])
        );
      }
    }
    blocks.push(vert);
  }
}

export function getBlock(x, y) {
  return blocks[Math.floor(x / 128)][Math.floor(y / 128)];
}
