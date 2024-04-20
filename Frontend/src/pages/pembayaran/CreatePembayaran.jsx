import { React, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import Select from "react-select";
import { createPembayaran } from "../../services/pembayaran/PembayaranServices";
import { getAllPenghuni } from "../../services/penghuni/PenghuniServices";

const CreatePembayaran = () => {
    const navigate = useNavigate();

    const [penghuni, setPenghuni] = useState([]);
    const [jenis_pembayaran, setJenisPembayaran] = useState("");
    const [jumlah_pembayaran, setJumlahPembayaran] = useState("");
    const [tanggal_pembayaran, setTanggalPembayaran] = useState("");
    const [periode_pembayaran, setPeriodePembayaran] = useState("");
    const [status_pembayaran, setStatusPembayaran] = useState("");

    const handleSelectPenghuni = async (selectPenghuni) => {
        setPenghuni(selectPenghuni);
    }

    const fetchPenghuni = async () => {
        try {
            const response = await getAllPenghuni();
            const data = response.map((item) => {
                return {
                    value: item.id,
                    label: item.nama_lengkap
                }
            });
            setPenghuni(data);
        } catch (error) {
            console.log(error);
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = {
            penghuni_id: penghuni.value,
            jenis_pembayaran: jenis_pembayaran,
            jumlah_pembayaran: jumlah_pembayaran,
            tanggal_pembayaran: tanggal_pembayaran,
            periode_pembayaran: periode_pembayaran,
            status_pembayaran: status_pembayaran
        };

        try {
            const response = await createPembayaran(data);
            console.log(response);
            Swal.fire({
                icon: "success",
                title: "Berhasil",
                text: "Pembayaran berhasil ditambahkan",
            });
            navigate("/pembayaran");
        } catch (error) {
            console.log(error);
            Swal.fire({
                icon: "error",
                title: "Gagal",
                text: "Pembayaran gagal ditambahkan",
            });
        }
        
    }

    useEffect(() => {
        fetchPenghuni();
    }, [])
    
  return (
    <>
      <div className="container-xxl flex-grow-1 container-p-y">
        <h4 className="fw-bold py-3 mb-4">
          <span className="text-muted fw-light">Pembayaran/</span> Tambah Pembayaran
        </h4>
        {/* Basic Layout & Basic with Icons */}
        <div className="row">
          {/* Basic Layout */}
          <div className="col-xxl">
            <div className="card mb-4">
              <div className="card-header d-flex align-items-center justify-content-between">
                <h5 className="mb-0">Form Tambah</h5>
                <Link to="/pembayaran" className="btn btn-primary">
                  <i className="bx bx-arrow-back me-2"></i>
                  Kembali
                </Link>
              </div>
              <div className="card-body">
                <form>
                  <div className="row mb-3">
                    <label
                      className="col-sm-2 col-form-label"
                    >
                      Nama Penghuni
                    </label>
                    <div className="col-sm-10">
                    <Select options={penghuni} onChange={handleSelectPenghuni} />
                    </div>
                  </div>
                  <div className="row mb-3">
                    <label className="col-sm-2 col-form-label">
                      Jenis Pembayaran
                    </label>
                    <div className="col-sm-10">
                      <select
                        className="form-select"
                        value={jenis_pembayaran}
                        onChange={(e) => setJenisPembayaran(e.target.value)}
                      >
                        <option value="">Pilih Jenis Pembayaran</option>
                        <option value="Iuran Kebersihan">Iuran Kebersihan</option>
                        <option value="Iuran Keamanan">Iuran Keamanan</option>
                      </select>
                    </div>
                  </div>
                  <div className="row mb-3">
                    <label
                      className="col-sm-2 col-form-label"
                    >
                      Jumlah Pembayaran
                    </label>
                    <div className="col-sm-10">
                      <input
                        type="number"
                        className="form-control"
                        placeholder="Jumlah Pembayaran"
                        value={jumlah_pembayaran}
                        onChange={(e) => setJumlahPembayaran(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="row mb-3">
                    <label
                      className="col-sm-2 col-form-label"
                    >
                      Tanggal Pembayaran
                    </label>
                    <div className="col-sm-10">
                      <input
                        type="date"
                        className="form-control"
                        placeholder="Tanggal Pembayaran"
                        value={tanggal_pembayaran}
                        onChange={(e) => setTanggalPembayaran(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="row mb-3">
                    <label className="col-sm-2 col-form-label">
                      Periode Pembayaran
                    </label>
                    <div className="col-sm-10">
                      <select
                        className="form-select"
                        value={periode_pembayaran}
                        onChange={(e) => setPeriodePembayaran(e.target.value)}
                      >
                        <option value="">Pilih Periode Pembayaran</option>
                        <option value="Bulan">Bulan</option>
                        <option value="Tahun">Tahun</option>
                      </select>
                    </div>
                  </div>
                  <div className="row mb-3">
                    <label className="col-sm-2 col-form-label">
                      Status Pembayaran
                    </label>
                    <div className="col-sm-10">
                      <select
                        className="form-select"
                        value={status_pembayaran}
                        onChange={(e) => setStatusPembayaran(e.target.value)}
                      >
                        <option value="">Pilih Status Pembayaran</option>
                        <option value="Lunas">Lunas</option>
                        <option value="Belum Lunas">Belum Lunas</option>
                      </select>
                    </div>
                  </div>
                  <div className="row justify-content-end">
                    <div className="col-sm-10">
                      <button type="submit" onClick={handleSubmit} className="btn btn-primary">
                        Simpan
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default CreatePembayaran