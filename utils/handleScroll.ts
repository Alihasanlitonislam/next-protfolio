export const handleScroll = (
  e: React.MouseEvent<HTMLAnchorElement>,
  link: string
) => {
  e.preventDefault();

  if (link === "#") {
    window.scrollTo({ top: 0, behavior: "smooth" });
    return;
  }

  const target = document.querySelector(link);
  if (!target) return;

  const headerOffset = 50;
  const elementPosition = target.getBoundingClientRect().top;
  const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

  window.scrollTo({
    top: offsetPosition,
    behavior: "smooth",
  });
};
