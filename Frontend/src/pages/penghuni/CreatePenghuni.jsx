import { React, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { createPenghuni } from "../../services/penghuni/PenghuniServices";

const CreatePenghuni = () => {
  const navigate = useNavigate();

  const [nama_lengkap, setNamaLengkap] = useState("");
  const [jenis_kelamin, setJenisKelamin] = useState("");
  const [no_telepon, setNoTelepon] = useState("");
  const [status_penghuni, setStatusPenghuni] = useState("");
  const [status_pernikahan, setStatusPernikahan] = useState("");
  const [foto_ktp, setFotoKTP] = useState(null);
  const [previewKTP, setPreviewKTP] = useState(null);

  const handleKTP = (e) => {
    const file = e.target.files[0];
    const ALLOWED_TYPES = ["image/png", "image/jpeg", "image/jpg"];
    if (file && ALLOWED_TYPES.includes(file.type)) {
      let reader = new FileReader();
      reader.onloadend = () => {
        setPreviewKTP(reader.result);
      };
      reader.readAsDataURL(file);
      setFotoKTP(file);
    } else {
      setPreviewKTP(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();

    formData.append("nama_lengkap", nama_lengkap);
    formData.append("jenis_kelamin", jenis_kelamin);
    formData.append("no_telepon", no_telepon);
    formData.append("status_penghuni", status_penghuni);
    formData.append("status_pernikahan", status_pernikahan);
    formData.append("foto_ktp", foto_ktp);

    console.log(formData);

    try {
      const response = await createPenghuni(formData);
      console.log(response);
      Swal.fire({
        icon: "success",
        title: "Berhasil",
        text: "Penghuni berhasil ditambahkan",
      });
      navigate("/penghuni");
    } catch (error) {
      console.error("Error adding penghuni: ", error);
      Swal.fire({
        icon: "error",
        title: "Gagal",
        text: "Penghuni gagal ditambahkan",
      });
    }
  };

  return (
    <>
      <div className="container-xxl flex-grow-1 container-p-y">
        <h4 className="fw-bold py-3 mb-4">
          <span className="text-muted fw-light">Penghuni/</span> Tambah Penghuni
        </h4>
        {/* Basic Layout & Basic with Icons */}
        <div className="row">
          {/* Basic Layout */}
          <div className="col-xxl">
            <div className="card mb-4">
              <div className="card-header d-flex align-items-center justify-content-between">
                <h5 className="mb-0">Form Tambah</h5>
                <Link to="/penghuni" className="btn btn-primary">
                  <i className="bx bx-arrow-back me-2"></i>
                  Kembali
                </Link>
              </div>
              <div className="card-body">
                <form>
                  <div className="row mb-3">
                    <label
                      className="col-sm-2 col-form-label"
                      htmlFor="basic-default-name"
                    >
                      Nama Lengkap
                    </label>
                    <div className="col-sm-10">
                      <input
                        type="text"
                        className="form-control"
                        id="basic-default-name"
                        placeholder="Nama Lengkap"
                        value={nama_lengkap}
                        onChange={(e) => setNamaLengkap(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="row mb-3">
                    <label className="col-sm-2 col-form-label">
                      Jenis Kelamin
                    </label>
                    <div className="col-sm-10">
                      <select
                        className="form-select"
                        value={jenis_kelamin}
                        onChange={(e) => setJenisKelamin(e.target.value)}
                      >
                        <option value="">Pilih Jenis Kelamin</option>
                        <option value="Laki-laki">Laki-laki</option>
                        <option value="Perempuan">Perempuan</option>
                      </select>
                    </div>
                  </div>
                  <div className="row mb-3">
                    <label
                      className="col-sm-2 col-form-label"
                      htmlFor="basic-default-phone"
                    >
                      Nomor Telepon
                    </label>
                    <div className="col-sm-10">
                      <input
                        type="text"
                        id="basic-default-phone"
                        className="form-control phone-mask"
                        placeholder="Nomor Telepon"
                        value={no_telepon}
                        onChange={(e) => setNoTelepon(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="row mb-3">
                    <label className="col-sm-2 col-form-label">
                      Status Penghuni
                    </label>
                    <div className="col-sm-10">
                      <select
                        className="form-select"
                        value={status_penghuni}
                        onChange={(e) => setStatusPenghuni(e.target.value)}
                      >
                        <option value="">Pilih Status Penghuni</option>
                        <option value="kontrak">Kontrak</option>
                        <option value="tetap">Tetap</option>
                      </select>
                    </div>
                  </div>
                  <div className="row mb-3">
                    <label className="col-sm-2 col-form-label">
                      Status Pernikahan
                    </label>
                    <div className="col-sm-10">
                      <select
                        className="form-select"
                        value={status_pernikahan}
                        onChange={(e) => setStatusPernikahan(e.target.value)}
                      >
                        <option value="">Pilih Status Pernikahan</option>
                        <option value="menikah">Menikah</option>
                        <option value="belum menikah">Belum Menikah</option>
                      </select>
                    </div>
                  </div>
                  <div className="row mb-3">
                    <label className="col-sm-2 col-form-label">Foto KTP</label>
                    <div className="col-sm-10">
                      <input
                        type="file"
                        className="form-control"
                        accept="image/*"
                        onChange={handleKTP}
                      />
                      {previewKTP && (
                        <img
                          className="my-2"
                          width={100}
                          height={100}
                          src={previewKTP}
                          alt="Foto KTP"
                        />
                      )}
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
  );
};

export default CreatePenghuni;
