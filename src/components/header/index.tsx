"use client";

import { HeartIcon } from "@heroicons/react/24/solid";
import { Badge, Typography } from "@material-tailwind/react";
import Image from "next/image";

type HeaderProps = {
  badgeCount: number;
  openDrawer: () => void;
};

export default function Header({ badgeCount, openDrawer }: HeaderProps) {
  return (
    <nav className="flex items-center justify-between flex-wrap p-6 shadow ">
      <div className="w-full flex-grow flex items-center justify-between bg-slate-500">
        <div className="flex items-center flex-shrink-0 text-white mr-6">
          <Image
            src="https://upload.wikimedia.org/wikipedia/commons/5/55/Karwei_logo_%282017%29.png"
            alt={"Karwei logo"}
            priority={true}
            width={36}
            height={36}
            className="object-contain object-center lg:h-full lg:w-full"
          />
          <Typography color="black" variant="h4">
            Intergamma
          </Typography>
        </div>

        <Badge className="w-6 h-6" content={badgeCount}>
          <button onClick={openDrawer}>
            <HeartIcon className="h-10 w-10 text-black" />
          </button>
        </Badge>
      </div>
    </nav>
  );
}
