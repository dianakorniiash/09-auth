import { Metadata } from "next";
import css from "./page.module.css";
import { IMG_URL, SITE_URL } from "@/lib/constants";


export const metadata: Metadata = {
  title: "404-Not found",
  description:
    "page not found",
  openGraph: {
    title: "404-Not found",
    description:
      "this page not found",
    url: `${SITE_URL}/404`,

    images: [
      {
        url: IMG_URL,
        width: 1200,
        height: 630,
        alt: "page not found",
      },
    ],
  },
};
const NotFound = () => {
  return (
    <>
      <h1 className={css.title}>404 - Page not found</h1>
      <p className={css.description}>
        Sorry, the page you are looking for does not exist.
      </p>
    </>
  );
};

export default NotFound;