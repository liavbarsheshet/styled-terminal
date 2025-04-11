import style, { Color, Style } from "../src/index";

describe("Randomness Test: Styled Terminal Output", () => {
  const TIMES = 500;

  it(`prints ${TIMES} random colors to check randomness.`, () => {
    const colors: string[] = [];
    const text = "   ";

    for (let i = 0; i < TIMES; ++i) {
      const v = style.bg(Color.random).apply(text);
      colors.push(v);
    }
    console.log([...colors].join(""));
  });
});
