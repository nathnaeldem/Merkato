import React, { useState } from 'react';
import axios from 'axios';
import './category-add-form.css'; // Import the styling file

const CategoryAddForm = () => {
    const [categoryName, setCategoryName] = useState('');
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!categoryName.trim()) {
            setMessage('Category name cannot be empty.');
            return;
        }

        try {
            setLoading(true);
            setMessage('');
            const response = await axios.post('bermenah/category.php', {
                table: 'categories',
                name: categoryName,
            });
            setMessage(response.data.message || 'Category added successfully.');
            setCategoryName(''); // Clear the input
        } catch (error) {
            setMessage('Failed to add category.');
            console.error('Error adding category', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="category-add-form">
            <h2 className="category-add-form__header">Add New Category</h2>
            <form onSubmit={handleSubmit} className="category-add-form__form">
                <div className="category-add-form__input-group">
                    <label htmlFor="categoryName" className="category-add-form__label">Category Name</label>
                    <input
                        type="text"
                        id="categoryName"
                        className="category-add-form__input"
                        value={categoryName}
                        onChange={(e) => setCategoryName(e.target.value)}
                        placeholder="Enter category name"
                        required
                    />
                </div>
                <button
                    type="submit"
                    className="category-add-form__button"
                    disabled={loading}
                >
                    {loading ? 'Adding...' : 'Add Category'}
                </button>
                {message && <p className="category-add-form__message">{message}</p>}
            </form>
        </div>
    );
};

export default CategoryAddForm;
