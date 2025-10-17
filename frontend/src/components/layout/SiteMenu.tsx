import { useEffect, useState, useCallback } from "react";
import { X, ChevronRight } from "lucide-react";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useUser } from "@features/user/useUser";
import { Button, XButton } from "@components/ui";
import { useDataApi } from "@api";

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
            className="relative bg-card w-2/3 max-w-sm h-full shadow-lg flex flex-col"
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

            {/* Menu Items with staggered animation */}
            <motion.div
              className="flex flex-col"
              variants={menuItemsVariants}
              initial="hidden"
              animate="show"
              exit="hidden"
            >
              <MenuItem
                variants={itemVariants}
                onClick={() => handleNavigate("/")}
              >
                Home
              </MenuItem>

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
                        handleNavigate(`/categories/${category.slug}`)
                      }
                    >
                      {category.name}
                    </MenuItem>
                  ))}
                </div>
              )}

              {user && (
                <MenuItem
                  variants={itemVariants}
                  onClick={() => handleLogout()}
                >
                  Logout
                </MenuItem>
              )}

              <MenuItem
                variants={itemVariants}
                onClick={() => handleNavigate("/about")}
              >
                About
              </MenuItem>
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
}

const MenuItem = ({ children, onClick, variants }: MenuItemProps) => {
  return (
    <motion.div variants={variants} className="overflow-hidden">
      <Button
        onClick={onClick}
        className={`
					group w-full text-xl py-lg justify-between px-4 rounded
					hover:bg-primary-50 dark:hover:bg-primary/20 hover:scale-[1.02]
					border-b transition-colors flex items-center 
          transition-all duration-300
          shadow-none
          bg-transparent text-foreground
          hover:shadow-none 
          active:translate-none active:shadow-none
				`}
      >
        <span>{children}</span>
        <ChevronRight
          size={20}
          className="text-black transition-transform duration-200 group-hover:translate-x-1"
        />
      </Button>
    </motion.div>
  );
};
