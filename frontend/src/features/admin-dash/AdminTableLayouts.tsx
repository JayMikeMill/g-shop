import type { Collection, Order, Product, QueryObject } from "@shared/types";
import {
  formatAddress,
  getProductDiscountLabel,
  getFinalPriceString,
  getTotalOrderItems,
  toMajorPriceString,
} from "@shared/utils";

import { Button, TagBox, type TableColumn } from "@components/ui";
import { buyOrderShipping } from "./order-editor/buyOrderShipping";

export type TableLayout<T> = {
  query: QueryObject<T>; // fields to select from DB for this table
  columns: TableColumn<T>[];
};

// ----- Products -----
export const productTable: TableLayout<Product> = {
  query: {
    select: [
      "images",
      "name",
      "price",
      "discount",
      "discountType",
      "tags",
      "description",
    ],
  },
  columns: [
    {
      id: "image",
      label: "Image",
      width: "120px",
      render: (p: Product) =>
        p.images?.[0] ? (
          <div className="flex items-center justify-center">
            <img
              src={p.images[0].thumbnail}
              className="w-20 h-20 object-cover rounded"
            />
          </div>
        ) : (
          <div className="w-20 h-20 flex items-center justify-center bg-light rounded text-xs">
            No Image
          </div>
        ),
    },
    {
      id: "name",
      label: "Name",
      width: "120px",
      sortable: true,
      render: (p: Product) => (
        <div className="flex items-center justify-center">
          <span className="font-semibold text-center text-text">{p.name}</span>
        </div>
      ),
    },
    {
      id: "price",
      label: "Price",
      sortable: true,
      render: (p: Product) => (
        <div className="flex flex-col items-center justify-center">
          <span className="font-semibold text-center text-base">
            ${toMajorPriceString(p.price)}
          </span>
          <span className="font-semibold text-center text-red-400">
            -{getProductDiscountLabel(p)}
          </span>
          <span className="font-semibold text-center text-base">
            ${getFinalPriceString(p)}
          </span>
        </div>
      ),
    },
    {
      id: "tags",
      label: "Tags",
      width: "120px",
      render: (p: Product) => (
        <div className="flex flex-wrap items-center justify-center">
          {p.tags?.map((tag, index) => (
            <TagBox
              key={index}
              text={tag.name}
              color={tag.color ?? "accent"}
              textColor={tag.textColor ?? "primary-foreground"}
              className="m-1"
            />
          ))}
        </div>
      ),
    },
    {
      id: "description",
      label: "Description",
      width: "300px",
      render: (p: Product) => (
        <div className="flex items-top justify-left">
          <span className="font-semibold text-center text-text">
            {p.description}
          </span>
        </div>
      ),
    },
  ],
};

// ----- Orders -----
export const orderTable: TableLayout<Order> = {
  query: {
    include: ["shippingInfo.address"],
    searchFields: [
      "id",
      "userId",
      "shippingInfo.address.name",
      "shippingInfo.address.street1",
      "shippingInfo.address.street2",
      "shippingInfo.address.city",
      "shippingInfo.address.state",
      "shippingInfo.address.postalCode",
      "shippingInfo.address.country",
    ],
  },
  columns: [
    {
      id: "createdAt",
      label: "Created/Status",
      width: "140px",
      render: (o: Order) => (
        <div className="flex flex-col items-center justify-center">
          <span style={{ whiteSpace: "pre-line" }}>
            {new Date(o.createdAt ?? "").toLocaleString([], {
              year: "numeric",
              month: "2-digit",
              day: "2-digit",
              hour: "2-digit",
              minute: "2-digit",
              hour12: true, // optional, 24-hour format
            })}
          </span>
          <div className="border-b border-black w-full" />
          <span className="font-semibold">{o.status}</span>
        </div>
      ),
    },
    {
      id: "total",
      label: "Total",
      width: "80px",
      render: (o: Order) => (
        <div className="flex flex-col items-center justify-center">
          <span className="font-semibold">Items: {getTotalOrderItems(o)}</span>
          <span className="font-semibold">${(o.total / 100).toFixed(2)}</span>
        </div>
      ),
    },
    {
      id: "shipping",
      label: "Shipping",
      width: "140px",
      render: (o: Order) => (
        <div className="flex flex-col items-center justify-center">
          {o.shippingInfo?.tracking ? (
            <div className="flex flex-col">
              <span className="font-semibold whitespace-pre-wrap">
                {`Tracking\n${o.shippingInfo.tracking}\nStatus:\n${o.shippingInfo.status}`}
              </span>
              <Button
                onClick={(e) => {
                  e.stopPropagation();
                  window.open(
                    o.shippingInfo?.labelUrl || "",
                    "_blank",
                    "noopener,noreferrer"
                  );
                }}
              >
                Label
              </Button>
            </div>
          ) : (
            <Button
              className="primary"
              onClick={(e) => {
                e.stopPropagation();
                buyOrderShipping(o.id!);
              }}
            >
              Buy Shipping
            </Button>
          )}
        </div>
      ),
    },
    {
      id: "address",
      label: "Shipping Address",
      width: "200px",
      render: (o: Order) => (
        <span className="font-semibold text-center whitespace-pre-wrap">
          {formatAddress(o.shippingInfo?.address)}
        </span>
      ),
    },
  ],
};

// ----- Collections -----
export const collectionTable: TableLayout<Collection> = {
  query: {
    select: ["name", "slug", "description"],
  },
  columns: [
    { id: "name", label: "Name", render: (row: Collection) => row.name },
    { id: "slug", label: "Slug", render: (row: Collection) => row.slug },
    {
      id: "description",
      label: "Description",
      render: (row: Collection) => row.description?.slice(0, 50) + "...",
    },
  ],
};
