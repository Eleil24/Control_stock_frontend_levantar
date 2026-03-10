import React, { useState } from 'react';
import { useCreateProduct } from '../hooks/useCreateProduct';
import { showSuccessAlert, showErrorAlert } from '../../../utils/alerts';
import './CreateProductForm.css';

interface CreateProductFormProps {
    onCancel?: () => void;
}

export const CreateProductForm: React.FC<CreateProductFormProps> = ({ onCancel }) => {
    const { mutate, isLoading } = useCreateProduct();
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        price: '',
    });
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault(); 
        try {
            await mutate({
                name: formData.name,
                description: formData.description,
                price: Number(formData.price),
            });
            showSuccessAlert('Producto Creado', 'El producto ha sido creado exitosamente.');
            setFormData({ name: '', description: '', price: '' });
            if (onCancel) {
                onCancel();
            }
        } catch (err: any) {
            showErrorAlert('Error', err.message || 'Ha ocurrido un error al crear el producto');
        }
    };
    return (
        <div className="product-form-container">
            <div className="product-form-header">
                <h2 className="product-form-title">Crear Nuevo Producto</h2>
                <p className="product-form-subtitle">Ingresa los detalles del nuevo artículo para el inventario</p>
            </div>
            {}
            <form onSubmit={handleSubmit}>
                <div className="product-form-group">
                    <label htmlFor="name" className="product-form-label">Nombre del Producto</label>
                    <input
                        type="text"
                        id="name"
                        name="name"                   
                        value={formData.name}         
                        onChange={handleChange}       
                        className="product-form-input"
                        placeholder="Ej. Altavoz Inteligente Echo"
                        required
                    />
                </div>
                <div className="product-form-group">
                    <label htmlFor="price" className="product-form-label">Precio (S/ )</label>
                    <input
                        type="number"
                        id="price"
                        name="price"                  
                        value={formData.price}        
                        onChange={handleChange}       
                        className="product-form-input"
                        placeholder="Ej. 100"
                        min="0"
                        step="0.01"
                        required
                    />
                </div>
                <div className="product-form-group">
                    <label htmlFor="description" className="product-form-label">Descripción</label>
                    <textarea
                        id="description"
                        name="description"            
                        value={formData.description}  
                        onChange={handleChange}       
                        className="product-form-textarea"
                        placeholder="Breve descripción del producto..."
                        required
                    />
                </div>
                {}
                <div className="product-form-actions">
                    <button
                        type="submit"
                        className="product-form-button submit-btn"
                        disabled={isLoading}
                    >
                        {isLoading ? 'Creando...' : 'Guardar Producto'}
                    </button>
                    {onCancel && (
                        <button
                            type="button"
                            className="product-form-button cancel-btn"
                            onClick={onCancel}
                            disabled={isLoading}
                        >
                            Cancelar y Volver
                        </button>
                    )}
                </div>
            </form>
        </div>
    );
};