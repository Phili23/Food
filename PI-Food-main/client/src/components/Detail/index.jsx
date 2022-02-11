import React, { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getDetail } from '../../redux/actions';
import './index.css'
export default function Detail(props) {

    const dispatch = useDispatch()
    const { id } = useParams()   //la obtengo con este hook, porquue en el routa de mi App le especifico

    useEffect(() => {
        dispatch(getDetail(id));//traigo el estado detail
    }, [id, dispatch])
    const detailsstate = useSelector((state) => state.details)//le traigo desde el reducer

    return (
        <div className=''>

            {
                detailsstate.length > 0 ?
                    <div  >
                        <Link to='/home'><button className='butt'>Back to main Page </button> </Link>
                        <h1 className='title' > {detailsstate[0].name} </h1>
                        <> <img className='imga' src={detailsstate[0].image ? detailsstate[0].image : 'https://st.depositphotos.com/1036708/2191/i/600/depositphotos_21918797-stock-photo-knife-and-fork-with-plate.jpg'} /></>
                        <div className=''>

                            <h3 className='recipe' >Type Diet:<br /> {detailsstate[0].typeDiets.map(t => t.name).join(' , ')}</h3>
                            <h5 className='recipe' >summary: <br />  <br />{detailsstate[0].summary}</h5>
                            <h5 className='recipe' >healthScore: {detailsstate[0].healthScore}</h5>
                            <h5 className='recipe' >puntutation: {detailsstate[0].spoonacularScore}</h5>
                            <h5 className='recipe'>steps:<br />{Array.isArray(detailsstate[0].steps) ? detailsstate[0].steps.map(e => e.steps.map(f => f.step)) : detailsstate[0].steps}</h5>
                        </div>
                    </div> :
                    <div> <h2> loading... </h2> </div>

            }
        </div>
    )
}