import { useApi } from "@app/hooks";

export function buyOrderShipping(orderId: string) {
  const { buyOrderShipping } = useApi().orders;
  buyOrderShipping(orderId);
}
