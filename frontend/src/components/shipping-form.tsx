import { type ShippingAddress } from "@shared/shipping-address"
import "@css/shipping-form.css"

interface ShippingFormProps {
  shippingAddress: ShippingAddress
  setShippingAddress: (address: ShippingAddress) => void
}

const countries = [
  { code: "US", name: "United States" },
  { code: "CA", name: "Canada" },
  { code: "MX", name: "Mexico" }
]

export default function ShippingForm({ shippingAddress, setShippingAddress }: ShippingFormProps) {
  const handleChange = (field: keyof ShippingAddress, value: string) => {
    setShippingAddress({ ...shippingAddress, [field]: value })
  }

  return (
    <div className="shipping-form">
      <h3>Shipping Information</h3>

      <div className="form-grid">
        <label>
          <span>First Name</span>
          <input
            type="text"
            value={shippingAddress.firstName}
            onChange={e => handleChange("firstName", e.target.value)}
          />
        </label>

        <label>
          <span>Last Name</span>
          <input
            type="text"
            value={shippingAddress.lastName}
            onChange={e => handleChange("lastName", e.target.value)}
          />
        </label>

        <label className="full-width">
          <span>Email</span>
          <input
            type="email"
            value={shippingAddress.email}
            onChange={e => handleChange("email", e.target.value)}
          />
        </label>

        <label className="full-width">
          <span>Phone</span>
          <input
            type="tel"
            value={shippingAddress.phone}
            onChange={e => handleChange("phone", e.target.value)}
          />
        </label>

        <label className="full-width">
          <span>Address Line 1</span>
          <input
            type="text"
            value={shippingAddress.addressLine1}
            onChange={e => handleChange("addressLine1", e.target.value)}
          />
        </label>

        <label className="full-width">
          <span>Address Line 2</span>
          <input
            type="text"
            value={shippingAddress.addressLine2 ?? ""}
            onChange={e => handleChange("addressLine2", e.target.value)}
          />
        </label>

        <label>
          <span>City</span>
          <input
            type="text"
            value={shippingAddress.city}
            onChange={e => handleChange("city", e.target.value)}
          />
        </label>

        <label>
          <span>State / Province</span>
          <input
            type="text"
            value={shippingAddress.state}
            onChange={e => handleChange("state", e.target.value)}
          />
        </label>

        <label>
          <span>Postal Code</span>
          <input
            type="text"
            value={shippingAddress.postalCode}
            onChange={e => handleChange("postalCode", e.target.value)}
          />
        </label>

        <label>
          <span>Country</span>
          <select
            value={shippingAddress.country}
            onChange={e => handleChange("country", e.target.value)}
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
