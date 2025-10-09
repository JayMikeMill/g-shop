import { controllerHandler } from "@utils/controllerHandler";
import { ShippingService as S } from "@services/ShippingService";

export const verifyAddress = controllerHandler({ handler: S.verifyAddress });

export const getRates = controllerHandler({
  handler: ({ from, to, parcel }) => S.getRates(from, to, parcel),
});

export const trackShipment = controllerHandler({
  handler: ({ trackingNumber }) => S.trackShipment(trackingNumber),
});

export const createShipment = controllerHandler({
  handler: ({ from, to, parcel }) => S.createShipment(from, to, parcel),
  response: (res, result) => res.status(201).json(result),
});

export const buyShipment = controllerHandler({
  handler: ({ shipmentId, rate }) => S.buyShipment(shipmentId, rate),
});

export const cancelShipment = controllerHandler({
  handler: ({ shipmentId }) => S.cancelShipment(shipmentId),
});
