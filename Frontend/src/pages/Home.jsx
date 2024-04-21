import {React, useState, useEffect} from "react";
import Chart from "react-apexcharts";
import { countAllSection, reportTransaction } from "../services/home/HomeServices";

const Home = () => {
  const [totalPenghuni, setTotalPenghuni] = useState(0);
  const [totalRumah, setTotalRumah] = useState(0);
  const [totalPemasukan, setTotalPemasukan] = useState(0);
  const [totalPengeluaran, setTotalPengeluaran] = useState(0);

  const [report, setReport] = useState([]);
  const chartReport = {
    series : [
      {
        name: "Pemasukan",
        data: report.map((item) => item.pemasukan),
        color: '#008FFB'
      },
      {
        name: "Pengeluaran",
        data: report.map((item) => item.pengeluaran),
        color: '#FF4560'
      },
      {
        name: "Sisa Saldo",
        data: report.map((item) => item.sisa_saldo),
        color: '#FFA41B'
      }
    ],
    options : {
      chart: {
        type: 'bar',
        height: 350
      },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: '55%',
          endingShape: 'rounded'
        },
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        show: true,
        width: 2,
        colors: ['transparent']
      },
      xaxis: {
        categories: report.map((item) => item.bulan),
      },
      yaxis: {
        title: {
          text: 'Jumlah'
        }
      },
      fill: {
        opacity: 1
      },
      tooltip: {
        y: {
          formatter: function (val) {
            return "Rp " + val
          }
        }
      }
    }
  }

  const fetchCountAllSection = async () => {
    try {
      const response = await countAllSection();
      setTotalPenghuni(response.totalPenghuni);
      setTotalRumah(response.totalRumah);
      setTotalPemasukan(response.totalPembayaran);
      setTotalPengeluaran(response.totalPengeluaran);
    } catch (error) {
      console.log(error);
    }
  }

  const fetchReportTransaction = async () => {
    try {
      const response = await reportTransaction();
      console.log(response);
      setReport(response);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchCountAllSection();
    fetchReportTransaction();
  }, []);

  return (
    <>
      <div className="row">
        <div className="col-lg-6 col-md-4">
          <div className="row">
            <div className="col-lg-6 col-md-12 col-6 mb-4">
              <div className="card">
                <div className="card-body">
                  <div className="card-title d-flex align-items-start justify-content-between">
                    <div className="avatar flex-shrink-0">
                      <img
                        src="/assets/img/icons/team.png"
                      />
                    </div>
                  </div>
                  <span className="d-block mb-1">Penghuni</span>
                  <h4 className="card-title mb-2">{totalPenghuni}</h4>
                  <small className="fw-semibold">
                     Orang
                  </small>
                </div>
              </div>
            </div>
            <div className="col-lg-6 col-md-12 col-6 mb-4">
              <div className="card">
                <div className="card-body">
                  <div className="card-title d-flex align-items-start justify-content-between">
                    <div className="avatar flex-shrink-0">
                      <img
                        src="/assets/img/icons/house.png"
                      />
                    </div>
                  </div>
                  <span className="d-block mb-1">Rumah</span>
                  <h4 className="card-title mb-2">{totalRumah}</h4>
                  <small className="fw-semibold">
                     Data
                  </small>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-lg-6 col-md-4">
          <div className="row">
          <div className="col-lg-6 col-md-12 col-6 mb-4">
              <div className="card">
                <div className="card-body">
                  <div className="card-title d-flex align-items-start justify-content-between">
                    <div className="avatar flex-shrink-0">
                      <img
                        src="/assets/img/icons/income.png"
                      />
                    </div>
                  </div>
                  <span className="d-block mb-1">Pemasukan</span>
                  <h4 className="card-title mb-2">{totalPemasukan}</h4>
                  <small className="fw-semibold">
                     Data
                  </small>
                </div>
              </div>
            </div>
            <div className="col-lg-6 col-md-12 col-6 mb-4">
              <div className="card">
                <div className="card-body">
                  <div className="card-title d-flex align-items-start justify-content-between">
                    <div className="avatar flex-shrink-0">
                      <img
                        src="/assets/img/icons/expenditure.png"
                      />
                    </div>
                  </div>
                  <span className="d-block mb-1">Pengeluaran</span>
                  <h4 className="card-title mb-2">{totalPengeluaran}</h4>
                  <small className="fw-semibold">
                     Data
                  </small>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col">
          <div className="card">
            <div className="card-header">
              <h4 className="card-title">Grafik Pemasukan & Pengeluaran</h4>
            </div>
            <div className="card-body">
              <Chart options={chartReport.options} series={chartReport.series} type="bar" height={350} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
