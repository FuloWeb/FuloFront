import { footerData } from "./data";

export function Footer() {
  return (
    <footer className="bg-secondary-300 px-6 py-8 text-white">
      <div className="mx-auto grid w-full gap-8 md:grid-cols-3">
        {footerData.map((section, index) => (
          <div key={index}>
            <h3 className="mb-4 text-sm font-bold">
              {section.title}
            </h3>

            <ul className="space-y-2">
              {section.links.map((item) => (
                <li key={item}>
                  <a
                    href="#"
                    className="text-xs transition-opacity hover:opacity-80"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </footer>
  );
}