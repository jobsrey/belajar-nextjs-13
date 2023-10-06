import ActiveLink from "@/components/ActiveLink";
import React from "react";
import { MdOutlineDashboard } from "react-icons/md";
import { FaThList } from "react-icons/fa";
import { BsListCheck, BsQrCodeScan } from "react-icons/bs";
import { AiFillTags } from "react-icons/ai";
import { SlCursorMove } from "react-icons/sl";
import { GrDocumentStore } from "react-icons/gr";

interface IMenuObject {
  href: string;
  icon: React.ReactNode;
  label: string;
}

const MenuTransaction = () => {
  const listMenu: IMenuObject[] = [
    {
      href: "/transaction/mutation",
      icon: <SlCursorMove size={14} />,
      label: "Perpindahan",
    },
    {
      href: "/transaction/disposal",
      icon: <SlCursorMove size={14} />,
      label: "Penghapusan Aset",
    },
    {
      href: "/transaction/reverse",
      icon: <SlCursorMove size={14} />,
      label: "Pembatalan Penghapusan Aset",
    },
    {
      href: "/transaction/audit",
      icon: <SlCursorMove size={14} />,
      label: "Stock Opname",
    },
    {
      href: "/transaction/changeasset",
      icon: <SlCursorMove size={14} />,
      label: "Perubahan Aset",
    },
    {
      href: "/transaction/add-new-asset",
      icon: <SlCursorMove size={14} />,
      label: "Penambahan Aset",
    },
  ];

  return (
    <li>
      <details>
        <summary>
          <AiFillTags size={14} />
          Transaksi
        </summary>
        <ul>
          <li>
            <h3 className="menu-title">List Transaksi</h3>
          </li>
          {listMenu.map((v, i) => (
            <li key={i}>
              <ActiveLink href={v.href}>
                {v.icon} {v.label}
              </ActiveLink>
            </li>
          ))}
        </ul>
      </details>
    </li>
  );
};

const MenuMaster = () => {
  const listMenu: IMenuObject[] = [
    {
      href: "/administrator/master/status",
      icon: <GrDocumentStore size={12} />,
      label: "Status",
    },
    {
      href: "/administrator/master/pic",
      icon: <GrDocumentStore size={12} />,
      label: "PIC",
    },
    {
      href: "/administrator/master/user-asset",
      icon: <GrDocumentStore size={12} />,
      label: "User Aset",
    },
    {
      href: "/administrator/master/category",
      icon: <GrDocumentStore size={12} />,
      label: "Kategori",
    },
    {
      href: "/administrator/master/location",
      icon: <GrDocumentStore size={12} />,
      label: "Lokasi",
    },
    {
      href: "/administrator/master/cost-center",
      icon: <GrDocumentStore size={12} />,
      label: "Cost Center",
    },
    {
      href: "/administrator/master/currency",
      icon: <GrDocumentStore size={12} />,
      label: "Mata Uang",
    },
    {
      href: "/administrator/master/uom",
      icon: <GrDocumentStore size={12} />,
      label: "Satuan Unit",
    },
    {
      href: "/administrator/master/class",
      icon: <GrDocumentStore size={12} />,
      label: "Kelas",
    },
  ];
  return (
    <>
      <li>
        {/* <h3 className="menu-title">Master Data</h3> */}
        <details>
          <summary>
            <AiFillTags size={14} />
            Master Data
          </summary>
          <ul>
            {listMenu.map((v, i) => (
              <li key={i}>
                <ActiveLink href={v.href}>
                  {v.icon}
                  {v.label}
                </ActiveLink>
              </li>
            ))}
          </ul>
        </details>
      </li>
    </>
  );
};

const MenuSidebar = () => {
  return (
    <>
      <ul className="menu p-4 w-80 min-h-full bg-base-200 text-base-content">
        <li className="mb-2 font-semibold text-xl">
          <a href="/app/welcome">AsetKita</a>{" "}
        </li>
        {/* Sidebar content here */}
        <li>
          <ActiveLink href="/dashboard">
            <MdOutlineDashboard size={14} /> Dashboard
          </ActiveLink>
        </li>
        <li>
          <h3 className="menu-title">Master Aset</h3>
          <details>
            <summary>
              <AiFillTags size={14} />
              Aset
            </summary>
            <ul>
              <li>
                <ActiveLink href="/asset">
                  <FaThList size={12} /> Data Aset
                </ActiveLink>
              </li>
              <li>
                <ActiveLink href="/asset/confirmation">
                  <BsListCheck size={14} />
                  Konfirmasi Aset
                </ActiveLink>
              </li>
            </ul>
          </details>
        </li>
        <li>
          <ActiveLink href="/asset/scan-qr">
            <BsQrCodeScan size={14} />
            Scan QR
          </ActiveLink>
        </li>
        <MenuTransaction />
        <MenuMaster />
      </ul>
    </>
  );
};

export default MenuSidebar;
