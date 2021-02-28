import { useState, useEffect } from "react";
import Link from "next/link";
import LinkedInIcon from "@material-ui/icons/LinkedIn";
import FacebookIcon from "@material-ui/icons/Facebook";
import InstagramIcon from "@material-ui/icons/Instagram";
import TwitterIcon from "@material-ui/icons/Twitter";
import GitHubIcon from "@material-ui/icons/GitHub";
import Brightness3Icon from '@material-ui/icons/Brightness3';
import WbSunnyIcon from '@material-ui/icons/WbSunny';
import { useTheme } from "next-themes";

export default function Intro() {
  const { theme, setTheme } = useTheme();
  const [checked, setChecked] = useState(false);

  const handleChange = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  useEffect(() => {
    setChecked(theme === "light" ? false : true);
  }, [theme]);

  return (
    <section className="flex-col md:flex-row flex items-center md:justify-between mt-16 mb-16 md:mb-12">
      <h1 className="text-6xl md:text-8xl font-bold tracking-tighter leading-tight md:pr-8">
        <Link href="/">
          <a>Vincent Hirtz</a>
        </Link>
      </h1>
      <h4 className="text-center md:text-left text-lg mt-5 md:pl-8">
        <div style={{ display: "flex", alignItems: "center" }}>
          <WbSunnyIcon />
          <div className="relative inline-block w-10 align-middle select-none transition duration-200 ease-in">
            <input type="checkbox" checked={checked} onChange={handleChange} name="toggle" id="toggle" className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer" />
            <label htmlFor="toggle" className="toggle-label block overflow-hidden h-6 rounded-full bg-gray-300 cursor-pointer"></label>
          </div>
          <Brightness3Icon />
        </div>
        <a href="https://linkedin.com/in/hirtzvincent/" target="_blank">
          <LinkedInIcon />
        </a>
        <a href="https://www.facebook.com/foetusIer/" target="_blank">
          <FacebookIcon />
        </a>
        <a href="https://instagram.com/urbex_pop_art/" target="_blank">
          <InstagramIcon />
        </a>
        <a href="https://twitter.com/alukaard76" target="_blank">
          <TwitterIcon />
        </a>
        <a href="https://github.com/vincenthirtz" target="_blank">
          <GitHubIcon />
        </a>
      </h4>
    </section>
  );
}
