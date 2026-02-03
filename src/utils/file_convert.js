import * as XLSX from "xlsx";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

export const exportToExcel = (filteredData, columns) => {
  const data = filteredData.map(
    (item) => {
      const obj = {};
      columns.forEach (
        (col) => {
          obj[col.title] = item[col.dataIndex];
        }
      );
      return obj;
    }
  );

  const workSheet = XLSX.utils.json_to_sheet(data);
  const workBook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workBook, workSheet, "Products");

  XLSX.writeFile(workBook, "products.xlsx");
}

export const exportToPdf = (filteredData, columns) => {
  const doc = new jsPDF();
  autoTable(
    doc,
    {
      head: [columns.map(col => col.title)],
      body: filteredData.map(item => columns.map(col => item[col.dataIndex]))
    }
  );

  doc.save("Products.pdf");
}