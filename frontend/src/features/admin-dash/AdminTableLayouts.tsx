import type { ReactNode } from "react";
import type {
  Category,
  Collection,
  Order,
  Product,
  QueryObject,
  User,
} from "shared/types";
import {
  formatAddress,
  getProductDiscountLabel,
  getFinalPriceString,
  getTotalOrderItems,
  toMajorPriceString,
  userCanModify,
} from "shared/utils";

import { TagBox, Image, type TableColumn } from "@components/ui";
import { buyOrderShipping } from "./order-editor/buyOrderShipping";

import { useUser } from "@app/hooks";
// --- Helpers ---
const renderTagArray = (
  items?: { name: string; color?: string; textColor?: string }[]
) => (
  <div className="flex flex-wrap items-center justify-center gap-sm">
    {items?.map((item, idx) => (
      <TagBox
        key={idx}
        text={item.name}
        color={item.color}
        textColor={item.textColor}
        className={`bg-${item.color ?? "surface"} text-${item.textColor ?? "foreground"} h-6 text-md font-normal whitespace-nowrap`}
      />
    ))}
  </div>
);

const renderCenteredColumn = (children: ReactNode) => (
  <div className="flex flex-col items-center justify-center">{children}</div>
);

const renderFlexStart = (children: ReactNode) => (
  <div className="flex items-start justify-start">{children}</div>
);

const renderImageOrPlaceholder = (src?: string) =>
  src ? (
    <div className="flex items-center justify-center rounded">
      <Image src={src} className="object-contain h-[80px]" />
    </div>
  ) : (
    <div className="flex items-center justify-center bg-light rounded text-xs">
      No Image
    </div>
  );

// --- Type ---
export type TableLayout<T> = {
  query: QueryObject<T>;
  columns: TableColumn<T>[];
  customKebabRender?: (
    user: User | null,
    row: T,
    defaultKebab: ReactNode
  ) => ReactNode;
};

//===========================================================================
// Users
//===========================================================================
export const userTable: TableLayout<User> = {
  query: { select: ["id", "email", "role"] },
  columns: [
    { id: "id", label: "User ID", width: "200px", render: (row) => row.id },
    { id: "email", label: "Email", width: "200px", render: (row) => row.email },
    {
      id: "role",
      label: "Role",
      width: "120px",
      render: (u) => {
        return renderCenteredColumn(
          <span className="font-semibold text-text">{u.role}</span>
        );
      },
    },
  ],
  customKebabRender: (currentUser, user, defaultKebab) => {
    // Hide kebab menu for SITE_OWNER users
    if (!userCanModify(currentUser, user)) {
      return null;
    }
    return defaultKebab;
  },
};

//===========================================================================
// Products
//===========================================================================
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
      "categories",
      "collections",
    ],
  },
  columns: [
    {
      id: "image",
      label: "Image",
      width: "120px",
      render: (p) => renderImageOrPlaceholder(p.images?.[0]?.thumbnail),
    },
    {
      id: "name",
      label: "Name",
      width: "160px",
      sortable: true,
      render: (p) =>
        renderCenteredColumn(
          <span className="font-semibold text-text">{p.name}</span>
        ),
    },
    {
      id: "price",
      label: "Price",
      width: "120px",
      sortable: true,
      render: (p) =>
        renderCenteredColumn(
          <>
            <span className="font-semibold text-center text-base">
              ${toMajorPriceString(p.price)}
            </span>
            {p.discount && (
              <>
                <span className="text-center text-red-400">
                  -{getProductDiscountLabel(p)}
                </span>
                <span className="font-bold text-center text-base">
                  ${getFinalPriceString(p)}
                </span>
              </>
            )}
          </>
        ),
    },
    {
      id: "tags",
      label: "Tags",
      width: "140px",
      render: (p) =>
        renderTagArray(
          p.tags?.map((tag) => ({
            name: tag.name,
            color: tag.color ?? undefined,
            textColor: tag.textColor ?? undefined,
          }))
        ),
    },
    {
      id: "categories",
      label: "Categories",
      width: "140px",
      render: (p) => renderTagArray(p.categories),
    },
    {
      id: "collections",
      label: "Collections",
      width: "140px",
      render: (p) => renderTagArray(p.collections),
    },

    {
      id: "description",
      label: "Description",
      width: "300px",
      render: (p) =>
        renderFlexStart(
          <span className="font-semibold text-text line-clamp-3">
            {p.description}
          </span>
        ),
    },
  ],
};

//===========================================================================
// Orders
//===========================================================================
export const orderTable: TableLayout<Order> = {
  query: {
    include: ["shippingInfo.address", "items"],
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
      width: "200px",
      render: (o) =>
        renderCenteredColumn(
          <>
            <span style={{ whiteSpace: "pre-line" }}>
              {new Date(o.createdAt ?? "").toLocaleString([], {
                year: "numeric",
                month: "2-digit",
                day: "2-digit",
                hour: "2-digit",
                minute: "2-digit",
                hour12: true,
              })}
            </span>
            <div className="border-b border-black w-full" />
            <span className="font-semibold">{o.status}</span>
          </>
        ),
    },
    {
      id: "total",
      label: "Total",
      width: "120px",
      render: (o) =>
        renderCenteredColumn(
          <>
            <span className="font-semibold">
              Items: {getTotalOrderItems(o)}
            </span>
            <span className="font-semibold">${(o.total / 100).toFixed(2)}</span>
          </>
        ),
    },
    {
      id: "shipping",
      label: "Shipping",
      width: "250px",
      render: (o, rowActions) =>
        renderCenteredColumn(
          o.shippingInfo?.tracking ? (
            <div className="flex flex-col items-center justify-center gap-1">
              <span className="font-semibold whitespace-pre-wrap">
                {`${o.shippingInfo.tracking}\n status: ${o.shippingInfo.status}`}
              </span>
              <a
                href={o.shippingInfo.labelUrl ?? "#"}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:underline"
                onClick={async (e) => {
                  e.stopPropagation();
                }}
              >
                Shipping Label
              </a>
            </div>
          ) : (
            <div>
              <a
                href="#"
                className="text-blue-500 hover:underline"
                onClick={async (e) => {
                  e.stopPropagation();
                  rowActions?.setLoading(o.id!, "Buying Shipping Label...");
                  const order = await buyOrderShipping(o.id!);
                  rowActions?.setItem(order!);
                  rowActions?.setLoading(o.id!, null);
                }}
              >
                Buy Shipping Label
              </a>
            </div>
          )
        ),
    },
    {
      id: "address",
      label: "Shipping Address",
      width: "360px",
      render: (o) => (
        <span className="font-semibold text-center whitespace-pre-wrap">
          {formatAddress(o.shippingInfo?.address)}
        </span>
      ),
    },
  ],
};

//===========================================================================
// Categories
//===========================================================================
export const categoryTable: TableLayout<Category> = {
  query: { select: ["id", "name", "slug", "description", "images"] },
  columns: [
    {
      id: "image",
      label: "Image",
      width: "120px",
      render: (c) => renderImageOrPlaceholder(c.images?.preview ?? undefined),
    },
    { id: "name", label: "Name", width: "200px", render: (row) => row.name },
    { id: "slug", label: "Slug", width: "200px", render: (row) => row.slug },
    {
      id: "description",
      label: "Description",
      width: "400px",
      render: (row) => row.description?.slice(0, 50) + "...",
    },
  ],
};

//===========================================================================
// Collections
//===========================================================================
export const collectionTable: TableLayout<Collection> = {
  query: { select: ["name", "slug", "description", "images"] },
  columns: [
    {
      id: "image",
      label: "Image",
      width: "120px",
      render: (c) => renderImageOrPlaceholder(c.images?.preview ?? undefined),
    },
    { id: "name", label: "Name", width: "200px", render: (row) => row.name },
    { id: "slug", label: "Slug", width: "200px", render: (row) => row.slug },
    {
      id: "description",
      label: "Description",
      width: "400px",
      render: (row) => row.description?.slice(0, 50) + "...",
    },
  ],
};
