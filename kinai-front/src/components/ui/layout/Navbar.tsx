"use client";
import { Box, Typography, Link } from "@mui/material";
import NextLink from "next/link";
import { usePathname } from "next/navigation";
import { LogoIcon } from "../../icons/LogoIcon";
import { useScrollSection } from "@/hooks/useScrollSection";

interface NavItem {
  id: string;
  label: string;
  href: string;
  fontSize?: string;
}

const NAV_ITEMS: NavItem[] = [
  { id: "inicio", label: "Inicio", href: "/" },
  { id: "analisis", label: "Análisis", href: "/analysis" },
  { id: "entrenamiento", label: "Entrenamiento", href: "/training", fontSize: "1.8rem" },
  { id: "modelos", label: "Modelos", href: "/models" },
];

const NAVBAR_STYLES = {
  container: {
    width: "100%",
    position: "fixed",
    top: 0,
    left: 0,
    zIndex: 10,
    transition: "all 0.3s ease",
  },
  nav: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "2rem 4rem",
    maxWidth: "1220px",
    mx: "auto",
  },
  navLinks: {
    display: "flex",
    alignItems: "center",
    gap: 2,
  },
  logo: {
    textDecoration: "none",
    display: "flex",
    alignItems: "center",
    gap: 1,
  },
  logoIcon: {
    fontSize: "2.8em",
    transition: "color 0.3s ease",
  },
  logoText: {
    fontSize: "2.8rem",
    fontWeight: 600,
    transition: "color 0.3s ease",
  },
  navLink: {
    textDecoration: "none",
    marginRight: 2,
    fontWeight: 600,
    transition: "color 0.3s ease",
    "&:hover": {
      color: "secondary.main",
    },
  },
} as const;

const getActiveItem = (pathname: string): string => {
  const currentItem = NAV_ITEMS.find(item => item.href === pathname);
  return currentItem?.id || "inicio";
};

const NavLink = ({ 
  item, 
  isActive, 
  isInContentSection,
  pathname
}: { 
  item: NavItem; 
  isActive: boolean; 
  isInContentSection: boolean;
  pathname: string;
}) => {
  const isHomePage = pathname === "/";
  const shouldUseWhite = isHomePage && !isInContentSection;
  
  return (
    <Link
      href={item.href}
      component={NextLink}
      sx={{
        ...NAVBAR_STYLES.navLink,
        fontSize: item.fontSize || "1.6rem",
        color: isActive 
          ? "secondary.main" 
          : shouldUseWhite 
            ? "common.white" 
            : "primary.dark",
      }}
    >
      {item.label}
    </Link>
  );
};

const Logo = ({ isInContentSection, pathname }: { isInContentSection: boolean; pathname: string }) => {
  const isHomePage = pathname === "/";
  const shouldUseWhite = isHomePage && !isInContentSection;
  
  return (
    <Link
      href="/"
      component={NextLink}
      sx={NAVBAR_STYLES.logo}
    >
      <LogoIcon sx={{ 
        ...NAVBAR_STYLES.logoIcon,
        color: shouldUseWhite ? "common.white" : "secondary.main",
      }} />
      <Typography
        component="p"
        sx={{ 
          ...NAVBAR_STYLES.logoText,
          color: shouldUseWhite ? "common.white" : "primary.dark",
        }}
      >
        Cosmos explorer
      </Typography>
    </Link>
  );
};

export const Navbar = () => {
  const isInContentSection = useScrollSection();
  const pathname = usePathname();
  const activeItem = getActiveItem(pathname);

  const isHomePage = pathname === "/";
  const shouldUseTransparent = isHomePage && !isInContentSection;

  return (
    <Box 
      sx={{ 
        ...NAVBAR_STYLES.container,
        backgroundColor: shouldUseTransparent ? "transparent" : "common.white",
        boxShadow: shouldUseTransparent ? "none" : "0 2px 20px rgba(0, 0, 0, 0.1)",
      }}
    >
      <Box component="nav" sx={NAVBAR_STYLES.nav}>
        <Logo isInContentSection={isInContentSection} pathname={pathname} />
        
        <Box sx={NAVBAR_STYLES.navLinks}>
          {NAV_ITEMS.map((item) => (
            <NavLink
              key={item.id}
              item={item}
              isActive={activeItem === item.id}
              isInContentSection={isInContentSection}
              pathname={pathname}
            />
          ))}
        </Box>
      </Box>
    </Box>
  );
};
