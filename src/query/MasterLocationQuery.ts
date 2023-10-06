import { useState } from "react";
import api from "../utils/api";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { signOut } from "next-auth/react";
import { notification } from "antd";
import { IFormLocation, ILocationCollaction } from "@/types/MasterLocation";

//IMPORTAN VARIABLE
const queryNameKey = "collactionDataMasterLocation";
const queryNameTree = "collactionDataLocationTreeInput";
const endPointUrl = "/master/location";
const endPointMove = "/master/location/move";

interface TSortServe {
  sortColumnName?: string;
  sortDirection?: "desc" | "asc";
}

interface IProps {
  token: string | undefined;
}

//custom hook fetch data collaction location
export const useQueryDataLocation = ({ token }: IProps) => {
  const [page, setPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(20);

  const [filteredInfo, setFilteredInfo] = useState({});
  const [sortDataServe, setSortDataServe] = useState<TSortServe>({});

  const fetchData = async () => {
    try {
      const response = await api.get<ILocationCollaction>(endPointUrl, {
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
    queryKey: [queryNameKey],
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
    setFilteredInfo,
    setPage,
    setPageSize,
    setSortDataServe,
  };
};

export interface IMove {
  dropTargetId?: number | null;
  dragSourceId: number;
}

//custom hook for mutation location tree
export const useMutationTree = ({ token }: IProps) => {
  //query client
  const queryClient = useQueryClient();

  //mutation create data
  const moveData = useMutation(async (data: IMove) => {
    const formData = new FormData();
    if (data?.dropTargetId) {
      formData.append("dropTargetId", data.dropTargetId.toString() as string);
    }
    formData.append("dragSourceId", data?.dragSourceId.toString() as string);

    try {
      await api.post(endPointMove, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: "Bearer " + token,
        },
      });
      notification.success({
        message: "Berhasil",
        description: "Kategori berhasil dipindahkan!",
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
  const handleMove = async (data: IMove) => {
    await moveData.mutateAsync(data);
    queryClient.invalidateQueries([queryNameKey]);
    queryClient.invalidateQueries([queryNameTree]);
  };

  //mutation move tree with arrow
  const moveDataWithLeftArrow = useMutation(async (data: IMove) => {
    const formData = new FormData();
    formData.append("dragSourceId", data?.dragSourceId.toString() as string);

    try {
      await api.post(`${endPointUrl}/move-with-arrow`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: "Bearer " + token,
        },
      });

      notification.success({
        message: "Berhasil",
        description: "Kategori berhasil dipindahkan!",
      });
    } catch (_e: any) {
      let e: Error = _e; // error under useUnknownInCatchVariables
      notification.error({
        message: "Error",
        description: e.message,
      });
    }
  });

  //handle move tree data with arrow
  const handleMoveWithArrow = async (data: IMove) => {
    await moveDataWithLeftArrow.mutateAsync(data);
    queryClient.invalidateQueries([queryNameKey]);
    queryClient.invalidateQueries([queryNameTree]);
  };

  //mutation create new data
  const createNewData = useMutation(async (data: IFormLocation) => {
    const formData = new FormData();
    formData.append("name", data.name as string);
    formData.append("description", data.description as string);
    if (data.parentId) {
      formData.append("parentId", data.parentId?.toString() as string);
    }

    try {
      await api.post(endPointUrl, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: "Bearer " + token,
        },
      });
      notification.success({
        message: "Berhasil",
        description: "Kategori berhasil tersimpan!",
      });
    } catch (_e: any) {
      let e: Error = _e; // error under useUnknownInCatchVariables
      notification.error({
        message: "Error",
        description: e.message,
      });
    }
  });

  //handle create new data
  const handleCreateNew = async (data: IFormLocation) => {
    await createNewData.mutateAsync(data);
    queryClient.invalidateQueries([queryNameKey]);
    queryClient.invalidateQueries([queryNameTree]);
  };

  //mutation update data
  const updateDataKategori = useMutation(async (data: IFormLocation) => {
    const formData = new FormData();
    formData.append("name", data.name as string);
    formData.append("description", data.description as string);
    if (data.parentId) {
      formData.append("parentId", data.parentId.toString() as string);
    }
    formData.append("_method", "PATCH");

    try {
      await api.post(`${endPointUrl}/${data.id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: "Bearer " + token,
        },
      });
      notification.success({
        message: "Berhasil",
        description: "Kategori berhasil tersimpan!",
      });
    } catch (_e: any) {
      let e: Error = _e; // error under useUnknownInCatchVariables
      notification.error({
        message: "Error",
        description: e.message,
      });
    }
  });

  //handle update data
  const handleUpdateData = async (data: IFormLocation) => {
    await updateDataKategori.mutateAsync(data);
    queryClient.invalidateQueries([queryNameKey]);
    queryClient.invalidateQueries([queryNameTree]);
  };

  //mutation delete data by one
  const deleteData = useMutation(async (data: IFormLocation) => {
    const formData = new FormData();
    formData.append("_method", "DELETE");

    try {
      await api.post(`${endPointUrl}/${data.id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: "Bearer " + token,
        },
      });
      notification.success({
        message: "Berhasil",
        description: "Kategori berhasil terhapus!",
      });
    } catch (_e: any) {
      let e: Error = _e; // error under useUnknownInCatchVariables
      notification.error({
        message: "Error",
        description: e.message,
      });
    }
  });

  //handle delete data by one
  const handleDeleteData = async (data: IFormLocation) => {
    await deleteData.mutateAsync(data);
    queryClient.invalidateQueries([queryNameKey]);
    queryClient.invalidateQueries([queryNameTree]);
  };

  return {
    handleMove,
    handleCreateNew,
    handleUpdateData,
    handleDeleteData,
    handleMoveWithArrow,
  };
};

//fungsi untuk mengambil data tree pada input ant treeSelect
export const useQueryListDataTeeInput = ({ token }: IProps) => {
  //process fetch api
  const fetchData = async () => {
    try {
      const response = await api.get<ILocationCollaction>(
        "/master/location/get-list-data-for-input",
        {
          headers: { Authorization: "Bearer " + token },
        }
      );

      return response.data;
    } catch (err: any) {
      if (err.response.status === 401) {
        signOut();
      }
    }
  };

  //fungsi useQuery()
  const { data, isLoading, error } = useQuery({
    queryKey: [queryNameTree],
    queryFn: fetchData,
    keepPreviousData: true,
    enabled: token ? true : false,
    meta: {},
  });

  return {
    data,
    isLoading,
    error,
  };
};
