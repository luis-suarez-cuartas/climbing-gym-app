import React from "react";
import styled from "styled-components";

function TrainingDetailTable({ routes }) {
  return (
    <TableContainer>
      <TableHeader>
        <span>Nombre</span>
        <span>Caídas (Fells)</span>
        <span>Completada</span>
        <span>Tiempo (s)</span>
      </TableHeader>
      {routes.map((route, idx) => (
        <TableRow key={idx}>
          <span>{route.route_name}</span>
          <span>{route.fells}</span>
          <span>{route.completed ? "Sí" : "No"}</span>
          <span>{route.time_taken}</span>
        </TableRow>
      ))}
    </TableContainer>
  );
}

const TableContainer = styled.div`
  width: 100%;
  margin-top: 20px;
  background-color: #f9f9f9;
  border-radius: 10px;
  padding: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const TableHeader = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  background-color: #FF6633;
  padding: 10px;
  font-weight: bold;
`;

const TableRow = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  padding: 10px;
  border-bottom: 1px solid #FF6633;

  &:last-child {
    border-bottom: none;
  }
`;

export default TrainingDetailTable;
