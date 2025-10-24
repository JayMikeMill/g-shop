import { useApi } from "@app/hooks";

export async function buyOrderShipping(orderId: string) {
  const { buyOrderShipping } = useApi().orders;
  const order = await buyOrderShipping(orderId);
  return order;
}
