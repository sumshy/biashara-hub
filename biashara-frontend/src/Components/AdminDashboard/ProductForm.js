'use client';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import Loader from '../ui/Loader';
import './ProductForm.css';

const ProductForm = () => {
    const token = localStorage.getItem('authToken');
    const [loader, setLoader] = useState(false);
    const [previewImage, setPreviewImage] = useState(null);
    const navigate = useNavigate();
    const { register, handleSubmit, reset, formState: { errors } } = useForm({
        defaultValues: {
            name: '',
            category: '',
            description: '',
            price: '',
            image: null
        },
        mode: 'onBlur',
    });

    const handleFileChange = (event) => {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreviewImage(reader.result); // Set preview image URL
            };
            reader.readAsDataURL(file);
        } else {
            setPreviewImage(null); // Clear preview if no file
        }
    }; 

    const onSubmitReady = async (data) => {
        try {
            setLoader(true);
            const formData = {
                name: data.name,
                category: data.category,
                description: data.description,
                price: parseFloat(data.price),
                // Assuming you want the image data as base64 for submission
                base64Image: previewImage 
            };

            const response = await fetch('http://localhost:5000/api/merchant/addProduct/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `${token}`,
                },
                body: JSON.stringify(formData),
            });

            const result = await response.json();
            setLoader(false);
            if (result.status === 'failed') {
                toast.error('Failed to create product');
            } else {
                toast.success('Product created successfully');
                reset();
                setPreviewImage(null);
                navigate('/dashboard');
            }
        } catch (error) {
            setLoader(false);
            console.error(error);
            toast.error('An error occurred while submitting the form.');
        }
    };

    return (
        <div className="form-container">
            <form onSubmit={handleSubmit(onSubmitReady)} className="form">
                <input
                    type="text"
                    placeholder="Name"
                    {...register('name', { required: 'Name is required' })}
                    className={`input ${errors.name ? 'error' : ''}`}
                />
                {errors.name && <span className="error-message">{errors.name.message}</span>}

                <select
                    {...register('category', { required: 'Category is required' })}
                    className={`input ${errors.category ? 'error' : ''}`}
                >
                    <option value="" disabled>Choose a category</option>
                    <option value="Food">Food</option>
                    <option value="Appliances">Appliances</option>
                    <option value="Fashion">Fashion</option>
                    <option value="Moving">Moving</option>
                </select>
                {errors.category && <span className="error-message">{errors.category.message}</span>}

                <input
                    type="text"
                    placeholder="Description"
                    {...register('description', { required: 'Description is required' })}
                    className={`input ${errors.description ? 'error' : ''}`}
                />
                {errors.description && <span className="error-message">{errors.description.message}</span>}

                <input
                    type="number"
                    placeholder="Price in KES"
                    {...register('price', { required: 'Price is required', valueAsNumber: true })}
                    className={`input ${errors.price ? 'error' : ''}`}
                />
                {errors.price && <span className="error-message">{errors.price.message}</span>}

                <div className="App">
                    <h2>Add Image:</h2>
                    <input type="file" accept="image/*" onChange={handleFileChange} />
                </div>
                {previewImage && (
                    <img
                        className="preview-image"
                        src={previewImage}
                        alt="Product preview"
                    />
                )}

                <div className="form-actions">
                    {loader && <Loader />}
                    <button type="submit" disabled={loader} className="submit-button">
                        Submit
                    </button>
                </div>
            </form>
        </div>
    );
};

export default ProductForm;
