import kaboom from "kaboom";
import { generateWorld, blocks, getBlock } from "./world";
import {
  hotbar,
  populateInventory,
  changeHotbarSelection,
  setHotbarSelection,
  getHotbarSelection,
  pickUp,
  removeItem,
} from "./inventory";

const k = kaboom({
  background: [158, 199, 225],
});

k.loadSprite("bean", "sprites/bean.png");

k.loadSprite("grass", "sprites/blocks/grass.png");

k.loadSprite("dirt", "sprites/blocks/dirt.png");


k.setGravity(1600);

generateWorld();

populateInventory();

const player = add([
  center(),
  pos(120, -80),
  sprite("bean"),
  area(),
  body(),
  {
    speed: 400,
  },
]);

k.onKeyDown("d", () => {
  player.move(player.speed, 0);
});

k.onKeyDown("a", () => {
  player.move(-player.speed, 0);
});

k.onKeyPress("space", () => {
  if (player.isGrounded()) {
    player.jump(800);
  }
});

function handleLeftMouse() {
  if (
    Math.abs(
      Math.floor(k.mousePos().x / 128) - Math.floor(player.pos.x / 128)
    ) > 1 ||
    Math.abs(
      Math.floor(k.mousePos().y / 128) - Math.floor(player.pos.y / 128)
    ) > 1
  ) {
    return;
  }
  const [block_x, block_y] = [
    Math.floor(k.mousePos().x / 128),
    Math.floor(k.mousePos().y / 128),
  ];
  let b = getBlock(k.mousePos().x, k.mousePos().y);
  pickUp(b.type);

  k.destroy(b);
  blocks[block_x][block_y] = add([
    k.pos(block_x * 128, block_y * 128),
    { type: "air" },
  ]);
}

function handleRightMouse() {
  const xdiff = Math.abs(
    Math.floor(k.mousePos().x / 128) - Math.floor(player.pos.x / 128)
  )

  const ydiff = Math.abs(
    Math.floor(k.mousePos().y / 128) - Math.floor(player.pos.y / 128)
  )

  if (
    xdiff > 1 ||
    ydiff > 1 || (xdiff == 0 && ydiff == 0)
  ) {
    return;
  }


  if ((getHotbarSelection.type = "")) {
    return;
  }

  let block = getBlock(
    k.mousePos().x,
    k.mousePos().y
  );


  if (block.type != "air") {
    return;
  }

  if (getHotbarSelection().type == "") {
    return;
  }

  const [block_x, block_y] = [
    Math.floor(k.mousePos().x / 128),
    Math.floor(k.mousePos().y / 128),
  ];

  block.destroy();
  blocks[block_x][block_y] = add([
    pos(block_x * 128, block_y * 128),
    sprite(getHotbarSelection().type),
    { type: getHotbarSelection().type },
    area(),
    body({ isStatic: true }),
  ]);
  removeItem();

}

k.onMousePress((e) => {
  if (e == "left") {
    handleLeftMouse();
  } else if (e == "right") {
    handleRightMouse();
  }
});

k.onKeyPress("1", () => {
  setHotbarSelection(0);
});

k.onKeyPress("2", () => {
  setHotbarSelection(1);
});

k.onKeyPress("3", () => {
  setHotbarSelection(2);
});

k.onKeyPress("4", () => {
  setHotbarSelection(3);
});
k.onKeyPress("5", () => {
  setHotbarSelection(4);
});

k.onKeyPress("6", () => {
  setHotbarSelection(5);
});

k.onKeyPress("7", () => {
  setHotbarSelection(6);
});

k.onKeyPress("8", () => {
  setHotbarSelection(7);
});

onScroll((e) => {
  if (e.y > 0) {
    changeHotbarSelection(-1);
  } else if (e.y < 0) {
    changeHotbarSelection(1);
  }
});
