import { React, useState, useEffect } from "react";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { Link } from "react-router-dom";
import { deletePenghuni, getAllPenghuni, storageURL } from "../../services/penghuni/PenghuniServices";
import Pagination from "../../utils/Pagination";

const IndexPenghuni = () => {
  const [penghuni, setPenghuni] = useState([]);
  const itemsPerPage = 5;
  const [currentPage, setCurrentPage] = useState(1);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentPenghuni = penghuni.slice(startIndex, endIndex);

//   get data
  const fetchPenghuni = async () => {
    try {
        const response = await getAllPenghuni();
        setPenghuni(response)
    } catch (error) {
        console.error("Error fetching customer data: ", error);
    }
  }

  const handleDelete = async (id) => {
    try {
      Swal.fire({
        title: "Apakah Anda Yakin?",
        text: "Penghuni akan dihapus secara perman?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Ya, Hapus!",
        cancelButtonText: "Batal",
      }).then(async (result) => {
        if (result.isConfirmed) {
          const response = await deletePenghuni(id);
          console.log(response);
          const MySwal = withReactContent(Swal);
          MySwal.fire({
            icon: "success",
            title: "Berhasil",
            text: "Penghuni berhasil dihapus",
          });
          fetchPenghuni();
        }
      });
    } catch (error) {
      
    }
  }

  useEffect(() => {
    fetchPenghuni()
  }, []);

  return (
    <>
      <div className="container-xxl flex-grow-1 container-p-y">
        <h4 className="fw-bold py-3 mb-4">
          <span className="text-muted fw-light">Penghuni /</span>
        </h4>
        {/* Striped Rows */}
        <div className="card mb-3">
          <Link
            to={"/penghuni/create"}
            className="btn btn-primary my-3 mx-2"
            style={{ width: 200 }}
          >
            <i className="bx bx-plus"></i>
            Tambah Penghuni
          </Link>
          <div className="table-responsive text-nowrap">
            <table className="table table-striped">
              <thead>
                <tr>
                  <th>Nama Lengkap</th>
                  <th>Jenis Kelamin</th>
                  <th>No Telepon</th>
                  <th>Status Penghuni</th>
                  <th>Status Pernikahan</th>
                  <th>Foto KTP</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody className="table-border-bottom-0">
                {currentPenghuni.map((item, index) => (
                    <tr>
                    <td>
                      <strong>{item.nama_lengkap}</strong>
                    </td>
                    <td>{item.jenis_kelamin}</td>
                    <td>{item.no_telepon}</td>
                    <td>{item.status_penghuni}</td>
                    <td>{item.status_pernikahan}</td>
                    <td>
                        <img src={`${storageURL}/`+`${item.foto_ktp}`} style={{ width: 100 }} />
                    </td>
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
                          <Link to={`/penghuni/edit/${item.id}`} className="dropdown-item">
                            <i className="bx bx-edit-alt me-1" /> Edit
                          </Link>
                          <Link to={`/penghuni/detail/${item.id}`} className="dropdown-item">
                            <i className="bx bx-show me-1" /> Detail
                          </Link>
                          <button onClick={() => handleDelete(item.id)} className="dropdown-item">
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
          totalPages={Math.ceil(penghuni.length / itemsPerPage)}
          onPageChange={handlePageChange}
        />
      </div>
    </>
  );
};

export default IndexPenghuni;
