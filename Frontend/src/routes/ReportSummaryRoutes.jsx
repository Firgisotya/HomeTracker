import { Routes, Route } from "react-router-dom"
import IndexReportSummary from "../pages/report_summary/IndexReportSummary"

const ReportSummaryRoutes = () => {
  return (
    <Routes>
        <Route path="" element={<IndexReportSummary />} />
    </Routes>
  )
}

export default ReportSummaryRoutes