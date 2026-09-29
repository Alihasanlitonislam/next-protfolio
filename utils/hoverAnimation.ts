import { useEffect } from "react";
import AOS from "aos";

export default function hoverAnimation({
  titleRef,
  descriptionRef,
}: {
  titleRef: React.RefObject<HTMLElement>;
  descriptionRef: React.RefObject<HTMLElement>;
}) {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    const title = titleRef.current;
    const description = descriptionRef.current;

    if (!title && !description) return;

    if (title) {
      title.setAttribute("data-aos", "fade-up");
      title.setAttribute("data-aos-duration", "600");
    }

    if (description) {
      description.setAttribute("data-aos", "fade-up");
      description.setAttribute("data-aos-duration", "600");
      description.setAttribute("data-aos-delay", "120");
    }

    AOS.refresh();
  }, []);
}
