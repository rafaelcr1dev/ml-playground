import React, { useMemo } from "react";

import Image from "next/image";
import Link from "next/link";

import { navigators } from "../../config/navigators";

import baseStyle from "../../styles/base.module.css";

interface IProps {
  activeIdItem: number;
}

export default function Header({ activeIdItem = 0 }: IProps) {
  const menuItems = useMemo(() => {
    const activeClasse =
      "border-b-2 font-bold border-blue-400 p-5 text-gray-600 text-sm";
    const normalClasse =
      "border-b-2 border-transparent text-gray-400 p-5 hover:border-blue-400 hover:text-gray-600 text-sm font-medium";

    return navigators.map((item) => {
      item.className = item.id === activeIdItem ? activeClasse : normalClasse;

      return item;
    });
  }, [activeIdItem]);
  return (
    <header className={"bg-white"}>
      <div className={baseStyle.content}>
        <div className="flex flex-wrap">
          <div className="w-full lg:w-1/4 p-4 text-gray-200 flex justify-center lg:justify-start">
            <Link href="/">
              <a className="flex flex-wrap flex-row items-center">
                <Image
                  src="/images/logo.jpg"
                  alt="Mercado livre"
                  width={39}
                  height={28}
                />
                <span className={"ml-2 text-gray-700 text-sm"}>Playground</span>
              </a>
            </Link>
          </div>
          <div className="w-full lg:w-3/4 text-right text-gray-700">
            <div className="sm:block lg:ml-6 overflow-x-auto lg:flex md:justify-center lg:justify-end">
              <div className="flex" style={{'width': `${menuItems.length * 150}px`}}>
                {menuItems.map((item, key) => (
                  <div key={`nav-${item.id}`} className="flex justify-end md:w-auto lg:w-auto text-center">
                    <Link href={item.link}>
                      <a
                        dangerouslySetInnerHTML={{ __html: item.text }}
                        className={item.className}
                      ></a>
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
