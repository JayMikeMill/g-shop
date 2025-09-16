import { type Address } from "@models/shipping-info"

interface ShippingFormProps {
  shippingAddress: Address
  setShippingAddress: (address: Address) => void
}

const countries = [
  { code: "US", name: "United States" },
  { code: "CA", name: "Canada" },
  { code: "MX", name: "Mexico" }
]

export default function ShippingForm({ shippingAddress, setShippingAddress }: ShippingFormProps) {
  const handleChange = (field: keyof Address, value: string) => {
    setShippingAddress({ ...shippingAddress, [field]: value })
  }

  return (
    <div className="max-w-[700px] mx-auto my-8 p-8 bg-white rounded-lg shadow">
      <h3 className="text-2xl font-semibold mb-6 text-center">Shipping Information</h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <label className="flex flex-col text-sm font-semibold text-gray-700">
          <span className="mb-1">First Name</span>
          <input
            type="text"
            value={shippingAddress.firstName}
            onChange={e => handleChange("firstName", e.target.value)}
            className="px-3 py-2 border rounded bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </label>

        <label className="flex flex-col text-sm font-semibold text-gray-700">
          <span className="mb-1">Last Name</span>
          <input
            type="text"
            value={shippingAddress.lastName}
            onChange={e => handleChange("lastName", e.target.value)}
            className="px-3 py-2 border rounded bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </label>

        <label className="col-span-1 sm:col-span-2 flex flex-col text-sm font-semibold text-gray-700">
          <span className="mb-1">Email</span>
          <input
            type="email"
            value={shippingAddress.email}
            onChange={e => handleChange("email", e.target.value)}
            className="px-3 py-2 border rounded bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </label>

        <label className="col-span-1 sm:col-span-2 flex flex-col text-sm font-semibold text-gray-700">
          <span className="mb-1">Phone</span>
          <input
            type="tel"
            value={shippingAddress.phone}
            onChange={e => handleChange("phone", e.target.value)}
            className="px-3 py-2 border rounded bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </label>

        <label className="col-span-1 sm:col-span-2 flex flex-col text-sm font-semibold text-gray-700">
          <span className="mb-1">Address Line 1</span>
          <input
            type="text"
            value={shippingAddress.addressLine1}
            onChange={e => handleChange("addressLine1", e.target.value)}
            className="px-3 py-2 border rounded bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </label>

        <label className="col-span-1 sm:col-span-2 flex flex-col text-sm font-semibold text-gray-700">
          <span className="mb-1">Address Line 2</span>
          <input
            type="text"
            value={shippingAddress.addressLine2 ?? ""}
            onChange={e => handleChange("addressLine2", e.target.value)}
            className="px-3 py-2 border rounded bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </label>

        <label className="flex flex-col text-sm font-semibold text-gray-700">
          <span className="mb-1">City</span>
          <input
            type="text"
            value={shippingAddress.city}
            onChange={e => handleChange("city", e.target.value)}
            className="px-3 py-2 border rounded bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </label>

        <label className="flex flex-col text-sm font-semibold text-gray-700">
          <span className="mb-1">State / Province</span>
          <input
            type="text"
            value={shippingAddress.state}
            onChange={e => handleChange("state", e.target.value)}
            className="px-3 py-2 border rounded bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </label>

        <label className="flex flex-col text-sm font-semibold text-gray-700">
          <span className="mb-1">Postal Code</span>
          <input
            type="text"
            value={shippingAddress.postalCode}
            onChange={e => handleChange("postalCode", e.target.value)}
            className="px-3 py-2 border rounded bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </label>

        <label className="flex flex-col text-sm font-semibold text-gray-700">
          <span className="mb-1">Country</span>
          <select
            value={shippingAddress.country}
            onChange={e => handleChange("country", e.target.value)}
            className="px-3 py-2 border rounded bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary"
          >
            {countries.map(c => (
              <option key={c.code} value={c.code}>{c.name}</option>
            ))}
          </select>
        </label>
      </div>
    </div>
  )
}
