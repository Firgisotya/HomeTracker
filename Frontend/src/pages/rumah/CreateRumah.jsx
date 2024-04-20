import { React, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { createRumah } from "../../services/rumah/RumahServices";

const CreateRumah = () => {
  const navigate = useNavigate();

  const [nomor_rumah, setNomorRumah] = useState("");
  const [status_rumah, setStatusRumah] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      nomor_rumah: nomor_rumah,
      status_rumah: status_rumah,
    }

    try {
      const response = await createRumah(data);
      console.log(response);
      Swal.fire({
        icon: "success",
        title: "Berhasil",
        text: "Data berhasil disimpan",
      });
      navigate("/rumah");
    } catch (error) {
      console.error(error);
      Swal.fire({
        icon: "error",
        title: "Gagal",
        text: "Data gagal disimpan",
      });
    }
  }

  return (
    <>
      <div className="container-xxl flex-grow-1 container-p-y">
        <h4 className="fw-bold py-3 mb-4">
          <span className="text-muted fw-light">Rumah/</span> Tambah Rumah
        </h4>
        {/* Basic Layout & Basic with Icons */}
        <div className="row">
          {/* Basic Layout */}
          <div className="col-xxl">
            <div className="card mb-4">
              <div className="card-header d-flex align-items-center justify-content-between">
                <h5 className="mb-0">Form Tambah</h5>
                <Link to="/rumah" className="btn btn-primary">
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
                      Nomor Rumah
                    </label>
                    <div className="col-sm-10">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Nomor Rumah"
                        value={nomor_rumah}
                        onChange={(e) => setNomorRumah(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="row mb-3">
                    <label className="col-sm-2 col-form-label">
                      Status Rumah
                    </label>
                    <div className="col-sm-10">
                      <select
                        className="form-select"
                        value={status_rumah}
                        onChange={(e) => setStatusRumah(e.target.value)}
                      >
                        <option value="">Pilih Status Rumah</option>
                        <option value="Dihuni">Dihuni</option>
                        <option value="Kosong">Kosong</option>
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

export default CreateRumah