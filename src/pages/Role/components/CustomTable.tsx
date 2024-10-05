/* eslint-disable no-console */
"use client";

import { useMemo } from "react";
import {
  MaterialReactTable,
  useMaterialReactTable,
  type MRT_ColumnDef,
  type MRT_RowData
} from "material-react-table";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Box, Chip, IconButton, Tooltip, CircularProgress, Typography } from "@mui/material";
import { FiEdit2, FiTrash2 } from "react-icons/fi";

import { MRT_Localization_ES } from "../../../utils/reactTable/MRT_Localization_ES";
import { GetRoleAll } from "../services/Services";

// store
import { handleDataDelete } from "../functions/Functions";
import { useUserStore } from "../../../store/userStore";

export interface IDataRow extends MRT_RowData {
  id: number;
  name: string;
  state: number;
  createdAt: Date;
  updatedAt: Date;
  createdBy?:  any;
  user?:       any;
}

interface TypeComponentsTableProps {
  setIdEdit: (value: number) => void;
}

const CustomTable = ({ setIdEdit }: TypeComponentsTableProps) => {
  const token = useUserStore((state) => state.token);
  const queryClient = useQueryClient();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { data, isLoading, isError } = useQuery({
    queryKey: ["role"],
    queryFn: () => GetRoleAll(token),
    retry: 2
  });

  const columns = useMemo<MRT_ColumnDef<IDataRow>[]>(
    () => [
      {
        accessorKey: "id",
        header: "#",
        size: 50,
        Cell: ({ cell }) => <Box sx={{ textAlign: "center" }}>{cell.getValue() as React.ReactNode}</Box>
      },
      {
        accessorKey: "name",
        header: "Nombre",
        size: 220,
        Cell: ({ cell }) => <Box sx={{ textAlign: "center" }}>{cell.getValue() as React.ReactNode}</Box>
      },
      {
        accessorKey: "state",
        header: "Estado",
        size: 100,
        Cell: ({ cell }) => (
          <Box sx={{ textAlign: "center" }}>
            {cell.getValue() ?
              <Chip label="Activo" color="primary" size="small" /> :
              <Chip label="Inactivo" color="error" size="small" />
            }
          </Box>
        )
      },
      {
        accessorKey: "actions",
        header: "Acciones",
        size: 100,
        Cell: ({ row }) => (
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <Tooltip title="Editar">
              <IconButton
                onClick={() => setIdEdit(Number(row.original.id))}
                aria-label="edit"
                size="small"
                color="secondary"
              >
                <FiEdit2 fontSize="inherit" />
              </IconButton>
            </Tooltip>
            <Tooltip title="Eliminar">
              <IconButton
                onClick={async () => {
                  if (row.original.id) {
                    await handleDataDelete(token, row.original.id);
                    queryClient.invalidateQueries({ queryKey: ["role"] });
                  }
                }}
                aria-label="delete"
                size="small"
                color="error"
              >
                <FiTrash2 fontSize="inherit" />
              </IconButton>
            </Tooltip>
          </Box>
        )
      }
    ],
    [queryClient, setIdEdit, token]
  );

  const table = useMaterialReactTable<IDataRow>({
    columns: columns,
    data: data || [],
    localization: MRT_Localization_ES,
    initialState: {
      pagination: { pageSize: 5, pageIndex: 0 }
    },
    enableDensityToggle: false,
    enableFullScreenToggle: false
  });

  if (isLoading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
        <CircularProgress />
      </Box>
    );
  }

  if (isError) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
        <Typography color="error">Error al cargar datos</Typography>
      </Box>
    );
  }

  return <MaterialReactTable table={table} />;
};

export { CustomTable };
