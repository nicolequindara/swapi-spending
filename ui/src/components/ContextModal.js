import React from "react";
import { Modal } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { PieChart } from '@mui/x-charts/PieChart';

function ContextModal(props) {
  const { film, starships } = props;

  if (!film) {
    return null;
  }

  const data = starships
    .filter((s) => film.starshipIds.includes(s.id))
    .map(s => ({
        id: s.id,
        value: s.cost,
        label: s.name
    }))

  return (
    <Modal
      open={!!film}
      onClose={props.onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <div class="context-modal">
        <span style={{ "font-size": "x-large", "font-weight": "bold" }}>{film.title}</span>
        <span style={{"font-style": "italic"}}>{film.release_date}</span>
        <div className="table-container">
          <PieChart
            series={[{
                data,
                highlightScope: { faded: 'global', highlighted: 'item' },
                faded: { innerRadius: 30, additionalRadius: -30, color: 'gray' },
            }]}
            
            width={1000}
            height={500}
          />
        </div>
      </div>
    </Modal>
  );
}

function Table(props) {
  const { film, starships } = props;

  if (!film) {
    return null;
  }

  const rows = starships.filter((s) => film.starshipIds.includes(s.id));
  const columns = [
    { field: "id", headerName: "ID", width: 90 },
    {
      field: "name",
      headerName: "Starship Name",
      width: 150,
    },
    {
      field: "cost",
      headerName: "Cost in credits",
      width: 150,
    },
  ];
  return (
    <DataGrid
      rows={rows}
      columns={columns}
      initialState={{
        pagination: {
          paginationModel: {
            pageSize: 5,
          },
        },
      }}
      pageSizeOptions={[5]}
      disableRowSelectionOnClick
    />
  );
}

export default ContextModal;
