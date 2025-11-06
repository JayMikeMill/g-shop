import type { ReactNode } from "react";
import type {
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
  userPermissions,
} from "shared/utils";

import { TagBox, Image, type TableColumn } from "@components/ui";
import { buyOrderShipping } from "./order-editor/buyOrderShipping";

// --- Helpers ---
const renderTagArray = (
  items?: { name: string; color?: string; textColor?: string }[]
) => (
  <div
    className="flex flex-wrap items-center justify-center gap-xs"
    style={{ maxHeight: "100%" }}
  >
    {items?.map((item, idx) => (
      <TagBox
        key={idx}
        text={item.name}
        color={item.color}
        textColor={item.textColor}
        className={`bg-${item.color ?? "surface"} text-${item.textColor ?? "foreground"} h-5 text-md font-normal whitespace-nowrap`}
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
  minWidth?: string;
  rowHeight?: string;
  query: QueryObject<T>;
  columns: TableColumn<T>[];
  customKebabRender?: (
    user: User | null,
    row: T,
    defaultKebab: (edit: boolean, del: boolean) => ReactNode
  ) => ReactNode;
};

//===========================================================================
// Users
//===========================================================================
export const userTable: TableLayout<User> = {
  query: { select: ["id", "email", "role"] },
  rowHeight: "40px",
  columns: [
    {
      id: "id",
      label: "User ID",
      width: "30%",
      render: (u) => {
        return renderCenteredColumn(
          <span className="font-semibold text-text">{u.id}</span>
        );
      },
    },
    {
      id: "email",
      label: "Email",
      width: "50%",
      render: (row) => {
        return renderCenteredColumn(
          <span className="font-semibold text-text">{row.email}</span>
        );
      },
    },
    {
      id: "role",
      label: "Role",
      width: "20%",
      render: (u) => {
        return renderCenteredColumn(
          <span className="font-semibold text-text">{u.role}</span>
        );
      },
    },
  ],
  customKebabRender: (currentUser, user, defaultKebab) => {
    // Hide kebab menu for SITE_OWNER users
    const permision = userPermissions(currentUser, user);
    console.log("Permissions for user", user.id, ":", permision);
    return defaultKebab(permision.edit, permision.delete);
  },
};

//===========================================================================
// Products
//===========================================================================
export const productTable: TableLayout<Product> = {
  minWidth: "1400px",
  rowHeight: "120px",
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
      width: "10%",
      render: (p) => renderImageOrPlaceholder(p.images?.[0]?.thumbnail),
    },
    {
      id: "name",
      label: "Name",
      width: "15%",
      sortable: true,
      render: (p) =>
        renderCenteredColumn(
          <span className="font-semibold text-text px-sm">{p.name}</span>
        ),
    },
    {
      id: "price",
      label: "Price",
      width: "10%",
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
      width: "15%",
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
      width: "15%",
      render: (p) => renderTagArray(p.categories),
    },
    {
      id: "collections",
      label: "Collections",
      width: "15%",
      render: (p) => renderTagArray(p.collections),
    },

    {
      id: "description",
      label: "Description",
      width: "25%",
      render: (p) =>
        renderFlexStart(
          <span className="px-sm font-semibold text-text line-clamp-3">
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
  rowHeight: "80px",
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
      width: "25%",
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
      width: "15%",
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
      width: "30%",
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
      width: "40%",
      render: (o) => (
        <span className="font-semibold text-center whitespace-pre-wrap line-clamp-3">
          {formatAddress(o.shippingInfo?.address)}
        </span>
      ),
    },
  ],
};

//===========================================================================
// Collections
//===========================================================================
export const collectionTable: TableLayout<Collection> = {
  query: { select: ["name", "slug", "description", "images"] },
  rowHeight: "100px",
  columns: [
    {
      id: "image",
      label: "Image",
      width: "15%",
      render: (c) => renderImageOrPlaceholder(c.images?.preview ?? undefined),
    },
    { id: "name", label: "Name", width: "15%", render: (row) => row.name },
    { id: "slug", label: "Slug", width: "15%", render: (row) => row.slug },
    {
      id: "description",
      label: "Description",
      width: "55%",
      render: (row) => row.description?.slice(0, 50) + "...",
    },
  ],
};
