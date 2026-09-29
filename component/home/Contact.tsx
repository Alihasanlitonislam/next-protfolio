"use client";

import { useRef, useState } from "react";
import {
  Mail,
  Linkedin,
  Dribbble,
  Instagram,
  ArrowRight,
  Loader,
  Facebook,
  Github,
  LucideIcon,
} from "lucide-react";
import InputField from "../share/Input";
import { countryList } from "@/content/country";
import { useErrors } from "@/hooks/useErrors";
import { ContactSchema } from "@/schema/ContactSchema";
import ReCAPTCHA from "react-google-recaptcha";
import { toast } from "sonner";
import useHoverAnimation from "@/hooks/useHoverAnimation";
import HoverItem from "../share/HoverImage";
interface ContactItem {
  icon: LucideIcon;
  title: string;
  value: string;
  link?: string;
}

function ContactComponent() {
  const recaptchaRef = useRef<ReCAPTCHA | null>(null);

  const titleRef = useRef<HTMLDivElement | null>(null);
  const descriptionRef = useRef<HTMLParagraphElement | null>(null);

  useHoverAnimation({ titleRef, descriptionRef });

  const [loading, setLoading] = useState(false);

  const errors = useErrors();

  const contacts: ContactItem[] = [
    {
      icon: Mail,
      title: "Email",
      value: "developeralihasan777@gmail.com",
      link: "mailto:developeralihasan777@gmail.com",
    },
    {
      icon: Linkedin,
      title: "LinkedIn",
      value: "1K+ Followers",
      link: "https://www.linkedin.com/in/ali-hasan-409845256",
    },
    {
      icon: Facebook,
      title: "Facebook",
      value: "1.5K+ Followers",
      link: "https://facebook.com/alihasan404439",
    },
    {
      icon: Github,
      title: "Github",
      value: "1.5K+ Followers",
      link: "https://github.com/dev-ali-hasan",
    },
  ];

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
    country: "",
    token: "",
  });
  const filterCountry = countryList.map((country) => ({
    label: country.name,
    value: country.code,
  }));

  function handleCaptcha(token: string | null) {
    setForm({ ...form, token: token || "" });
    errors.clear("token");
  }

  const resetFormData = () => {
    setForm({
      name: "",
      email: "",
      phone: "",
      message: "",
      country: "",
      token: "",
    });
    errors.reset();
    recaptchaRef.current?.reset();
  };

  const submitContact = async (e: React.FormEvent) => {
    e.preventDefault();

    const validation = ContactSchema().safeParse(form);
    if (!validation.success) {
      errors.record(validation.error.issues);
      setForm({ ...form, token: "" });
      recaptchaRef.current?.reset();

      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          country:
            countryList.find((country) => country.code === form.country)
              ?.name ?? "",
        }),
      });

      const data = await res.json();

      if (data.success) {
        toast.success(data.message || "Message sent successfully");
        resetFormData();
        return;
      }

      if (data.errors) {
        recaptchaRef.current?.reset();
      }
    } catch {
      recaptchaRef.current?.reset();
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      id="contact"
      className=" w-full min-h-screen py-8 md:py-12 lg:py-20 relative bg-[url('/heroSection.svg')] bg-cover bg-center bg-no-repeat bg-(--bg-secondary) text-(--text-primary)"
    >
      <div className="container space-y-10">
        <div className=" flex items-center flex-col">
          <div className="flex items-center justify-center gap-2 mb-3 w-fit ">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width={21}
              height={22}
              viewBox="0 0 21 22"
              fill="none"
              className="about_svg"
            >
              <path
                d="M12.0295 11.2794C11.9883 11.4226 11.9472 11.5539 11.9119 11.6852C11.7413 12.3596 11.5767 13.034 11.3532 13.6964C10.9475 14.896 10.4771 16.0716 9.99487 17.2414C9.45975 18.5364 8.9364 19.8314 8.40716 21.1265C8.32484 21.3354 8.22487 21.5323 8.1249 21.7352C8.08962 21.8128 8.0367 21.8844 7.97789 21.9441C7.87793 22.0455 7.74856 22.0038 7.7368 21.8605C7.72504 21.7412 7.72504 21.6218 7.74856 21.5025C7.83676 20.9952 7.92497 20.4879 8.03082 19.9866C8.31308 18.6199 8.60121 17.2533 8.82467 15.8747C8.95404 15.0631 9.06576 14.2514 9.17749 13.4398C9.27746 12.7236 9.35978 12.0134 9.44799 11.2973C9.45975 11.1899 9.46563 11.0825 9.47739 10.9452C9.41859 10.981 9.38919 10.9989 9.35978 11.0228C9.24218 11.1302 9.11869 11.2376 9.01284 11.357C7.87205 12.5625 4.60534 16.2374 3.24697 17.1803C3.16465 17.2341 3.08232 17.2878 2.99412 17.3355C2.94707 17.3594 2.89415 17.3713 2.84711 17.3773C2.75302 17.3833 2.68246 17.3176 2.68246 17.2221C2.68246 17.1505 2.69422 17.067 2.7295 17.0013C2.81183 16.8282 2.89415 16.6552 3 16.5C3.35282 15.9987 5.68454 12.8549 6.04913 12.3656C6.596 11.6315 7.15464 10.9034 7.7074 10.1694C7.81324 10.0321 7.90733 9.8829 7.99554 9.72773C8.1249 9.50692 8.10138 9.39949 7.88381 9.26223C7.71916 9.16078 7.54863 9.07126 7.37221 8.99368C6.73713 8.71915 6.07853 8.5043 5.41993 8.30139C3.74402 7.77622 2.08575 7.19733 0.462765 6.52295C0.362799 6.48118 0.25695 6.44537 0.156982 6.40359C0.11582 6.38569 0.0805378 6.36778 0.0452557 6.33794C-0.031189 6.26633 -0.00766754 6.141 0.0922985 6.1052C0.127581 6.09326 0.168743 6.08729 0.204025 6.08729C0.598011 6.08132 0.991997 6.06939 1.38598 6.08132C2.38565 6.1231 3.38531 6.23052 4.3791 6.35585C5.83743 6.53489 7.28401 6.77957 8.71882 7.08394C8.91287 7.12571 9.10693 7.15555 9.30098 7.19136C9.34214 7.19733 9.3833 7.2033 9.43035 7.19733C9.58324 7.19733 9.64792 7.16152 9.68909 7.00635C9.74201 6.79748 9.78905 6.5886 9.82433 6.37972C9.9831 5.47856 10.1125 4.57144 10.2124 3.65834C10.2771 3.06752 10.3242 2.47072 10.3947 1.8799C10.4477 1.4144 10.5241 0.95487 10.5888 0.489372C10.6064 0.387917 10.6417 0.286463 10.677 0.190975C10.7123 0.0895195 10.777 0 10.9004 0C11.0122 0.00596809 11.0769 0.0895195 11.1063 0.190975C11.1592 0.35211 11.2121 0.519211 11.2356 0.686314C11.2944 1.08616 11.3532 1.49199 11.3768 1.89184C11.4356 2.87058 11.4826 3.84335 11.512 4.82209C11.5296 5.41292 11.512 6.00374 11.5061 6.59456C11.5061 6.64828 11.5061 6.70796 11.5061 6.78554C11.5943 6.7736 11.6708 6.7736 11.7472 6.76167C12.594 6.61844 13.4231 6.4215 14.2581 6.21859C15.6812 5.88438 17.1042 5.52034 18.5449 5.22791C19.1565 5.10258 19.7739 4.99516 20.3914 4.88177C20.4972 4.86386 20.609 4.8579 20.7148 4.84596C20.7442 4.84596 20.7736 4.83999 20.7971 4.84596C20.9206 4.85193 20.9853 4.88774 20.9971 4.96532C21.0147 5.06678 20.95 5.11452 20.8795 5.15629C20.7207 5.24581 20.5678 5.32936 20.409 5.41291C18.9095 6.21859 17.3747 6.95264 15.8517 7.7046C15.1402 8.05671 14.4404 8.44462 13.7407 8.8206C13.6525 8.86835 13.576 8.92206 13.4702 8.98771C13.5231 9.05932 13.5643 9.13094 13.6172 9.18465C13.9112 9.50692 14.1935 9.84112 14.511 10.1395C15.1461 10.7363 15.7929 11.3152 16.4456 11.8941C17.2395 12.5983 18.0216 13.3145 18.739 14.0963C18.8978 14.2693 19.0507 14.4543 19.1977 14.6393C19.2388 14.6871 19.2741 14.7468 19.3094 14.8064C19.3564 14.89 19.3506 14.9676 19.2976 15.0213C19.2506 15.075 19.1741 15.081 19.0918 15.0392C19.0624 15.0273 19.033 15.0034 19.0036 14.9914C18.6096 14.7647 18.2274 14.5259 17.8275 14.3111C16.6397 13.6785 15.446 13.0459 14.2817 12.3596C13.723 12.0314 13.1409 11.7568 12.5293 11.536C12.4352 11.5002 12.3529 11.4525 12.2647 11.4047C12.1882 11.3689 12.1177 11.3271 12.0295 11.2794Z"
                className="fill-(--text-tertiary)"
              />
            </svg>

            <span
              ref={titleRef}
              className="text-xl sm:text-3xl md:text-5xl font-bold block text-center"
            >
              Contact With Me
            </span>
          </div>

          <p
            ref={descriptionRef}
            className="text-left text-[12px] sm:text-[16px] md:text-xl text-(--text-muted) max-w-5xl mx-auto"
          >
            Got a project or collaboration in mind? to you soon!{" "}
            <span className="text-(--text-tertiary) font-bold">Reach out,</span>{" "}
            and I’ll get back
          </p>
        </div>
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-2 xl:gap-4">
          <div
            data-aos="fade-right"
            className="bg-(--bg-primary)/80 rounded-2xl p-6 space-y-6 shadow-xl mb-4 h-full"
          >
            <div className="flex gap-4 items-center flex-wrap">
              <div className="w-full flex items-center justify-center">
                <div className="w-[150px] h-[150px]">
                  <HoverItem
                    image="/short_image.jpeg"
                    displacement="/short_image.jpeg"
                    css="rounded-xl"
                    intensity={0.4}
                  />
                </div>
              </div>
              <div>
                <div className="flex items-center justify-center gap-2 px-2 py-1 sm:px-5 sm:py-2 bg-(--bg-tertiary)/10 border border-(--border-primary) w-fit rounded-[70px] border-dashed text-sm">
                  <span className="w-2.5 h-2.5 rounded-full bg-(--bg-tertiary) animate-pulse text-[8px] sm:text-[16px]" />
                  Available To Work
                </div>
                <div className="text-lg md:text-xl font-semibold pt-2 pb-0.5">
                  Ali Hasan
                </div>
                <p className="text-[13px] sm:text-[16px] text-(--text-muted)">
                  Frontend Developer
                </p>
              </div>
            </div>

            {contacts.map((item, idx) => (
              <div
                key={item.title}
                data-aos="fade-up"
                data-aos-delay={idx * 80}
              >
                <SocialCard {...item} />
              </div>
            ))}
          </div>
          <div
            data-aos="fade-up"
            className="col-span-2 bg-(--bg-primary)/80 rounded-2xl p-8 shadow-xl"
          >
            <form
              className="space-y-6"
              onSubmit={submitContact}
              onInput={(event) =>
                errors.clear((event.target as HTMLInputElement).name)
              }
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <InputField
                  label="Name"
                  placeholder="Your Name"
                  name="name"
                  type="text"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  error={errors.get("name")}
                  required
                />

                <InputField
                  label="Email"
                  placeholder="Your Email"
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  error={errors.get("email")}
                  required
                />
                <InputField
                  label="Where are you from?"
                  placeholder="Select Your Country"
                  name="country"
                  type="select"
                  value={form.country}
                  onChange={(e) =>
                    setForm((prev) => ({
                      ...prev,
                      country: e.target.value,
                    }))
                  }
                  options={filterCountry}
                  error={errors.get("country")}
                />
                <InputField
                  label="Phone Number"
                  placeholder="Your phone number"
                  name="phone"
                  type="text"
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  error={errors.get("phone")}
                  required
                />
              </div>
              <InputField
                label="Write your plan’s brief here"
                placeholder="Write your plan’s brief here"
                name="message"
                type="textarea"
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                error={errors.get("message")}
                required
              />
              <div className="mb-6 overflow-hidden">
                <div
                  className="origin-left 
                  scale-100 
                  max-[640px]:scale-90 
                  max-[400px]:scale-75"
                >
                  <ReCAPTCHA
                    ref={recaptchaRef}
                    sitekey="6LcEuDEsAAAAAJYlLfogMBbDVyu-eQdLsY1mdq57"
                    onChange={handleCaptcha}
                    theme="dark"
                  />
                </div>

                {errors.get("token") && (
                  <p className="text-red-500 text-sm">{errors.get("token")}</p>
                )}
              </div>
              <button
                type="submit"
                className="px-8 py-3 text-[13px] sm:text-[16px] rounded-full bg-(--bg-tertiary)/70 hover:bg-(--bg-tertiary)  transition duration-300 cursor-pointer text-(--text-primary) font-semibold"
                disabled={loading}
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <Loader className="w-5 h-5 animate-spin" />
                    Loading...
                  </span>
                ) : (
                  "Send Message"
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

function SocialCard(item: ContactItem) {
  const Icon = item.icon;
  return (
    <a
      href={item.link || "#"}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex items-center justify-between p-4 rounded-xl bg-(--bg-primary)/90 hover:bg-(--bg-primary) transition cursor-pointer"
    >
      <div className="flex items-center gap-4">
        <div className="w-10 h-10 rounded-lg bg-(--bg-primary)/10 flex items-center justify-center text-(--text-muted)">
          <Icon />
        </div>
        <div>
          <p className="text-sm text-(--text-muted)">{item.title}</p>
          <p className="text-white font-medium min-w-0 max-w-full grid grid-cols-1 wrap-break-word text-[12px] sm:text-[16px]">
            {item.value}
          </p>
        </div>
      </div>
      <ArrowRight className="text-(--text-muted) group-hover:translate-x-1 transition" />
    </a>
  );
}

export default ContactComponent;
