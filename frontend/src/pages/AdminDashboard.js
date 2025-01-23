import withAdmin from "../components/withAdmin"

const AdminDashboard = () => {
    return <p>Admin Dashboard</p>
}

const EnhancedAdminDashboard = withAdmin(AdminDashboard);

export default EnhancedAdminDashboard;