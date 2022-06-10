import {useState, useEffect} from 'react'
import { postArticuloInsumo, putArticuloInsumo } from '../../../utils/articulosInsumo';
import handlerChangeForm from '../../../utils/handlers/handlerChangeForm';

import styles from '../../../styles/admin.module.css'
const {select} = styles

const INITIAL_STATE={
    rubro:'ingredientes',
    denominacion:'',
    precioCompra: '',
    precioVenta: '',
    stockActual: '',
    stockMinimo: '',
    unidadMedida: 'unidades'
}
export default function FormArticuloInsumo({token, setModal, articulo, edit}){
    const [articuloForm, setArticuloForm] = useState(INITIAL_STATE)
    const [articuloEdit, setArticuloEdit] = useState(false)
    const titulo = edit ? 'Editar Artículo y agregar stock'
                        : 'Nuevo Artículo'
    const botonSubmit = edit ? 'Guardar Cambios'
                             : 'Agregar Artículo'
    const stockLabel = edit ? 'Stock Comprado (se sumará automáticamente al stock actual):'
                            : 'Stock Actual:'
    useEffect(() => {
        if(edit && !articuloEdit){
        setArticuloForm(articulo)
        setArticuloEdit(true)
        }
    },[edit,articulo, articuloEdit])
    
    const formSubmit = e => {
        e.preventDefault()
        if(edit){
            putArticuloInsumo(articulo.id, token, articuloForm)
        }else{
        postArticuloInsumo(articuloForm, token)
        .then(() => setArticuloForm(INITIAL_STATE))
        }
        setModal(false)
        setArticuloEdit(false)
    }
    const handlerInsumo = e => {
        handlerChangeForm(e, setArticuloForm, articuloForm)
    }
    
    return(
        <>
        <h2>{titulo}</h2>
        <form onSubmit={formSubmit}>
            <p>
                Rubro:
                <select name='rubro' className={select} onChange={handlerInsumo} defaultValue={articulo?.rubro ?? articuloForm['rubro']}>
                    <option value='bebidas con alcohol'>Bebida con alcohol</option>
                    <option value='bebidas sin gas'>Bebida sin gas</option>
                    <option value='gaseosas'>Gaseosa</option>
                    <option value='ingredientes'>Ingrediente</option>
                </select>
            </p>
            <p><label>Denominación:<input type='text' name='denominacion' placeholder='Denominación...' onChange={handlerInsumo} value={articuloForm['denominacion']}/></label></p>
            <p><label>Precio de Compra:<input type='number' name='precioCompra' placeholder='Precio de Compra...' onChange={handlerInsumo} value={articuloForm['precioCompra']}/></label></p>
            <p><label>Precio de Venta (ingrediente = 0):<input type='number' name='precioVenta' placeholder='Precio de Venta (ingrediente = 0)' onChange={handlerInsumo} value={articuloForm['precioVenta']}/></label></p>
            <p><label>{stockLabel}<input type='number' name='stockActual' placeholder='Stock...' onChange={handlerInsumo} value={articuloForm['stockActual']}/></label></p>
            <p><label>Stock Mínimo:<input type='number' name='stockMinimo' placeholder='Stock mínimo...' onChange={handlerInsumo} value={articuloForm['stockMínimo']}/></label></p>
            <p>
                Unidad de medida:
                <select name='unidadMedida' className={select} onChange={handlerInsumo} defaultValue={articulo?.unidadMedida ?? articuloForm['unidadMedida']}>
                    <option value='unidades'>Unidades (huevos, gaseosas, etc)</option>
                    <option value='gramos'>Gramos (sólido)</option>
                    <option value='mililitros'>Mililitros (líquido)</option>
                </select>
            </p>
            <button>{botonSubmit}</button>
        </form>
        </>
    )
}