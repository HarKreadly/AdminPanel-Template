import { InboxIcon } from "@heroicons/react/24/solid";
import { MdSpaceDashboard } from "react-icons/md";
import { HiUsers } from "react-icons/hi2";
import { PiPackageFill } from "react-icons/pi";
import { IoMdSettings } from "react-icons/io";
import { IoExit } from "react-icons/io5";
import { BiSolidUser } from "react-icons/bi";

export function getMenuItems(routeFn) {
    const r = typeof routeFn === "function" ? routeFn : () => "#";
    return [
        { name: "Dashboard", iconComponent: MdSpaceDashboard, href: r("dashboard"), activeWhen: "dashboard" },
        { name: "Users", iconComponent: HiUsers, href: "#", activeWhen: "users.*" },
        { name: "Products", iconComponent: PiPackageFill, href: "#", activeWhen: "products.*" },
    ];
}

export function getFooterItems(routeFn) {
    const r = typeof routeFn === "function" ? routeFn : () => "#";
    return [
        { name: "Profile", iconComponent: BiSolidUser, href: r("profile.index"), activeWhen: "profile.index", method: "get" },
        { name: "Settings", iconComponent: IoMdSettings, href: r("profile.edit"), activeWhen: "profile.edit", method: "get" },
        { name: "Sign Out", iconComponent: IoExit, href: r("logout"), activeWhen: "logout", method: "post" },
    ];
}


