import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "./App";

const defaultOrder = {
  user: "John Doe",
  products: [
    { count: 1, icon: "🦄", name: "Unicorn", price: 50 },
    { count: 3, icon: "✨", name: "Magic Sparkles", price: 10 },
    { count: 1, icon: "🌈", name: "Rainbow", price: 150 },
    { count: 4, icon: "👾", name: "Space Invader", price: 15 },
  ],
  total: 290,
  discount: 0,
};

const logSpy = jest.spyOn(console, "log");
const alertSpy = jest.spyOn(window, "alert");

afterEach(() => jest.clearAllMocks());
afterAll(() => jest.restoreAllMocks());

/**
 * A set of tests for checking the order creation without coupons.
 * For brevity I kept only one test.
 * In reality though, we would have to test this more thoroughly,
 * and test this function against multiple input variants:
 *
 * - different products in the cart,
 * - different user data,
 * - erroneous requests (empty cart, no user ID),
 * - unsuccessful server responses, etc.
 */

describe("When sent an order form without coupons", () => {
  it("should send the created order to the server", async () => {
    render(<App />);
    userEvent.click(screen.getByRole("button"));

    await screen.findByText("We'll call you to confirm the order.");
    expect(logSpy).toHaveBeenCalledWith(defaultOrder);
    expect(alertSpy).toHaveBeenCalledWith("Your order ID is some-order-id!");
  });
});

/**
 * A set of tests for checking the order creation with coupons.
 * Again, for brevity I kept only a few of these.
 * In reality, we would check against multiple coupons,
 * various data and under different circumstances.
 *
 * This is required to fully understand the code base.
 * When we start working with an unknown piece of code
 * tests are not only a way to ensure no regressions
 * but also a tool to explore the domain and how the code really works.
 */

describe("When sent an order with a coupon", () => {
  it.each([
    { coupon: "HAPPY_MONDAY", discount: 20 },
    { coupon: "LAZY_FRIDAY", discount: defaultOrder.total * 0.2 },
  ])(
    "should include the according discount to the order",
    async ({ coupon, discount }) => {
      const order = { ...defaultOrder, discount };

      render(<App />);
      userEvent.type(screen.getByRole("textbox"), coupon);
      userEvent.click(screen.getByRole("button"));

      await screen.findByText("We'll call you to confirm the order.");
      expect(logSpy).toHaveBeenCalledWith(order);
    }
  );
});
