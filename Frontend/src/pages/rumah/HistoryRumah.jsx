import { React, useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import Pagination from "../../utils/Pagination";
import { historyRumahById, storageURL } from "../../services/rumah/RumahServices";

const HistoryRumah = () => {
  const { id } = useParams();
  const [nomor_rumah, setNomorRumah] = useState("");
  const [status_rumah, setStatusRumah] = useState("");
  const [penghuni_saat_ini, setPenghuniSaatIni] = useState("");
  const [status_penghuni, setStatusPenghuni] = useState("");
  const [historyRumah, setHistoryRumah] = useState([]);
  const itemsPerPage = 5;
    const [currentPage, setCurrentPage] = useState(1);

    const handlePageChange = (page) => {
        setCurrentPage(page);
    }

    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentHistory = historyRumah.slice(startIndex, endIndex);

    const fetchHistoryRumah = async () => {
      try {
        const response = await historyRumahById(id);
        const resRumah = response.rumah;
        const resHistory = response.history;
    
        // Mengatur data rumah jika ada
        if (resRumah) {
          setNomorRumah(resRumah.rumah.nomor_rumah);
          setStatusRumah(resRumah.rumah.status_rumah);
          setPenghuniSaatIni(resRumah.penghuni.nama_lengkap);
          setStatusPenghuni(resRumah.penghuni.status_penghuni);
        } else {
          // Mengatur nilai default jika resRumah null
          setNomorRumah("");
          setStatusRumah("");
          setPenghuniSaatIni("");
          setStatusPenghuni("");
        }
    
        // Menetapkan data history
        setHistoryRumah(resHistory);
        console.log(resHistory);
      } catch (error) {
        console.error("Error fetching customer data: ", error);
      }
    }
    

  useEffect(() => {
    fetchHistoryRumah();
  }, []);

  return (
    <>
      <div className="container-xxl flex-grow-1 container-p-y">
        <h4 className="fw-bold py-3 mb-4">
          <span className="text-muted fw-light">Rumah /</span> History Rumah
        </h4>
        {/* informasi */}
        <div className="card mb-4">
          <div className="card-header d-flex align-items-center justify-content-between">
            <h4 className="mb-0">Informasi Penghuni Saat Ini</h4>
            <Link to="/rumah" className="btn btn-primary">
              <i className="bx bx-arrow-back me-2"></i>
              Kembali
            </Link>
          </div>
          <div className="card-body">
            <div className="table table-borderless">
              <tbody>
                <tr>
                  <th scope="row">
                    <h5>
                      <strong>Nomor Rumah</strong>
                    </h5>
                  </th>
                  <th>
                    <h5>:</h5>
                  </th>
                  <td>
                    <h5>{nomor_rumah ? nomor_rumah : '-'}</h5>
                  </td>
                </tr>
                <tr>
                  <th scope="row">
                    <h5>
                      <strong>Status Rumah</strong>
                    </h5>
                  </th>
                  <th>
                    <h5>:</h5>
                  </th>
                  <td>
                  <h5>{status_rumah ? status_rumah : 'Tidak Dihuni'}</h5>
                  </td>
                </tr>
                <tr>
                  <th scope="row">
                    <h5>
                      <strong>Penghuni Saat Ini</strong>
                    </h5>
                  </th>
                  <th>
                    <h5>:</h5>
                  </th>
                  <td>
                  <h5>{penghuni_saat_ini ? penghuni_saat_ini : '-'}</h5>
                  </td>
                </tr>
                <tr>
                  <th scope="row">
                    <h5>
                      <strong>Status Penghuni</strong>
                    </h5>
                  </th>
                  <th>
                    <h5>:</h5>
                  </th>
                  <td>
                  <h5>{status_penghuni ? status_penghuni : '-'}</h5>
                  </td>
                </tr>
              </tbody>
            </div>
          </div>
        </div>
        {/* end informasi */}
        {/* history */}
        <div className="card mb-4">
          <div className="card-header d-flex align-items-center justify-content-between">
            <h4 className="mb-0">History Penghuni</h4>
          </div>
          <div className="card-body">
          <table className="table table-striped">
              <thead>
                <tr>
                  <th>No</th>
                  <th>Nama Penghuni</th>
                  <th>Status Penghuni</th>
                  <th>Tanggal Masuk</th>
                  <th>Tanggal Keluar</th>
                </tr>
              </thead>
              <tbody className="table-border-bottom-0">
                {currentHistory.map((item, index) => (
                    <tr>
                      <td>{(currentPage - 1) * itemsPerPage + index + 1}</td>
                      <td>
                      <strong>{item.penghuni.nama_lengkap}</strong>
                    </td>
                    <td>{item.penghuni.status_penghuni}</td>
                    <td>{item.tanggal_masuk}</td>
                    <td>{item.tanggal_keluar}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <Pagination
          currentPage={currentPage}
          totalPages={Math.ceil(historyRumah.length / itemsPerPage)}
          onPageChange={handlePageChange}
        />
        {/* end history */}
      </div>
    </>
  );
};

export default HistoryRumah;
