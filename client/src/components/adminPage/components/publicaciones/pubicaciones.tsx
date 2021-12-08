/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable array-callback-return */
import { Box } from "@mui/material"
import React, { ChangeEvent, ChangeEventHandler, useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getUsers, } from "../../../../redux/actions/userActions"
import { Publication } from "../../../../redux/types"
import ENavBar from "../../employeeNavBar"
import NavBar from "../../navBar"
import { Link } from 'react-router-dom';
import "./publicaciones.css"
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import { activatePublication, publicationMessage, putPublications } from "../../../../redux/actions/publicationActions"
import CloseIcon from '@mui/icons-material/Close';

interface State {
    publicationList: any,
    userSignin: any,
}

const PublicacionesAdmPage = () => {
    const dispatch = useDispatch()
    const state = useSelector((state: State) => state)
    const { userInfo } = useSelector((state: State) => state.userSignin)
    const publications = state.publicationList.publications;
    const [mensaje, setMensaje] = useState("");

    useEffect(() => {
        dispatch(getUsers())
    }, [dispatch])
    if (!userInfo?.type) return (<div></div>)

    function HandlerSubmit(e: React.SyntheticEvent<EventTarget>, id: string) {
        e.preventDefault()
        dispatch(publicationMessage(id, mensaje))
    }
    return (
        <Box>{userInfo?.type === "admin" ?
            <NavBar></NavBar> :
            <ENavBar></ENavBar>
        }
            <Box className="box-usuarios">
                <Box sx={{ flexDirection: "row", display: "flex", borderBottom: "black solid 1px", justifyContent: "initial", width: "70%" }} className="box">
                    <p className="one">#</p>
                    <p className="two">marca</p>
                    <p className="three">Activar</p>
                    <p className="four">detalle</p>
                    <p className="four">ver</p>
                </Box>
                {
                    publications.map((e: Publication) => {
                        if (!e.state) {
                            return (
                                <div style={{ flexDirection: "row", display: "flex", borderBottom: "#e6e6e6 solid 1px", justifyContent: "initial", width: "70%", alignItems: "center" }}>
                                    <div className="one">
                                        <img src={e.images[0].url} alt="no se encontro img" style={{ width: "100px" }}></img>
                                    </div>
                                    <div className="two">
                                        <p>{e.mark}</p>
                                    </div>
                                    <div className="three" style={{ display: "flex", flexDirection: "column" }}>
                                        <div style={{ display: "flex", justifyContent: "initial", marginBottom: "2px" }}>
                                            <a href="#miModal" type="button" className="aceptar" style={{ display: "flex", justifyContent: "center", marginBottom: "2px" }} >Aceptar</a>
                                        </div>
                                        <div style={{ display: "flex", justifyContent: "initial", marginBottom: "2px" }}>
                                            <a href="#miModa" type="button" className="rechazar" >Rechazar</a>
                                        </div>
                                    </div>
                                    <div className="four">
                                        <div style={{ borderRadius: "10px", backgroundColor: "#3562", width: "50%", height: "50%", padding: "3px" }}>
                                            <p>{e.detail}</p>
                                        </div>
                                    </div>
                                    <div className="four">
                                        <Link to={`/publication/${e._id}`} target={"_blank"}>
                                            <RemoveRedEyeIcon sx={{ color: "black" }} />
                                        </Link>
                                    </div>
                                    <div id="miModal" className="modal">
                                        <div className="modal-contenido" style={{ display: "flex", flexDirection: "column" }}>
                                            <a href="#" style={{ display: "flex", justifyContent: "end" }}>
                                                <button style={{ color: "red", backgroundColor: "transparent", border: "none", cursor: "pointer" }}><CloseIcon /></button>
                                            </a>
                                            <p>Estas seguro que desea aceptar esta publicacion?</p>
                                            <div style={{ display: "flex", justifyContent: "center" }}>

                                                <input type="button" value={"aceptar"} className="aceptar" style={{ display: "flex", justifyContent: "center" }} onClick={async () => {
                                                    await dispatch(activatePublication(e._id, true))
                                                    await dispatch(putPublications({
                                                        name: undefined, author: undefined,
                                                        category: undefined, gender: undefined, mark: undefined,
                                                        order: undefined, page: undefined, price: undefined
                                                    }))
                                                }} />
                                            </div>
                                        </div>
                                    </div>
                                    <div id="miModa" className="modal">
                                        <div className="modal-contenido2" style={{ display: "flex", flexDirection: "column" }}>
                                            <a href="#" style={{ display: "flex", justifyContent: "end" }}>
                                                <button style={{ color: "red", backgroundColor: "transparent", border: "none", cursor: "pointer" }}><CloseIcon /></button>
                                            </a>
                                            <p>Envie un mensaje al creador de la publicacion acerca de lo que deberia modificar</p>
                                            <div style={{ display: "flex", justifyContent: "center", flexDirection: "column" }}>
                                                <form onSubmit={(k: React.SyntheticEvent<EventTarget>) => HandlerSubmit(k, e._id)}>
                                                    <div style={{ display: "flex", justifyContent: "center", minWidth: "100px" }}>

                                                        <textarea style={{ minWidth: "310px", resize: "none", minHeight: "150px" }} value={mensaje} className="text"
                                                            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>): any =>
                                                                setMensaje(e.target.value)
                                                            } />
                                                    </div >
                                                    <div style={{ display: "flex", justifyContent: "center", marginTop: "3px" }}>

                                                        <input type={"submit"} className="aceptar" />
                                                    </div>
                                                </form>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )
                        }


                    })
                }

            </Box >


        </Box >
    )
}

export default PublicacionesAdmPage