import { userStub as user } from "./user";
import { cartStub as cart } from "./cart";
import { makePurchase } from "./order";

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

const service = {
  sendOrder: jest.fn(),
};

/**
 * Again, for brevity we keep only a few tests.
 * Just to show how much easier the testing got:
 *
 * - no need to mock global objects;
 * - no need to mock any 3rd-party services
 *   (thanks to adapters and the anti-corruption layer);
 * - no need to render the component,
 *   we can test the use case function as a function.
 */

describe("When made a purchase with a coupon", () => {
  it.each([
    { coupon: "HAPPY_MONDAY", discount: 20 },
    { coupon: "LAZY_FRIDAY", discount: defaultOrder.total * 0.2 },
  ])(
    "should include the according discount to the order",
    async ({ coupon, discount }) => {
      const expected = { ...defaultOrder, discount };
      await makePurchase({ user, cart, coupon, service });
      expect(service.sendOrder).toHaveBeenCalledWith(expected);
    }
  );
});
