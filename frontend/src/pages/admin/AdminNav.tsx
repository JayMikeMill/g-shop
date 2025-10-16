import { useLocation, useNavigate } from "react-router-dom";

// ------------------ NavButton ------------------
interface NavButtonProps {
  label: string;
  className?: string;
  isActive?: boolean;
  onClick?: () => void;
}

const NavButton: React.FC<NavButtonProps> = ({
  label,
  className,
  isActive,
  onClick,
}) => {
  return (
    <button
      onClick={onClick}
      className={`flex items-center justify-center border text-center text-xl transition-colors duration-200
				${isActive ? "bg-primary text-accent-foreground font-bold" : ""}
				${className || ""}`}
    >
      {label}
    </button>
  );
};

// ------------------ Data ------------------
interface NavItem {
  label: string;
  to: string;
  subItems?: { label: string; to: string }[];
}

const navItems: NavItem[] = [
  {
    label: "Catalog",
    to: "/admin/catalog/products",
    subItems: [
      { label: "Products", to: "/admin/catalog/products" },
      { label: "Categories", to: "/admin/catalog/categories" },
      { label: "Collections", to: "/admin/catalog/collections" },
    ],
  },
  { label: "Orders", to: "/admin/orders" },
  { label: "Users", to: "/admin/users" },
  {
    label: "Settings",
    to: "/admin/settings/site",
    subItems: [
      { label: "Site Settings", to: "/admin/settings/site" },
      { label: "Admin Settings", to: "/admin/settings/admin" },
    ],
  },
];

// ------------------ DesktopNav ------------------
export const DesktopNav: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <div className="flex flex-col">
      {navItems.map((item) => {
        const topPath = item.subItems?.[0]?.to ?? item.to;
        const isActive = location.pathname.startsWith(topPath);

        return (
          <div key={item.to} className="flex flex-col">
            {item.subItems ? (
              <div className="flex flex-col">
                {item.subItems.map((sub) => (
                  <NavButton
                    key={sub.to}
                    label={sub.label}
                    className="h-10"
                    isActive={location.pathname === sub.to}
                    onClick={() => navigate(sub.to)}
                  />
                ))}
              </div>
            ) : (
              <NavButton
                label={item.label}
                isActive={isActive}
                className="h-10"
                onClick={() => navigate(topPath)}
              />
            )}
          </div>
        );
      })}
    </div>
  );
};

// ------------------ MobileNav ------------------
export const MobileNav: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Determine which section contains the current route
  const currentSection = navItems.find((item) => {
    // Check top-level path
    if (location.pathname === item.to) return true;

    // Check sub-items
    if (item.subItems?.some((sub) => sub.to === location.pathname)) return true;

    return false;
  });

  return (
    <div className="flex flex-col w-full">
      {/* Top-level row */}
      <div className="flex flex-row w-full overflow-x-auto border-b border-border h-10 bg-background">
        {navItems.map((item) => {
          const isActive = currentSection?.label === item.label;
          const topPath = item.subItems?.[0]?.to ?? item.to;

          return (
            <NavButton
              key={item.to}
              label={item.label}
              isActive={isActive}
              className="flex-1 text-center"
              onClick={() => navigate(topPath)}
            />
          );
        })}
      </div>

      {/* Sub-items row */}
      {currentSection?.subItems?.length && (
        <div className="flex flex-row w-full overflow-x-auto border-b border-border h-8 bg-background">
          {currentSection.subItems.map((sub) => (
            <NavButton
              key={sub.to}
              label={sub.label}
              isActive={location.pathname === sub.to}
              className="flex-1 text-center text-sm opacity-80 hover:opacity-100"
              onClick={() => navigate(sub.to)}
            />
          ))}
        </div>
      )}
    </div>
  );
};
