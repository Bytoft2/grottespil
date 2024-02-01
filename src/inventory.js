export let hotbar = [];

let selected = 0;

export function populateInventory() {
  for (let i = 0; i < 8; i++) {
    hotbar.push(
      add([
        pos(width() / 2 - 256 + i * 64, height() - 128),
        rect(64, 64),
        { type: "", count: 0 },
        outline(6, new Color(0, i == selected ? 128 : 0, 0)),
        area(),
      ])
    );
  }
}

export function getHotbarSelection() {
  return hotbar[selected];
}

function updateSelection(index) {
  getHotbarSelection().outline.color = new Color(0, 0, 0);
  selected = index;
  getHotbarSelection().outline.color = new Color(0, 128, 0);
}

export function changeHotbarSelection(amount) {
  updateSelection(
    (selected + amount) % hotbar.length >= 0
      ? (selected + amount) % hotbar.length
      : hotbar.length + ((selected + amount) % hotbar.length)
  );
}

export function setHotbarSelection(amount) {
  if (amount < 8 && amount >= 0) {
    updateSelection(amount);
  }
}

export function pickUp(t) {
  if (t != "air") {
    for (slot of hotbar) {
      if (slot.type == t) {
        slot.count += 1;
        slot["count_text"].destroy();
        slot["count_text"] = add([
          pos(slot.pos.x, slot.pos.y),
          text(slot.count, {
            size: 48, // 48 pixels tall
            width: 320, // it'll wrap to next line when width exceeds this value
            font: "sans-serif", // specify any font you loaded or browser built-in
          }),
        ]);
        return;
      }
    }
    for (slot of hotbar) {
      if (slot.type == "") {
        slot.type = t;
        slot.count = 1;
        slot["item"] = add([
          pos(slot.pos.x, slot.pos.y),
          sprite(t),
          scale(0.5),
          {
            type: t,
          },
          "invItem",
        ]);
        slot["count_text"] = add([
          pos(slot.pos.x, slot.pos.y),
          text(slot.count, {
            size: 32, // 48 pixels tall
            width: 64, // it'll wrap to next line when width exceeds this value
            font: "sans-serif", // specify any font you loaded or browser built-in
          }),
        ]);
        return;
      }
    }
  }
}

export function removeItem() {
  item = getHotbarSelection();
  if (item.type == "" || item.count == 0) {
    return;
  }
  item.count -= 1;

  if (item.count <= 0) {
    hotbar[selected].destroy();
    hotbar[selected] = add([
      pos(width() / 2 - 256 + selected * 64, height() - 128),
      rect(64, 64),
      { type: "", count: 0 },
      outline(6, new Color(0, 128 , 0)),
      area(),
    ]);
  } else {
    item["count_text"].destroy();
    item["count_text"] = add([
      pos(item.pos.x, item.pos.y),
      text(item.count, {
        size: 48, // 48 pixels tall
        width: 320, // it'll wrap to next line when width exceeds this value
        font: "sans-serif", // specify any font you loaded or browser built-in
      }),
    ]);
  }
}
