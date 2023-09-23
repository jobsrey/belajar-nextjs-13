import ActiveLink from "@/components/ActiveLink";
import React from "react";
import { MdOutlineDashboard } from "react-icons/md";
import { FaThList } from "react-icons/fa";
import { BsListCheck, BsQrCodeScan } from "react-icons/bs";
import { AiFillTags } from "react-icons/ai";
import { SlCursorMove } from "react-icons/sl";
import { GrDocumentStore } from "react-icons/gr";

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
        <li>
          <h3 className="menu-title">Transaksi</h3>
        </li>
        <li>
          <ActiveLink href="/transaction/mutation">
            <SlCursorMove size={14} />
            Perpindahan
          </ActiveLink>
        </li>
        <li>
          <ActiveLink href="/transaction/disposal">
            <SlCursorMove size={14} />
            Penghapusan Aset
          </ActiveLink>
        </li>
        <li>
          <ActiveLink href="/transaction/reverse">
            <SlCursorMove size={14} />
            Pembatalan Penghapusan Aset
          </ActiveLink>
        </li>
        <li>
          <ActiveLink href="/transaction/audit">
            <SlCursorMove size={14} />
            Stock Opname
          </ActiveLink>
        </li>
        <li>
          <ActiveLink href="/transaction/changeasset">
            <SlCursorMove size={14} />
            Perubahan Aset
          </ActiveLink>
        </li>
        <li>
          <ActiveLink href="/transaction/add-new-asset">
            <SlCursorMove size={14} />
            Penambahan Aset
          </ActiveLink>
        </li>
        <li>
          <h3 className="menu-title">Master Data</h3>
        </li>
        <li>
          <ActiveLink href="/administrator/master/status">
            <GrDocumentStore size={12} /> Status
          </ActiveLink>
        </li>
        <li>
          <ActiveLink href="/master/class">
            <GrDocumentStore size={14} />
            Konfirmasi Aset
          </ActiveLink>
        </li>
        <li>
          <ActiveLink href="/master/uom">
            <GrDocumentStore size={14} />
            Satuan Unit
          </ActiveLink>
        </li>
      </ul>
    </>
  );
};

export default MenuSidebar;
