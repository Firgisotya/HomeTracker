import { React, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import Select from "react-select";
import { getAllPenghuni } from "../../services/penghuni/PenghuniServices";
import { getAllRumah } from "../../services/rumah/RumahServices";
import { createPenghuniRumah } from "../../services/penghuni_rumah/PenghuniRumahServices";

const CreatePenghuniRumah = () => {
  const navigate = useNavigate();

  const [penghuni, setPenghuni] = useState([]);
  const [rumah, setRumah] = useState([]);
  const [tanggalMasuk, setTanggalMasuk] = useState("");
  const [tanggalKeluar, setTanggalKeluar] = useState("");

  const handleSelectPenghuni = async (selectPenghuni) => {
    setPenghuni(selectPenghuni);
  }

  const handleSelectRumah = async (selectRumah) => {
    setRumah(selectRumah);
  }

  const fetchPenghuni = async () => {
    try {
      const response = await getAllPenghuni()
      const data = response.map((item) => {
        return {
          value: item.id,
          label: item.nama_lengkap
        }
      })
      setPenghuni(data)
    } catch (error) {
      console.log(error)
    }
  }

  const fetchRumah = async () => {
    try {
      const response = await getAllRumah()
      const data = response.map((item) => {
        return {
          value: item.id,
          label: item.nomor_rumah
        }
      })
      setRumah(data)
    } catch (error) {
      console.log(error)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      penghuni_id: penghuni.value,
      rumah_id: rumah.value,
      tanggal_masuk: tanggalMasuk,
      tanggal_keluar: tanggalKeluar
    }

    try {
      const response = await createPenghuniRumah(data);
      Swal.fire({
        icon: 'success',
        title: 'Success',
        text: 'Data berhasil disimpan'
      })
      navigate('/penghuni_rumah')
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Data gagal disimpan'
      })
    }
  }

  useEffect(() => {
    fetchPenghuni();
    fetchRumah();
  }, [])

  return (
    <>
      <div className="container-xxl flex-grow-1 container-p-y">
        <h4 className="fw-bold py-3 mb-4">
          <span className="text-muted fw-light">PenghuniRumah/</span> Tambah Penghuni Rumah
        </h4>
        {/* Basic Layout & Basic with Icons */}
        <div className="row">
          {/* Basic Layout */}
          <div className="col-xxl">
            <div className="card mb-4">
              <div className="card-header d-flex align-items-center justify-content-between">
                <h5 className="mb-0">Form Tambah</h5>
                <Link to="/penghuni_rumah" className="btn btn-primary">
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
                    <label
                      className="col-sm-2 col-form-label"
                    >
                      Nomor Rumah
                    </label>
                    <div className="col-sm-10">
                      <Select options={rumah} onChange={handleSelectRumah} />
                    </div>
                  </div>
                  <div className="row mb-3">
                    <label
                      className="col-sm-2 col-form-label"
                    >
                      Tanggal Masuk
                    </label>
                    <div className="col-sm-10">
                      <input type="date" className="form-control" value={tanggalMasuk} onChange={(e) => setTanggalMasuk(e.target.value)} />
                    </div>
                  </div>
                  <div className="row mb-3">
                    <label
                      className="col-sm-2 col-form-label"
                    >
                      Tanggal Keluar
                    </label>
                    <div className="col-sm-10">
                      <input type="date" className="form-control" value={tanggalKeluar} onChange={(e) => setTanggalKeluar(e.target.value)} />
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

export default CreatePenghuniRumah