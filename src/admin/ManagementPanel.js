import React, { useState, useEffect } from 'react'; 
import axios from 'axios';
import './management-panel.css';  // Import the CSS file for styling

const ManagementPanel = () => {
    const [data, setData] = useState([]);
    const [columns, setColumns] = useState([]);
    const [table, setTable] = useState('blog_posts');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchRecords();
    }, [table]);

    const fetchRecords = async () => {
        try {
            setLoading(true);
            const response = await axios.get(`bermenah/api.php?table=${table}`);
            setColumns(response.data.columns);  // Set dynamic column names
            setData(response.data.data);        // Set the data for the rows
        } catch (error) {
            console.error("Error fetching records", error);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        try {
            const response = await axios.delete(`bermenah/api.php?table=${table}&id=${id}`);
            alert(response.data.message || "Error deleting record");
            fetchRecords();
        } catch (error) {
            alert("Failed to delete record");
            console.error("Error deleting record", error);
        }
    };

    const handleUpdate = async (id, updatedData) => {
        try {
            const response = await axios.put(`bermenah/api.php?table=${table}&id=${id}`, updatedData);
            alert(response.data.message || "Error updating record");
            fetchRecords();
        } catch (error) {
            alert("Failed to update record");
            console.error("Error updating record", error);
        }
    };

    const handleInputChange = (e, rowIndex, column) => {
        const updatedData = [...data];
        updatedData[rowIndex][column] = e.target.value;  // Update the specific cell's value
        setData(updatedData);  // Set the new data state
    };

    return (
        <div className="management-panel">
            <h1 className="management-panel__header">Management Panel</h1>
            <select 
                className="management-panel__select" 
                onChange={(e) => setTable(e.target.value)} 
                value={table}
            >
                <option value="blog_posts">Blog Posts</option>
                <option value="categories">Categories</option>
                <option value="offers">Offers</option>
                <option value="products">Products</option>
                <option value="users">Users</option>
            </select>

            {loading ? (
                <p className="management-panel__loading">Loading...</p>
            ) : (
                <table className="management-panel__table">
                    <thead>
                        <tr>
                            {columns.map((column, index) => (
                                <th key={index}>{column}</th>
                            ))}
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((item, rowIndex) => (
                            <tr key={item.id}>
                                {columns.map((column, colIndex) => (
                                    <td key={colIndex}>
                                        <input
                                            type="text"
                                            value={item[column]}
                                            onChange={(e) => handleInputChange(e, rowIndex, column)}  // Allow editing
                                        />
                                    </td>
                                ))}
                                <td>
                                    <button 
                                        className="management-panel__button update" 
                                        onClick={() => handleUpdate(item.id, item)}
                                    >
                                        Update
                                    </button>
                                    <button 
                                        className="management-panel__button delete" 
                                        onClick={() => handleDelete(item.id)}
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default ManagementPanel;
