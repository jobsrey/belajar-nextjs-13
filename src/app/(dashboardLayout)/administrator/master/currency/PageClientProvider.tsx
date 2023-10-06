"use client";

import { Session } from "next-auth";
import TableData from "./TableData";
import PaginationCollaction from "@/components/table/pagination/PaginationCollaction";
import BtnFormCreate from "./BtnFormCreate";
import { useQueryDataMasterCurrency } from "@/query/MasterCurrencyQuery";

interface IProps {
  session: Session;
}

const LoadingComponent = () => {
  return (
    <div className="flex flex-1 items-center justify-center min-h-[300px]">
      <span className="loading loading-spinner text-info h-16 w-16"></span>
    </div>
  );
};

const PageClientProvider = ({ session }: IProps) => {
  const {
    data: collaction,
    setPage,
    isLoading,
    setSortDataServe,
    setFilterField,
    page,
  } = useQueryDataMasterCurrency({ token: session.user.token });

  const onPageClick = (page: number) => {
    setPage(page);
  };

  return (
    <>
      <div className="flex py-4 items-center">
        <BtnFormCreate />
      </div>
      {isLoading && <LoadingComponent />}
      {collaction && (
        <TableData
          apiResource={collaction}
          page={page}
          session={session}
          setFilterField={setFilterField}
          setPage={setPage}
          setSortDataServe={setSortDataServe}
        />
      )}
      <PaginationCollaction collaction={collaction} onPageClick={onPageClick} />
    </>
  );
};

export default PageClientProvider;
