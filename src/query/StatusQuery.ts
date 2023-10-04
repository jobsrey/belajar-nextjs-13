import { useState } from "react";
import api from "../utils/api";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { IFormStatus, StatusCollaction } from "@/types/MasterStatus";

interface SearchStatus {
  name: string;
  kode: string;
  description: string;
}

interface TSortServe {
  sortColumnName?: string;
  sortDirection?: "desc" | "asc";
}

interface IProps {
  token: string | undefined;
}

const queryNameKey = "collactionDataStatus";

export const useQueryDataStatus = ({ token }: IProps) => {
  const [page, setPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(20);
  const [filterField, setFilterField] = useState<SearchStatus>({
    name: "",
    kode: "",
    description: "",
  });

  const [filteredInfo, setFilteredInfo] = useState({});
  const [sortDataServe, setSortDataServe] = useState<TSortServe>({});

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
      headers: { Authorization: "Bearer " + token },
    });
    return response.data;
  };

  //fungsi useQuery()
  const { data, isLoading, error } = useQuery({
    queryKey: [queryNameKey, paramsKey],
    queryFn: fetchData,
    keepPreviousData: true,
    meta: {},
  });

  return {
    data,
    isLoading,
    error,
    sortDataServe,
    page,
    pageSize,
    filteredInfo,
    filterField,
    setFilteredInfo,
    setFilterField,
    setPage,
    setPageSize,
    setSortDataServe,
  };
};

export const useMutationDataStatus = ({ token }: IProps) => {
  //query client
  const queryClient = useQueryClient();

  //mutation create data
  const createData = useMutation(async (status: IFormStatus) => {
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
        Authorization: "Bearer " + token,
      },
    });
  });

  //handle create
  const handleCreate = async (status: IFormStatus) => {
    await createData.mutateAsync(status);
    queryClient.invalidateQueries([queryNameKey]);
  };

  //mutation update status
  const updateData = useMutation(async (status: IFormStatus) => {
    const formData = new FormData();
    formData.append("kode", status?.kode as string);
    formData.append("name", status?.name as string);
    formData.append("description", status?.description as string);
    formData.append("_method", "PATCH");

    await api.post(`/master/status/${status?.id}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: "Bearer " + token,
      },
    });
  });

  //handle update
  const handleUpdate = async (updatedData: IFormStatus) => {
    await updateData.mutateAsync(updatedData);
    queryClient.invalidateQueries([queryNameKey]);
  };

  //mutation delete status
  const deleteData = useMutation(async (id: string) => {
    const formData = new FormData();
    formData.append("_method", "DELETE");

    await api.post(`/master/status/${id}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: "Bearer " + token,
      },
    });
  });

  //handle delete
  const handleDelete = async (id: string) => {
    await deleteData.mutateAsync(id);
    queryClient.invalidateQueries([queryNameKey]);
  };

  return {
    handleCreate,
    handleUpdate,
    handleDelete,
  };
};
