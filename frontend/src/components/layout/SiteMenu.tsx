import { useEffect, useState, useCallback } from "react";
import { X, ChevronRight } from "lucide-react";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import { Button, XButton } from "@components/ui";
import { useDataApi, useUser, useNavigate } from "@app/hooks";

interface SiteMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SiteMenu({ isOpen, onClose }: SiteMenuProps) {
  const { user, logout } = useUser();
  const { categories } = useDataApi();

  const { data: categoryData } = categories.getMany({
    select: ["id", "name", "slug"],
  });

  const categoriesList = categoryData?.data ?? [];
  const navigate = useNavigate();
  const [visible, setVisible] = useState(isOpen);

  useEffect(() => {
    if (isOpen) setVisible(true);
  }, [isOpen]);

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === "Escape") handleClose();
  }, []);

  useEffect(() => {
    if (visible) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
      return () => {
        document.body.style.overflow = prev;
        window.removeEventListener("keydown", handleKeyDown);
      };
    }
  }, [visible, handleKeyDown]);

  const handleClose = () => setVisible(false);
  const handleExitComplete = () => {
    if (!visible) onClose();
  };
  const handleNavigate = (path: string) => {
    navigate(path);
    handleClose();
  };

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/login");
      handleClose();
    } catch (error) {
      console.error("Failed to logout:", error);
      handleClose();
    }
  };

  // Variants for staggered menu items
  const menuItemsVariants: Variants = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: 0.05,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, x: -300 },
    show: { opacity: 1, x: 0, transition: { duration: 0.15 } },
    exit: { opacity: 0, x: -300, transition: { duration: 0.15 } },
  };

  return (
    <AnimatePresence onExitComplete={handleExitComplete}>
      {visible && (
        <div
          className="fixed inset-0 z-50 flex"
          role="dialog"
          aria-modal="true"
        >
          {/* Overlay */}
          <motion.div
            className="absolute inset-0 bg-black"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.3 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
            onClick={handleClose}
          />

          {/* Slide-out menu */}
          <motion.div
            className="relative bg-surface w-2/3 max-w-sm h-full shadow-lg flex flex-col"
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
          >
            {/* Close button */}
            <XButton
              className="hover:bg-transparent "
              onClick={handleClose}
              aria-label="Close menu"
              type="button"
            >
              <X size={24} />
            </XButton>

            {/* Menu Items split: main and bottom */}
            <motion.div
              className="flex flex-col h-full justify-between"
              variants={menuItemsVariants}
              initial="hidden"
              animate="show"
              exit="hidden"
            >
              {/* Top section: admin, categories (scrollable) */}
              <div className="flex-1 overflow-y-auto pr-2">
                {user?.role === "ADMIN" && (
                  <MenuItem
                    variants={itemVariants}
                    onClick={() => handleNavigate("/admin")}
                  >
                    Admin Dashboard
                  </MenuItem>
                )}

                {categoriesList.length > 0 && (
                  <div className="flex flex-col">
                    {categoriesList.map((category) => (
                      <MenuItem
                        key={category.id}
                        variants={itemVariants}
                        onClick={() =>
                          handleNavigate(`/category/${category.slug}`)
                        }
                      >
                        {category.name}
                      </MenuItem>
                    ))}
                  </div>
                )}
              </div>

              {/* Bottom section: About and Logout/Login (pinned) */}
              <div className="flex flex-col pb-4">
                {user ? (
                  <MenuItem
                    variants={itemVariants}
                    onClick={() => handleLogout()}
                    className="text-destructive"
                  >
                    Logout
                  </MenuItem>
                ) : (
                  <MenuItem
                    variants={itemVariants}
                    onClick={() => handleNavigate("/login")}
                    className="text-primary"
                  >
                    Login
                  </MenuItem>
                )}
                <MenuItem
                  variants={itemVariants}
                  onClick={() => handleNavigate("/about")}
                >
                  About
                </MenuItem>
              </div>
            </motion.div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

// MenuItem component below SiteMenu
interface MenuItemProps {
  children: React.ReactNode;
  onClick: () => void;
  variants?: Variants;
  className?: string;
}

const MenuItem = ({
  children,
  onClick,
  variants,
  className,
}: MenuItemProps) => {
  return (
    <motion.div variants={variants} className={`overflow-hidden =`}>
      <Button
        onClick={onClick}
        className={`
					group w-full text-xl py-lg justify-between px-4 rounded
					hover:bg-primary-50 hover:scale-[1.02]
					border-b transition-colors flex items-center 
          transition-all duration-300
          shadow-none rounded-none
          bg-transparent text-foreground
          hover:shadow-none 
          active:translate-none active:shadow-none
          active:text-foregroundAlt ${className}
				`}
      >
        <span>{children}</span>
        <ChevronRight
          size={20}
          className="text-foreground transition-transform duration-200 group-hover:translate-x-1"
        />
      </Button>
    </motion.div>
  );
};
