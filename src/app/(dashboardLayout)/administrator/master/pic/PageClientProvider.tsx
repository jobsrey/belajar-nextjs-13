"use client";
import { Session } from "next-auth";
import {  useQueryDataPic } from "@/query/PicQuery";
import BtnCreateNew from "./FormModal";
import TablePic from "./TablePic";
import PaginationCollaction from "@/components/table/pagination/PaginationCollaction";

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
      <PaginationCollaction collaction={collaction} onPageClick={onPageClick} />
    </>
  );
};

export default PageStatusProvider;
