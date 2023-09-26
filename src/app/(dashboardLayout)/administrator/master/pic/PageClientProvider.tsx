"use client";
import { useState } from "react";
import { Session } from "next-auth";
import { IFormPic, PicCollaction } from "@/types/pic";
import { useQueryDataPic } from "@/query/PicQuery";
import { BiPlus } from "react-icons/bi";
import { FormModal } from "./FormModal";
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
  const [dataUpdate, setDataUpdate] = useState<IFormPic>();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isNewRecord, setIsNewRecord] = useState<boolean>(false);

  const {
    data: collaction,
    setPage,
    isLoading,
    setSortDataServe,
    setFilterField,
    page,
  } = useQueryDataPic({token:session.user.token});

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

  const onCloseModalHandle = () => {
    setIsOpen(!isOpen);
  };

  const onClickCreate = () => {
    setDataUpdate({});
    setIsNewRecord(true);
    setIsOpen(true);
  };

  return (
    <>
      <h2>Master Status Page</h2>
      {isLoading && <LoadingComponent />}

      {!isLoading && (
        <>
          <div className="flex items-center p-4">
            <button
              className="btn btn-primary"
              type="button"
              onClick={onClickCreate}
            >
              {" "}
              <BiPlus size={14} />
              Tambah PIC
            </button>
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

      <FormModal
        isOpen={isOpen}
        onClose={onCloseModalHandle}
        data={dataUpdate}
        isNewRecord={isNewRecord}
      />
      <Pagination collaction={collaction} onPageClick={onPageClick} />
    </>
  );
};

export default PageStatusProvider;
