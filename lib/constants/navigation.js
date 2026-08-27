export const primaryNavigation = ["Men", "Women", "New Releases", "Running", "Lifestyle", "Sneakers", "Sale"].map((label) => ({ label, href: `/shop/${label.toLowerCase().replaceAll(" ", "-")}` }));
