import baseStyle from "../../styles/base.module.css";
import footerStyle from "../../styles/footer.module.css";

export default function Footer() {
  return (
    <footer className={`${footerStyle.container} bg-white py-6 flex flex-row h-full`}>
      <div className={baseStyle.content}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-400"
        >
          Copyright © 1999-2021 Grupo Mercado Livre.
        </a>
      </div>
    </footer>
  );
}
