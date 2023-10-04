import { useState } from "react";
import api from "../utils/api";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { CategoryCollaction, IFormCategory } from "@/types/MasterCategory";
import { signOut } from "next-auth/react";
import { notification } from "antd";

//IMPORTAN VARIABLE
const queryNameKey = "collactionDataCategory";
const endPointUrl = "/master/category";
const endPointMove = "/master/category/move";

interface TSortServe {
  sortColumnName?: string;
  sortDirection?: "desc" | "asc";
}

interface IProps {
  token: string | undefined;
}

//custom hook fetch data collaction category
export const useQueryDataCategory = ({ token }: IProps) => {
  const [page, setPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(20);

  const [filteredInfo, setFilteredInfo] = useState({});
  const [sortDataServe, setSortDataServe] = useState<TSortServe>({});

  const fetchData = async () => {
    try {
      const response = await api.get<CategoryCollaction>(endPointUrl, {
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

export interface IMoveCategory {
  dropTargetId?: number | null;
  dragSourceId: number;
}


//custom hook for mutation category tree
export const useMutationTree = ({ token }: IProps) => {
  //query client
  const queryClient = useQueryClient();

  //mutation create data
  const moveData = useMutation(async (data: IMoveCategory) => {
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
  const handleMove = async (data: IMoveCategory) => {
    await moveData.mutateAsync(data);
    queryClient.invalidateQueries([queryNameKey]);
    queryClient.invalidateQueries(["collactionDataCategoryTreeInput"]);
  };

  //mutation move tree with arrow
  const moveDataWithLeftArrow = useMutation(async (data: IMoveCategory) => {
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
  const handleMoveWithArrow = async (data: IMoveCategory) => {
    await moveDataWithLeftArrow.mutateAsync(data);
    queryClient.invalidateQueries([queryNameKey]);
    queryClient.invalidateQueries(["collactionDataCategoryTreeInput"]);
  };

  //mutation create new data
  const createNewData = useMutation(async (data: IFormCategory) => {
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
  const handleCreateNew = async (data: IFormCategory) => {
    await createNewData.mutateAsync(data);
    queryClient.invalidateQueries([queryNameKey]);
    queryClient.invalidateQueries(["collactionDataCategoryTreeInput"]);
  };

  //mutation update data
  const updateDataKategori = useMutation(async (data: IFormCategory) => {
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
  const handleUpdateData = async (data: IFormCategory) => {
    await updateDataKategori.mutateAsync(data);
    queryClient.invalidateQueries([queryNameKey]);
    queryClient.invalidateQueries(["collactionDataCategoryTreeInput"]);
  };

  //mutation delete data by one
  const deleteData = useMutation(async (data: IFormCategory) => {
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
  const handleDeleteData = async (data: IFormCategory) => {
    await deleteData.mutateAsync(data);
    queryClient.invalidateQueries([queryNameKey]);
    queryClient.invalidateQueries(["collactionDataCategoryTreeInput"]);
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
      const response = await api.get<CategoryCollaction>(
        "/master/category/get-list-data-for-input",
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
    queryKey: ["collactionDataCategoryTreeInput"],
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
