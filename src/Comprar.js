import React, { useCallback, useEffect, useState } from 'react'
import axios from 'axios'

function Comprar() {

    const [usuarios, setUsuarios] = useState([])
    const date = new Date()
    const [compra, setCompra] = useState({
        "id": 0,
        "idPersona": 0,
        "idPase": 0,
        "fechaCompra": date.getFullYear() + '-' + ('0' + (date.getMonth() + 1)).slice(-2) + '-' + ('0' + date.getDate()).slice(-2) + 'T00:00:00.000Z', //2022-07-06T23:18:45.478Z
        "numeroPases": 0
    })
    const [compras, setCompras] = useState([])

    const handleChange = e => {
        const { name, value } = e.target
        setCompra({
            ...compra,
            [name]: value
        })
    }

    const onCreatePase = async (e) => {
        e.preventDefault()
        await axios.post('https://localhost:7073/api/PersonasPases', compra)
            .then(r => {
                getUsuarios()
                getCompras()
            })
    }
    const getUsuarios = useCallback(async () => {
        await axios.get('https://localhost:7073/api/Personas')
            .then(r => {
                setUsuarios(r.data)
            })
    }, [])

    const getCompras = useCallback(async () => {
        await axios.get('https://localhost:7073/api/PersonasPases')
            .then(r => {
                setCompras(r.data)
            })
    }, [])

    useEffect(() => {
        return () => {
            getUsuarios()
            getCompras()
        }
    }, [getUsuarios, getCompras])

    const onClickDelete = async a => {
        await axios.delete(`https://localhost:7073/api/PersonasPases/${a}`)
            .then(() => {
                getUsuarios()
                getCompras()
            })
    }

    return (
        <>
            <h1>Comprar pase</h1>
            <form onSubmit={onCreatePase}>
                <select name="idPersona" onChange={handleChange}>
                    <option>Seleccionar usuario</option>
                    {usuarios.map(usuario => (
                        <option key={usuario.id} value={usuario.id}>
                            {usuario.nombre}
                        </option>
                    ))}
                </select>
                <select name='idPase' onChange={handleChange}>
                    <option>Seleccionar tipo de pase</option>
                    <option value="1">Mensual</option>
                    <option value="2">Semestral</option>
                    <option value="3">Anual</option>
                </select>
                <button type="submit">COMPRAR</button>
            </form>
            <div>
                {compras.map(compra => (
                    <div key={compra.id}>
                        <p>------------------------------------------------------</p>
                        <p>{compra.id}</p>
                        <p>{console.log(compra)}</p>
                        <p>{compra.fechaCompra}</p>
                        <button onClick={() => onClickDelete(compra.id)}>BORRAR</button>
                        <p>------------------------------------------------------</p>
                    </div>
                ))}
            </div>
        </>
    )
}

export default Comprar