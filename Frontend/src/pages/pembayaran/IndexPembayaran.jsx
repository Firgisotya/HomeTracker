import { React, useState, useEffect } from "react";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { Link } from "react-router-dom";
import Pagination from "../../utils/Pagination";
import { deletePembayaran, getAllPembayaran } from "../../services/pembayaran/PembayaranServices";

const IndexPembayaran = () => {
    const [pembayaran, setPembayaran] = useState([]);
    const itemsPerPage = 5;
    const [currentPage, setCurrentPage] = useState(1);

    const handlePageChange = (page) => {
        setCurrentPage(page);
    }

    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentPembayaran = pembayaran ? pembayaran.slice(startIndex, endIndex) : [];

    const fetchPembayaran = async () => {
        try {
            const response = await getAllPembayaran();
            if (response) {
                setPembayaran(response);
            }
        } catch (error) {
            console.log(error);
        }
    }

    const handleDelete = async (id) => {
        try {
            Swal.fire({
                title: "Apakah Anda Yakin?",
                text: "Pembayaran akan dihapus secara perman?",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Ya, Hapus!",
                cancelButtonText: "Batal",
            }).then(async (result) => {
                if (result.isConfirmed) {
                    const response = await deletePembayaran(id);
                    console.log(response);
                    const MySwal = withReactContent(Swal);
                    MySwal.fire({
                        icon: "success",
                        title: "Berhasil",
                        text: "Pembayaran berhasil dihapus",
                    });
                    fetchPembayaran();
                }
            });
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        fetchPembayaran();
    }, [])

  return (
    <>
      <div className="container-xxl flex-grow-1 container-p-y">
        <h4 className="fw-bold py-3 mb-4">
          <span className="text-muted fw-light">Pembayaran /</span>
        </h4>
        {/* Striped Rows */}
        <div className="card mb-3">
          <Link
            to={"/pembayaran/create"}
            className="btn btn-primary my-3 mx-2"
            style={{ width: 200 }}
          >
            <i className="bx bx-plus"></i>
            Tambah Pembayaran
          </Link>
          <div className="table-responsive text-nowrap">
            <table className="table table-striped">
              <thead>
                <tr>
                    <th>No</th>
                  <th>Nama Penghuni</th>
                  <th>Jenis Pembayaran</th>
                  <th>Jumlah Pembayaran</th>
                  <th>Tanggal Pembayaran</th>
                  <th>Periode Pembayaran</th>
                  <th>Status Pembayaran</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody className="table-border-bottom-0">
              {currentPembayaran.map((item, index) => (
                  <tr>
                    <td>{(currentPage - 1) * itemsPerPage + index + 1}</td>
                    <td>
                      <strong>{item.nama_lengkap}</strong>
                    </td>
                    <td>{item.jenis_pembayaran}</td>
                    <td>Rp {item.jumlah_pembayaran}</td>
                    <td>{item.tanggal_pembayaran}</td>
                    <td>{item.periode_pembayaran}</td>
                    <td>{item.status_pembayaran}</td>
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
          totalPages={Math.ceil(pembayaran.length / itemsPerPage)}
          onPageChange={handlePageChange}
        />
      </div>
    </>
  );
};

export default IndexPembayaran;
