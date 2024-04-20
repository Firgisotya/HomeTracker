import { React, useState, useEffect } from "react";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { Link } from "react-router-dom";
import Pagination from "../../utils/Pagination";
import { deletePengeluaran, getAllPengeluaran } from "../../services/pengeluaran/PengeluaranServices";

const IndexPengeluaran = () => {
    const [pengeluaran, setPengeluaran] = useState([]);
    const itemsPerPage = 5;
    const [currentPage, setCurrentPage] = useState(1);

    const handlePageChange = (page) => {
        setCurrentPage(page);
    }

    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentPengeluaran = pengeluaran ? pengeluaran.slice(startIndex, endIndex) : [];

    const fetchPengeluaran = async () => {
        try {
            const response = await getAllPengeluaran();
            if (response) {
                setPengeluaran(response);
            }
        } catch (error) {
            console.log(error);
        }
    }

    const handleDelete = async (id) => {
        try {
            Swal.fire({
                title: "Apakah Anda Yakin?",
                text: "Pengeluaran akan dihapus secara perman?",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Ya, Hapus!",
                cancelButtonText: "Batal",
            }).then(async (result) => {
                if (result.isConfirmed) {
                    const response = await deletePengeluaran(id);
                    console.log(response);
                    const MySwal = withReactContent(Swal);
                    MySwal.fire({
                        icon: "success",
                        title: "Berhasil",
                        text: "Pengeluaran berhasil dihapus",
                    });
                    fetchPengeluaran();
                }
            });
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        fetchPengeluaran();
    }, []);

  return (
    <>
      <div className="container-xxl flex-grow-1 container-p-y">
        <h4 className="fw-bold py-3 mb-4">
          <span className="text-muted fw-light">Pengeluaran /</span>
        </h4>
        {/* Striped Rows */}
        <div className="card mb-3">
          <Link
            to={"/pengeluaran/create"}
            className="btn btn-primary my-3 mx-2"
            style={{ width: 200 }}
          >
            <i className="bx bx-plus"></i>
            Tambah Pengeluaran
          </Link>
          <div className="table-responsive text-nowrap">
            <table className="table table-striped">
              <thead>
                <tr>
                  <th>No</th>
                  <th>Bulan</th>
                  <th>Tahun</th>
                  <th>Jenis Pengeluaran</th>
                  <th>jumlah Pengeluaran</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody className="table-border-bottom-0">
                {currentPengeluaran.map((item, index) => (
                  <tr>
                    <td>{(currentPage - 1) * itemsPerPage + index + 1}</td>
                    <td>{item.report?.bulan}</td>
                    <td>{item.report?.tahun}</td>
                    <td>{item.jenis_pengeluaran}</td>
                    <td>{item.jumlah_pengeluaran}</td>
                    <td>
                      <div className="dropdown">
                        <button
                          type="button"
                          className="btn p-0 dropdown-toggle hide-arrow"
                          data-bs-toggle="dropdown"
                        >
                          <i className="bx bx-dots-vertical-rounded" />
                        </button>
                        <div className="dropdown-menu">
                          {/* <Link
                            to={`/penghuni_rumah/edit/${item.id}`}
                            className="dropdown-item"
                          >
                            <i className="bx bx-edit-alt me-1" /> Edit
                          </Link>
                          <Link
                            to={`/penghuni_rumah/detail/${item.id}`}
                            className="dropdown-item"
                          >
                            <i className="bx bx-show me-1" /> Detail
                          </Link> */}
                          <button
                            onClick={() => handleDelete(item.id)}
                            className="dropdown-item"
                          >
                            <i className="bx bx-trash me-1" /> Delete
                          </button>
                        </div>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        {/*/ Striped Rows */}
        <Pagination
          currentPage={currentPage}
          totalPages={Math.ceil(pengeluaran.length / itemsPerPage)}
          onPageChange={handlePageChange}
        />
      </div>
    </>
  );
};

export default IndexPengeluaran;
