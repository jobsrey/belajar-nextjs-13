"use client";

import { useQueryDataMasterClass } from "@/query/MasterClassQuery";
import { Session } from "next-auth";
import TableData from "./TableData";
import PaginationCollaction from "@/components/table/pagination/PaginationCollaction";
import BtnFormCreate from "./BtnFormCreate";

interface IPropsClientPageProvider {
  session: Session;
}

const PageClientProvider = ({ session }: IPropsClientPageProvider) => {
  const {
    data: collaction,
    setPage,
    isLoading,
    setSortDataServe,
    setFilterField,
    page,
  } = useQueryDataMasterClass({ token: session.user.token });

  const onPageClick = (page: number) => {
    setPage(page);
  };

  return (
    <>
      <div className="flex items-center justify-end py-4 pr-4">
        <BtnFormCreate />
      </div>

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
