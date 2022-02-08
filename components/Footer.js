import Link from "next/link";

export default function Footer() {
  return (
    // <footer classNameName="bg-accent-1 border-t border-accent-2 dark:bg-black">
    <footer className="footer">
      <div className="waves">
        <div className="wave" id="wave1"></div>
        <div className="wave" id="wave2"></div>
        <div className="wave" id="wave3"></div>
        <div className="wave" id="wave4"></div>
      </div>
      <ul className="social-icon">
        <li className="social-icon__item">
          <a
            className="social-icon__link"
            href="https://twitter.com/alukaard76"
            target={"_blank"}
          >
            <ion-icon name="logo-twitter"></ion-icon>
          </a>
        </li>
        <li className="social-icon__item">
          <a
            className="social-icon__link"
            href="https://www.linkedin.com/in/hirtzvincent/"
            target={"_blank"}
          >
            <ion-icon name="logo-linkedin"></ion-icon>
          </a>
        </li>
        <li className="social-icon__item">
          <a
            className="social-icon__link"
            href="https://www.instagram.com/madebynormandy/"
            target={"_blank"}
          >
            <ion-icon name="logo-instagram"></ion-icon>
          </a>
        </li>
        <li className="social-icon__item">
          <a
            className="social-icon__link"
            href="https://github.com/vincenthirtz"
            target={"_blank"}
          >
            <ion-icon name="logo-github"></ion-icon>
          </a>
        </li>
        <li className="social-icon__item">
          <a
            className="social-icon__link"
            href="mailto:hirtzvincent@gmail.com?subject=Contact"
            target={"_blank"}
          >
            <ion-icon name="mail-outline"></ion-icon>
          </a>
        </li>
        <li className="social-icon__item">
          <a
            className="social-icon__link"
            href="https://discord.gg/Nt2TpvajbA"
            target={"_blank"}
          >
            <ion-icon name="logo-discord"></ion-icon>
          </a>
        </li>
        <li className="social-icon__item">
          <a
            className="social-icon__link"
            href="https://www.buymeacoffee.com/vincenthirtz"
            target={"_blank"}
          >
            <ion-icon name="cafe-outline"></ion-icon>
          </a>
        </li>
        <li className="social-icon__item">
          <a
            className="social-icon__link"
            href="https://vincenthirtz.fr/sitemap-0.xml"
            target={"_blank"}
          >
            <ion-icon name="logo-rss"></ion-icon>
          </a>
        </li>
      </ul>
      <ul className="menu">
        <Link href="/">
          <li className="menu__item">
            <a className="menu__link" href="#">
              Accueil
            </a>
          </li>
        </Link>
        <Link href="/cats">
          <li className="menu__item">
            <a className="menu__link" href="#">
              Cats
            </a>
          </li>
        </Link>
        <Link href="/coins">
          <li className="menu__item">
            <a className="menu__link" href="#">
              Crypto
            </a>
          </li>
        </Link>
      </ul>
      <p className="flex flex-wrap -mx-1 lg:-mx-4">
        &copy;2022 Vincent Hirtz | French frontend developer |
        <img src="/qrcode.png" className="qrcode w-8 h-8 mx-1.5" alt="qrcode vincenthirtz.fr" />
      </p>
      <script
        type="module"
        src="https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.esm.js"
      ></script>
      <script
        noModule
        src="https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.js"
      ></script>
    </footer>
  );
}
