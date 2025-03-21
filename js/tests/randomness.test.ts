import style, { Color, Style } from "../src/index";

describe("Randomness Test: Styled Terminal Output", () => {
  const TIMES = 200;

  it(`prints ${TIMES} random colors to check randomness.`, () => {
    const history = new Set();
    const text = "   ";

    for (let i = 0; i < TIMES; ++i) {
      const v = style.bg(Color.random).apply(text);
      history.add(v);
    }
    console.log([...history].join(""));

    expect(history.size).toBe(TIMES);
  });
});
