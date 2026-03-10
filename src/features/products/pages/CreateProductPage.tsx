import React from 'react';
import { CreateProductForm } from '../components/CreateProductForm';
import '../components/CreateProductForm.css';
interface CreateProductPageProps {
    onCancel?: () => void;
}

export const CreateProductPage: React.FC<CreateProductPageProps> = ({ onCancel }) => {
    return (
        <div className="product-page-wrapper">
            {}
            <CreateProductForm onCancel={onCancel} />
        </div>
    );
};