"use client";
import { useState } from "react";
import { useQueryDataStatus } from "@/query/StatusQuery";
import { IFormStatus, StatusCollaction } from "@/types/status.d";
import { FormModal } from "./FormModal";
import { BiPlus } from "react-icons/bi";
import TableStatus from "./TableStatus";
import { useSession } from "next-auth/react";

interface PropsPagination {
  collaction: StatusCollaction | undefined;
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

const PageStatusProvider = () => {
  const [updateStatus, setUpdateStatus] = useState<IFormStatus>();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isNewRecord, setIsNewRecord] = useState<boolean>(false);

  const { data: session } = useSession();
  console.log(session?.user?.token) // no errors


  const {
    data: collaction,
    setPage,
    isLoading,
    setSortDataServe,
    setFilterField,
    page,
  } = useQueryDataStatus();

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
    setUpdateStatus({});
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
              Tambah Status
            </button>
          </div>

          {collaction && (
            <TableStatus
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
        status={updateStatus}
        isNewRecord={isNewRecord}
      />
      <Pagination collaction={collaction} onPageClick={onPageClick} />
    </>
  );
};

export default PageStatusProvider;
