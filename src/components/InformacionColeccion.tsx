import MaterialTable from "@material-table/core";
import type { Column } from "@material-table/core";
import { ExportCsv, ExportPdf } from "@material-table/exporters"; 
import { Typography, Box } from "@mui/material";

type Item = {
  nombre: string;
  marca: string;
  tipo: string;
  precio: number;
};

interface Props {
  datos: Item[];
}

export default function InformeColeccion({ datos }: Props) {
  const columns: Column<Item>[] = [
    { title: "Nombre", field: "nombre", filtering: false },
    { title: "Marca", field: "marca" },   // filtrable
    { title: "Tipo", field: "tipo" },     // filtrable
    { title: "Precio", field: "precio", type: "numeric", filtering: false },
  ];

  const totalPrecio = datos.reduce(
    (acc, item) => acc + Number(item.precio),
    0
  );

  return (
    <Box>
      <MaterialTable
        title="Informe colección"
        columns={columns}
        data={datos}
        options={{
          filtering: true,
          columnsButton: true,
          exportAllData: true,
          headerStyle: {
            backgroundColor: "#1976d2",
            color: "#fff",
          },
          rowStyle: {
            backgroundColor: "#f5f5f5",
          },
          // 2. CORRECCIÓN: exportMenu debe ir DENTRO de options
          exportMenu: [
            {
              label: "Exportar a CSV",
              exportFunc: (cols, datas) =>
                ExportCsv(cols, datas, "informe_coleccion"),
            },
            {
              label: "Exportar a PDF",
              exportFunc: (cols, datas) =>
                ExportPdf(cols, datas, "informe_coleccion"),
            },
          ],
        }}
        localization={{
          toolbar: {
            searchTooltip: "Buscar",
            searchPlaceholder: "Buscar",
          },
        }}
      />

      <Typography variant="subtitle1" sx={{ mt: 2 }}>
        Total de precios de la colección: {totalPrecio.toFixed(2)} €
      </Typography>
    </Box>
  );
}