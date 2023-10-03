"use client";
import { useState } from "react";
import { Session } from "next-auth";
import { IFormPic, PicCollaction } from "@/types/pic";
import { useMutationDataPic, useQueryDataPic } from "@/query/PicQuery";
import { BiPlus } from "react-icons/bi";
import BtnCreateNew from "./FormModal";
import TablePic from "./TablePic";

interface PropsPagination {
  collaction: PicCollaction | undefined;
  onPageClick: any;
}

const Pagination = ({ collaction, onPageClick }: PropsPagination) => {
  const removeQuote = (label: string) => {
    return label.replace("&laquo;", "").replace("&raquo;", "");
  };

  const onMovePage = (url: any) => {
    if (url !== null) {
      const searchParams = new URL(url);
      const pageNumber = searchParams.searchParams.get("page");
      if (pageNumber !== null && !isNaN(Number(pageNumber))) {
        onPageClick(Number(pageNumber));
      }
    }
  };

  return (
    <div className="join p-2 flex justify-center items-center">
      {collaction?.meta.links.map((value, i) => (
        <button
          key={i}
          className={`join-item btn ${value.active ? "btn-active" : ""}`}
          onClick={() => onMovePage(value.url)}
        >
          {removeQuote(value.label)}
        </button>
      ))}
    </div>
  );
};

type PPropsPic = {
  session: Session;
};

const PageStatusProvider = ({ session }: PPropsPic) => {
  const {
    data: collaction,
    setPage,
    isLoading,
    setSortDataServe,
    setFilterField,
    page,
  } = useQueryDataPic({ token: session.user.token });

  const onPageClick = (page: number) => {
    setPage(page);
  };

  const LoadingComponent = () => {
    return (
      <div className="flex flex-1 items-center justify-center">
        <span className="loading loading-spinner text-info h-16 w-16"></span>
      </div>
    );
  };

  return (
    <>
      <div className="flex justify-center items-center py-2">
        <span className="text-lg font-bold">Master Status Page</span>
      </div>
      {isLoading && <LoadingComponent />}

      {!isLoading && (
        <>
          <div className="flex items-center py-4">
            <BtnCreateNew />
          </div>

          {collaction && (
            <TablePic
              page={page}
              apiResource={collaction}
              setSortDataServe={setSortDataServe}
              setFilterField={setFilterField}
              setPage={setPage}
            />
          )}
        </>
      )}
      <Pagination collaction={collaction} onPageClick={onPageClick} />
    </>
  );
};

export default PageStatusProvider;
