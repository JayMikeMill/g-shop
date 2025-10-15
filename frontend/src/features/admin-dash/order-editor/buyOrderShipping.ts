import { useApi } from "@api";

export function buyOrderShipping(orderId: string) {
  const { buyOrderShipping } = useApi().orders;
  buyOrderShipping(orderId);
}
