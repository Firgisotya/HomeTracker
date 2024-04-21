import { React, useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import Pagination from "../../utils/Pagination";
import { getRumahById, storageURL } from "../../services/rumah/RumahServices";

const DetailRumah = () => {
  const { id } = useParams();

  const [nomor_rumah, setNomorRumah] = useState("");
  const [status_rumah, setStatusRumah] = useState("");
  const [penghuni_saat_ini, setPenghuniSaatIni] = useState("");
  const [jenis_kelamin, setJenisKelamin] = useState("");
  const [no_telepon, setNoTelepon] = useState("");
  const [status_penghuni, setStatusPenghuni] = useState("");
  const [status_pernikahan, setStatusPernikahan] = useState("");
  const [foto_ktp, setFotoKtp] = useState("");
  const [tanggal_masuk, setTanggalMasuk] = useState("");
  const [tanggal_keluar, setTanggalKeluar] = useState("");
  const [history, setHistory] = useState([]);

  const fetchDetailRumah = async () => {
    try {
      const response = await getRumahById(id);
      const detail = response.detail;
      const history = response.history;
      console.log(history);
      setNomorRumah(detail.rumah.nomor_rumah);
      setStatusRumah(detail.rumah.status_rumah);
      setPenghuniSaatIni(detail.penghuni.nama_lengkap);
      setJenisKelamin(detail.penghuni.jenis_kelamin);
      setNoTelepon(detail.penghuni.no_telepon);
      setStatusPenghuni(detail.penghuni.status_penghuni);
      setStatusPernikahan(detail.penghuni.status_pernikahan);
      setFotoKtp(detail.penghuni.foto_ktp);
      setTanggalMasuk(detail.tanggal_masuk);
      setTanggalKeluar(detail.tanggal_keluar);
      setHistory(history);
    } catch (error) {
      console.error("Error fetching customer data: ", error);
    }
  };

  const itemsPerPage = 5;
  const [currentPage, setCurrentPage] = useState(1);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentHistory = history.slice(startIndex, endIndex);

  useEffect(() => {
    fetchDetailRumah();
  }, []);

  return (
    <>
      <div className="container-xxl flex-grow-1 container-p-y">
        <h4 className="fw-bold py-3 mb-4">
          <span className="text-muted fw-light">Rumah /</span> Detail Rumah
        </h4>
        <div className="card mb-4">
          <div className="card-header d-flex align-items-center justify-content-between">
            <h4 className="mb-0">Detail Rumah</h4>
            <Link to="/rumah" className="btn btn-primary">
              <i className="bx bx-arrow-back me-2"></i>
              Kembali
            </Link>
          </div>
          <div className="card-body">
            <div className="row">
              {/* Informasi Rumah */}
              <div className="col">
                <h5>
                  <strong>Informasi Rumah</strong>
                </h5>
                <div className="table table-borderless">
                  <tbody>
                    <tr>
                      <th scope="row">Nomor Rumah</th>
                      <td>{nomor_rumah}</td>
                    </tr>
                    <tr>
                      <th scope="row">Status Rumah</th>
                      <td>{status_rumah}</td>
                    </tr>
                    <tr>
                      <th scope="row">Tanggal Masuk</th>
                      <td>{tanggal_masuk}</td>
                    </tr>
                    <tr>
                      <th scope="row">Tanggal Keluar</th>
                      <td>{tanggal_keluar ? tanggal_keluar : '-'}</td>
                    </tr>
                  </tbody>
                </div>
              </div>

              {/* Informasi Penghuni */}
              <div className="col">
                <h5>
                  <strong>Informasi Penghuni</strong>
                </h5>
                <div className="table table-borderless">
                  <tbody>
                    <tr>
                      <th scope="row">Penghuni Saat Ini</th>
                      <td>{penghuni_saat_ini}</td>
                    </tr>
                    <tr>
                      <th scope="row">Jenis Kelamin</th>
                      <td>{jenis_kelamin}</td>
                    </tr>
                    <tr>
                      <th scope="row">Nomor Telepon</th>
                      <td>{no_telepon}</td>
                    </tr>
                    <tr>
                      <th scope="row">Status Penghuni</th>
                      <td>{status_penghuni}</td>
                    </tr>
                    <tr>
                      <th scope="row">Status Pernikahan</th>
                      <td>{status_pernikahan}</td>
                    </tr>
                  </tbody>
                </div>
              </div>

              {/* Foto KTP */}
              <div className="col-4">
                <h5>
                  <strong>Foto KTP</strong>
                </h5>
                {foto_ktp ? (
                  <img
                  src={`${storageURL}/${foto_ktp}`}
                  alt=""
                  className="img-fluid rounded-3"
                  style={{ width: 300 }}
                />
                ) : (
                  <p>Foto KTP tidak tersedia</p>  
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="card mb-4">
          <div className="card-header d-flex align-items-center justify-content-between">
            <h4 className="mb-0">History Pembayaran</h4>
          </div>
          <div className="card-body">
            <table className="table table-striped">
              <thead>
                <tr>
                  <th>No</th>
                  <th>Jenis Pembayaran</th>
                  <th>Jumlah Pembayaran</th>
                  <th>Tanggal Pembayaran</th>
                  <th>Periode Pembayaran</th>
                  <th>Status Pembayaran</th>
                </tr>
              </thead>
              <tbody className="table-border-bottom-0">
                {currentHistory.map((item, index) => (
                  <tr>
                    <td>{(currentPage - 1) * itemsPerPage + index + 1}</td>
                    <td>
                      <strong>
                        {item.jenis_pembayaran ? item.jenis_pembayaran : "-"}
                      </strong>
                    </td>
                    <td>
                      {item.jumlah_pembayaran
                        ? `Rp ${item.jumlah_pembayaran}`
                        : `Rp -`}
                    </td>
                    <td>
                      {item.tanggal_pembayaran ? item.tanggal_pembayaran : `-`}
                    </td>
                    <td>
                      {item.periode_pembayaran ? item.periode_pembayaran : `-`}
                    </td>
                    <td>
                      {item.status_pembayaran ? item.status_pembayaran : `-`}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <Pagination
          currentPage={currentPage}
          totalPages={Math.ceil(history.length / itemsPerPage)}
          onPageChange={handlePageChange}
        />
      </div>
    </>
  );
};

export default DetailRumah;
