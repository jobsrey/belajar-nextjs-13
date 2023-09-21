import { useState } from "react";
import api from "../utils/api";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { IFormStatus, StatusCollaction } from "@/types/status.d";

interface SearchStatus {
  name: string;
  kode: string;
  description: string;
}

interface TSortServe {
  sortColumnName?: string,
  sortDirection?: 'desc' | 'asc'
}

export const useQueryDataStatus = () => {
  const [page, setPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(20);
  const [filterField, setFilterField] = useState<SearchStatus>({
    name: "",
    kode: "",
    description: "",
  });
  const [filteredInfo, setFilteredInfo] = useState({});
  const [sortDataServe, setSortDataServe] = useState<TSortServe>({});

  //query client
  const queryClient = useQueryClient();

  const paramsKey = {
    page: page,
    "per-page": pageSize,
    ...filterField,
    ...sortDataServe,
  };

  const fetchData = async ({ queryKey }: any) => {
    const params = queryKey[1];
    const response = await api.get<StatusCollaction>("/master/status", {
      params,
    });
    return response.data;
  };

  //fungsi useQuery()
  const { data, isLoading, error } = useQuery({
    queryKey: ["collactionDataStatus", paramsKey],
    queryFn: fetchData,
    keepPreviousData: true,
    meta: {},
  });


  //mutation create data
  const createData = useMutation(async (status:IFormStatus) => {
    const formData = new FormData();
    // newData?.fileUpload?.fileList?.forEach((file) => {
    //   formData.append("fileUpload", file.originFileObj);
    // });

    formData.append("kode", status?.kode as string);
    formData.append("name", status?.name as string);
    formData.append("description", status?.description as string);

    await api.post("/master/status", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  });

  //handle create
  const handleCreate = async (status:IFormStatus) => {
    await createData.mutateAsync(status);
    queryClient.invalidateQueries(["collactionDataStatus"]);
  };

  //mutation update status
  const updateData = useMutation(async (status: IFormStatus) => {
    const formData = new FormData();
    formData.append("kode", status?.kode as string);
    formData.append("name", status?.name as string);
    formData.append("description", status?.description as string);
    formData.append("_method","PATCH");

    await api.post(`/master/status/${status?.id}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  });

  //handle update
  const handleUpdate = async (updatedData:IFormStatus) => {
    await updateData.mutateAsync(updatedData);
    queryClient.invalidateQueries(["collactionDataStatus"]);
  };

  //mutation delete status
  const deleteData = useMutation(async (id:string) => {
    const formData = new FormData();
    formData.append("_method","DELETE");

    await api.post(`/master/status/${id}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  });

  //handle delete
  const handleDelete = async (id:string) => {
    await deleteData.mutateAsync(id);
    queryClient.invalidateQueries(["collactionDataStatus"]);
  };

  return {
    data,
    isLoading,
    error,
    sortDataServe,
    page,
    pageSize,
    filteredInfo,
    setFilteredInfo,
    filterField,
    setFilterField,
    setPage,
    setPageSize,
    handleCreate,
    handleUpdate,
    handleDelete,
    setSortDataServe,
  };
};
