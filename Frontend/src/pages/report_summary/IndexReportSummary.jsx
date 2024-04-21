import { React, useState, useEffect } from "react";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { Link } from "react-router-dom";
import Pagination from "../../utils/Pagination";
import { getAllReportSummary } from "../../services/report_summary/ReportSummaryServices";

const IndexReportSummary = () => {
    const [report, setReport] = useState([]);
    const itemsPerPage = 5;
    const [currentPage, setCurrentPage] = useState(1);

    const handlePageChange = (page) => {
        setCurrentPage(page);
    }

    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentReport = report ? report.slice(startIndex, endIndex) : [];

    const fetchReport = async () => {
        try {
            const response = await getAllReportSummary();
            if (response) {
                setReport(response);
            }
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        fetchReport();
    }, []);

  return (
    <div className="container-xxl flex-grow-1 container-p-y">
      <h4 className="fw-bold py-3 mb-4">
        <span className="text-muted fw-light">Report /</span>
      </h4>
      {/* Striped Rows */}
      <div className="card mb-3">
        <div className="table-responsive text-nowrap">
          <table className="table table-striped">
            <thead>
              <tr>
                <th>No</th>
                <th>Bulan</th>
                <th>Tahun</th>
                <th>Pemasukan</th>
                <th>Pengeluaran</th>
              </tr>
            </thead>
            <tbody className="table-border-bottom-0">
              {currentReport.map((item, index) => (
                <tr>
                  <td>{(currentPage - 1) * itemsPerPage + index + 1}</td>
                  <td>{item.bulan}</td>
                  <td>{item.tahun}</td>
                  <td>{item.pemasukan ? `Rp ${item.pemasukan}` : '-'}</td>
                  <td>{item.pengeluaran ? `Rp ${item.pengeluaran}` : '-'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {/*/ Striped Rows */}
      <Pagination
        currentPage={currentPage}
        totalPages={Math.ceil(report.length / itemsPerPage)}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default IndexReportSummary;
