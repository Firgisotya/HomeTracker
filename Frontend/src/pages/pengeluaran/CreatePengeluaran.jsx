import { React, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import Select from "react-select";
import { getAllReportSummary } from "../../services/report_summary/ReportSummaryServices";
import { createPengeluaran } from "../../services/pengeluaran/PengeluaranServices";

const CreatePengeluaran = () => {
  const navigate = useNavigate();

  const [reportOptions, setReportOptions] = useState([]);
  const [selectedReport, setSelectedReport] = useState(null);
  const [jenis_pengeluaran, setJenisPengeluaran] = useState("");
  const [jumlah_pengeluaran, setJumlahPengeluaran] = useState("");
  
  const fetchReport = async () => {
    try {
      const response = await getAllReportSummary();
      const data = response.map((item) => ({
        value: item.id,
        label: `${item.bulan} ${item.tahun}`
      }));
      setReportOptions(data);
    } catch (error) {
      console.log(error);
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      report_id: selectedReport.value,
      jenis_pengeluaran: jenis_pengeluaran,
      jumlah_pengeluaran: jumlah_pengeluaran
    };

    try {
      const response = await createPengeluaran(data);
      console.log(response);
      Swal.fire({
        icon: "success",
        title: "Berhasil",
        text: "Pengeluaran berhasil ditambahkan",
      });
      navigate("/pengeluaran");
    } catch (error) {
      console.log(error);
      Swal.fire({
        icon: "error",
        title: "Gagal",
        text: "Pengeluaran gagal ditambahkan",
      });
    }
  }

  useEffect(() => {
    fetchReport();
  }, []);

  return (
    <>
      <div className="container-xxl flex-grow-1 container-p-y">
        <h4 className="fw-bold py-3 mb-4">
          <span className="text-muted fw-light">Pengeluaran/</span> Tambah Pengeluaran
        </h4>
        {/* Basic Layout & Basic with Icons */}
        <div className="row">
          {/* Basic Layout */}
          <div className="col-xxl">
            <div className="card mb-4">
              <div className="card-header d-flex align-items-center justify-content-between">
                <h5 className="mb-0">Form Tambah</h5>
                <Link to="/pengeluaran" className="btn btn-primary">
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
                      Bulan & Tahun
                    </label>
                    <div className="col-sm-10">
                    <Select
                        options={reportOptions}
                        value={selectedReport}
                        onChange={setSelectedReport}
                      />
                    </div>
                  </div>
                  <div className="row mb-3">
                    <label className="col-sm-2 col-form-label">
                      Jenis Pengeluaran
                    </label>
                    <div className="col-sm-10">
                      <select
                        className="form-select"
                        value={jenis_pengeluaran}
                        onChange={(e) => setJenisPengeluaran(e.target.value)}
                      >
                        <option value="">Pilih Jenis Pengeluaran</option>
                        <option value="Gaji Satpam">Gaji Satpam</option>
                        <option value="Listrik Pos Satpam">Listrik Pos Satpam</option>
                      </select>
                    </div>
                  </div>
                  <div className="row mb-3">
                    <label
                      className="col-sm-2 col-form-label"
                    >
                      Jumlah Pengeluaran
                    </label>
                    <div className="col-sm-10">
                      <input
                        type="number"
                        className="form-control"
                        placeholder="Jumlah Pengeluaran"
                        value={jumlah_pengeluaran}
                        onChange={(e) => setJumlahPengeluaran(e.target.value)}
                      />
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

export default CreatePengeluaran