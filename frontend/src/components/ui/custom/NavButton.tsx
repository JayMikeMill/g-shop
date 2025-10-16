import { NavLink } from "react-router-dom";

interface NavButtonProps {
  to: string;
  label: string;
  className?: string;
}

const NavButton: React.FC<NavButtonProps> = ({ to, label, className }) => {
  const navClassName = (isActive: boolean) =>
    `flex border text-center items-center justify-center text-xl
		hover:bg-primary-400 hover:text-accent-foreground transition-colors duration-200
		${isActive ? "font-bold text-2xl" : ""}`;

  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        navClassName(isActive) + ` ${className || ""}`
      }
    >
      {label}
    </NavLink>
  );
};
export { NavButton };
