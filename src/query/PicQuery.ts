import { useEffect, useState } from "react";
import api from "../utils/api";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { IFormPic, PicCollaction } from "@/types/pic";
import { signOut } from "next-auth/react";
import useDebounce from "@/hooks/useDebounce";
import { notification } from "antd";

//IMPORTAN VARIABLE
const queryNameKey = "collactionDataPic";
const endPointUrl = "/master/pic";

interface ISearchParams {
  name: string;
  kode: string;
}

interface TSortServe {
  sortColumnName?: string;
  sortDirection?: "desc" | "asc";
}

interface IProps {
  token: string | undefined;
}

export const useQueryDataPic = ({ token }: IProps) => {
  const [page, setPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(20);
  const [filteredInfo, setFilteredInfo] = useState({});
  const [sortDataServe, setSortDataServe] = useState<TSortServe>({});

  const [paramsKey, setParamsKey] = useState({
    page: page,
    "per-page": pageSize,
  });
  const [filterField, setFilterField] = useState<ISearchParams>({
    name: "",
    kode: "",
  });

  useDebounce(
    () => {
      setParamsKey((prev) => {
        return {
          ...prev,
          ...filterField,
        };
      });
    },
    500,
    [filterField]
  );

  useDebounce(
    () => {
      setParamsKey((prev) => {
        return {
          ...prev,
          ...sortDataServe,
        };
      });
    },
    200,
    [sortDataServe]
  );

  useEffect(() => {
    setParamsKey((prev) => {
      return {
        ...prev,
        page: page,
      };
    });
  }, [page]);

  const fetchData = async ({ queryKey }: any) => {
    const params = queryKey[1];

    try {
      const response = await api.get<PicCollaction>(endPointUrl, {
        params,
        headers: { Authorization: "Bearer " + token },
      });

      return response.data;
    } catch (err: any) {
      if (err.response.status === 401) {
        signOut();
      }
    }
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

interface IBulkDelete {
  listId: string[];
}

export const useMutationDataPic = ({ token }: IProps) => {
  //query client
  const queryClient = useQueryClient();

  //mutation create data
  const createData = useMutation(async (data: IFormPic) => {
    const formData = new FormData();

    formData.append("kode", data?.kode as string);
    formData.append("name", data?.name as string);

    try {
      await api.post(endPointUrl, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: "Bearer " + token,
        },
      });

      notification.success({
        message: "Berhasil",
        description: "Pic baru berhasil disimpan!",
      });

    } catch (_e: any) {
      let e: Error = _e; // error under useUnknownInCatchVariables
      notification.error({
        message: "Error",
        description: e.message,
      });
    }
    
  });

  //handle create
  const handleCreate = async (data: IFormPic) => {
    await createData.mutateAsync(data);
    queryClient.invalidateQueries([queryNameKey]);
  };

  //mutation update data
  const updateData = useMutation(async (data: IFormPic) => {
    const formData = new FormData();
    formData.append("kode", data?.kode as string);
    formData.append("name", data?.name as string);
    formData.append("_method", "PATCH");

    try{
      await api.post(`${endPointUrl}/${data?.id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: "Bearer " + token,
        },
      });

      notification.success({
        message: "Berhasil",
        description: "Pic berhasil diubah!",
      });

    } catch (_e: any) {
      let e: Error = _e; // error under useUnknownInCatchVariables
      notification.error({
        message: "Error",
        description: e.message,
      });
    }
   
  });

  //handle update
  const handleUpdate = async (updatedData: IFormPic) => {
    await updateData.mutateAsync(updatedData);
    queryClient.invalidateQueries([queryNameKey]);
  };

  //mutation delete data
  const deleteData = useMutation(async (id: string) => {
    const formData = new FormData();
    formData.append("_method", "DELETE");


    try {
      await api.post(`${endPointUrl}/${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: "Bearer " + token,
        },
      });

      notification.success({
        message: "Berhasil",
        description: "Pic berhasil dihapus!",
      });

    } catch (_e: any) {
      let e: Error = _e; // error under useUnknownInCatchVariables
      notification.error({
        message: "Error",
        description: e.message,
      });
    }
  
  });

  //handle delete
  const handleDelete = async (id: string) => {
    await deleteData.mutateAsync(id);
    queryClient.invalidateQueries([queryNameKey]);
  };

  const bulkDeleteAction = useMutation(async ({listId}: IBulkDelete) => {
    const formData = new FormData();
    formData.append("listId", JSON.stringify(listId));
    formData.append("_method", "DELETE");
    try {
      await api.post(`${endPointUrl}/bulk-delete`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: "Bearer " + token,
        },
      });

      notification.success({
        message: "Berhasil",
        description: "Pic berhasil dihapus!",
      });

    } catch (_e: any) {
      let e: Error = _e; // error under useUnknownInCatchVariables
      notification.error({
        message: "Error",
        description: e.message,
      });
    }
  });

  const handleBulkDelete = async ({listId}:IBulkDelete) => {
    await bulkDeleteAction.mutateAsync({listId});
    queryClient.invalidateQueries([queryNameKey]);
  }

  return {
    handleCreate,
    handleUpdate,
    handleDelete,
    handleBulkDelete,
  };
};
