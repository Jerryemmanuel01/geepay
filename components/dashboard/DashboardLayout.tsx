"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Wallet,
  ArrowRightLeft,
  Settings,
  LogOut,
  Menu,
  X,
  Bell,
  User,
  Sun,
  Moon,
} from "lucide-react";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { useTheme } from "next-themes";
import { logout } from "@/lib/redux/features/auth/authSlice";
import Image from "next/image";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const SidebarItem = ({
  icon: Icon,
  label,
  href,
  onClick,
  onLinkClick,
}: {
  icon: any;
  label: string;
  href?: string;
  onClick?: () => void;
  onLinkClick?: () => void;
}) => {
  const pathname = usePathname();
  const isActive = href ? pathname === href : false;

  if (onClick) {
    return (
      <button
        onClick={onClick}
        className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 group text-slate-500 hover:text-red-500 hover:bg-red-50 dark:text-slate-400 dark:hover:bg-red-900/10`}
      >
        <Icon size={20} />
        <span className="font-medium">{label}</span>
      </button>
    );
  }

  return (
    <Link
      href={href || "#"}
      onClick={onLinkClick}
      className={`flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 group ${
        isActive
          ? "bg-primary text-white shadow-lg shadow-primary/30"
          : "text-slate-500 hover:text-slate-900 hover:bg-slate-100 dark:text-slate-400 dark:hover:text-white dark:hover:bg-slate-800"
      }`}
    >
      <Icon size={20} className={isActive ? "text-white" : ""} />
      <span className="font-medium">{label}</span>
      {isActive && (
        <div className="ml-auto w-1.5 h-1.5 rounded-full bg-white/50" />
      )}
    </Link>
  );
};

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  const dispatch = useDispatch();
  const router = useRouter();

  const handleLogout = () => {
    dispatch(logout());
    router.push("/auth/login");
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex font-sans">
      {/* Sidebar Overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-slate-900/50 backdrop-blur-xs lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed lg:sticky top-0 left-0 z-50 h-[100dvh] w-72 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 transform transition-transform duration-300 ease-in-out lg:transform-none ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        <div className="h-full flex flex-col p-6">
          {/* Logo */}
          <div className="flex items-center justify-between mb-10">
            <Link href="/dashboard" className="flex items-center space-x-2">
              <Image src="/favicon.png" alt="Logo" width={50} height={50} />

              <span className="font-bold text-2xl tracking-tight text-slate-900 dark:text-white">
                Geepay
              </span>
            </Link>
            <button
              onClick={() => setIsSidebarOpen(false)}
              className="lg:hidden p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500"
            >
              <X size={20} />
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 space-y-2">
            <SidebarItem
              icon={LayoutDashboard}
              label="Dashboard"
              href="/dashboard"
              onLinkClick={() => setIsSidebarOpen(false)}
            />
            <SidebarItem
              icon={Wallet}
              label="My Wallet"
              href="/dashboard/wallet"
              onLinkClick={() => setIsSidebarOpen(false)}
            />
            <SidebarItem
              icon={ArrowRightLeft}
              label="Transactions"
              href="/dashboard/transactions"
              onLinkClick={() => setIsSidebarOpen(false)}
            />
            <SidebarItem
              icon={User}
              label="Profile"
              href="/dashboard/profile"
              onLinkClick={() => setIsSidebarOpen(false)}
            />
            <SidebarItem
              icon={Settings}
              label="Settings"
              href="/dashboard/settings"
              onLinkClick={() => setIsSidebarOpen(false)}
            />
          </nav>

          {/* Logout */}
          <div className="pt-6 mt-6 border-t border-slate-100 dark:border-slate-800">
            <SidebarItem icon={LogOut} label="Log Out" onClick={handleLogout} />
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Header */}
        <header className="h-20 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md sticky top-0 z-30 border-b border-slate-200 dark:border-slate-800 px-6 sm:px-8 flex items-center justify-between">
          <button
            onClick={() => setIsSidebarOpen(true)}
            className="lg:hidden p-2 -ml-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300"
          >
            <Menu size={24} />
          </button>

          <div className="flex items-center space-x-4 ml-auto">
            {/* <button className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 relative text-slate-500 transition-colors">
              <Bell size={20} />
              <span className="absolute top-2 right-2.5 w-2 h-2 rounded-full bg-red-500 border border-white dark:border-slate-900"></span>
            </button> */}
            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="p-2.5 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 transition-colors"
            >
              {mounted &&
                (theme === "dark" ? <Sun size={20} /> : <Moon size={20} />)}
            </button>
          </div>
        </header>

        {/* Page Content */}
        <div className="flex-1 overflow-auto p-6 sm:p-8">
          <div className="max-w-7xl mx-auto">{children}</div>
        </div>
      </main>
    </div>
  );
}
