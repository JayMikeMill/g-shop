import { SITE } from "../config"
import { getCartTotals, useCart } from "../context/CartContext"
import { useNavigate } from 'react-router-dom';


export default function Header() {
  const navigate = useNavigate();

  return (
    <header style={{
      width: "100%",
      boxSizing: "border-box",
     // position: "fixed",
      left: 0,
      top: 0,
      zIndex: 1000,
      backgroundColor: SITE.primaryColor,
      color: SITE.textColor,
      padding: "10px 20px",
      boxShadow: "0 2px 5px rgba(0,0,0,0.1)"
    }}>
      <div style={{
        position: "relative",
        width: "100%",
        maxWidth: "1200px",
        margin: "0 auto",
        height: "48px", // adjust as needed for your header height
        display: "flex",
        alignItems: "center"
      }}>
        {/* Logo on the left */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            cursor: "pointer",
            height: "100%"
          }}
          onClick={() => navigate('/')}
        >
          <img src={SITE.logo} alt="Logo" width={40} style={{ marginRight: "10px" }} />
        </div>

        {/* Site name centered absolutely */}
        <span style={{
          position: "absolute",
          left: "50%",
          top: "50%",
          transform: "translate(-50%, -50%)",
          fontSize: "1.5rem",
          fontWeight: "bold",
          textAlign: "center",
          pointerEvents: "none", // so clicks pass through to buttons below
          width: "100%",
          color: SITE.textColor,
          whiteSpace: "nowrap"
        }}>
          {SITE.name}
        </span>

        {/* Menu on the right */}
        <nav style={{
          display: "flex",
          alignItems: "center",
          gap: "15px",
          marginLeft: "auto"
        }}>
          <button
            style={{
              background: "none",
              border: "none",
              color: SITE.textColor,
              cursor: "pointer",
              fontSize: "1rem"
            }}
            onClick={() => navigate('/')}
          >
            Home
          </button>
          <button
            style={{
              background: "none",
              border: "none",
              color: SITE.textColor,
              cursor: "pointer",
              fontSize: "1rem",
              position: "relative"
            }}
            onClick={() => navigate('/cart')}
          >
            Cart ({getCartTotals(useCart().cart).totalItems})
          </button>
        </nav>
      </div>
    </header>
  )
}
