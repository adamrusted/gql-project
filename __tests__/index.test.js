const { run } = require("../src/main");
jest.mock("../src/main", () => ({
  run: jest.fn(),
}));

describe("Action Index", () => {
  it("calls run when imported", async () => {
    require("../src/index");
    expect(run).toHaveBeenCalled();
  });
});
