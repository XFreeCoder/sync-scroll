import { Ratio } from "../ratio";

describe("ratio", () => {
  test("constructor error", () => {
    expect(() => new Ratio(2)).toThrowError(
      "ratio should be [0, 1], but current ratio is 2."
    );
  });

  test("getter", () => {
    const ratio = new Ratio(0.98);
    expect(ratio.value).toEqual(0.98);
  });

  test("setter", () => {
    const ratio = new Ratio();
    expect(ratio.value).toEqual(0);
    ratio.value = 0.5;
    expect(ratio.value).toEqual(0.5);
  });

  test("should throw error while setting value not in [0, 1]", () => {
    const ratio = new Ratio(0.2);
    expect(() => {
      ratio.value = -1;
    }).toThrowError("ratio should be [0, 1], but current ratio is -1.");
    expect(() => {
      ratio.value = 3;
    }).toThrowError("ratio should be [0, 1], but current ratio is 3.");
  });
});
