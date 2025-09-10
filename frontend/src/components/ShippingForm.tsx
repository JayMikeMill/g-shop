import { type ShippingAddress } from "../../../shared/shipping-address"

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
		<div style={{ marginBottom: 20 }}>
			<h3>Shipping Information</h3>

			<label>
				First Name:
				<input
					type="text"
					value={shippingAddress.firstName}
					onChange={e => handleChange("firstName", e.target.value)}
				/>
			</label>

			<label>
				Last Name:
				<input
					type="text"
					value={shippingAddress.lastName}
					onChange={e => handleChange("lastName", e.target.value)}
				/>
			</label>

			<label>
				Email:
				<input
					type="email"
					value={shippingAddress.email}
					onChange={e => handleChange("email", e.target.value)}
				/>
			</label>

			<label>
				Phone:
				<input
					type="tel"
					value={shippingAddress.phone}
					onChange={e => handleChange("phone", e.target.value)}
				/>
			</label>

			<label>
				Address Line 1:
				<input
					type="text"
					value={shippingAddress.addressLine1}
					onChange={e => handleChange("addressLine1", e.target.value)}
				/>
			</label>

			<label>
				Address Line 2:
				<input
					type="text"
					value={shippingAddress.addressLine2 ?? ""}
					onChange={e => handleChange("addressLine2", e.target.value)}
				/>
			</label>

			<label>
				City:
				<input
					type="text"
					value={shippingAddress.city}
					onChange={e => handleChange("city", e.target.value)}
				/>
			</label>

			<label>
				State / Province:
				<input
					type="text"
					value={shippingAddress.state}
					onChange={e => handleChange("state", e.target.value)}
				/>
			</label>

			<label>
				Postal Code:
				<input
					type="text"
					value={shippingAddress.postalCode}
					onChange={e => handleChange("postalCode", e.target.value)}
				/>
			</label>

			<label>
				Country:
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
	)
}
