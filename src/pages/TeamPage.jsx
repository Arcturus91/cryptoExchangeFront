
import { Table,Typography } from 'antd';
const { Title, Paragraph, Text } = Typography;


const TeamPage = () => {
  return (
    <div className="home-page">
    

    <Title style={{color:"white"}}  level={1}>El equipo</Title>

    <Title style={{color:"white"}} level={4}>Arturo Barrantes</Title>
<div className='team-img'>
            <img  src="https://res.cloudinary.com/dad5dandd/image/upload/v1664031148/AlpacaExchange/foto_elegante_mini_mi92ly.png
" alt="alpacaExchangeTeam"/></div>

<div className='team-text'>

<p>Arturo Barrantes es ingeniero mecánico, especialista en finanzas, fundador del canal de Youtube: <a href='https://www.youtube.com/channel/UCPUd7hGPOPPDwChjYlLLU8A'>El Club de las 7 cifras</a> y el creador de diversas aplicaciones web financieras/no financieras que han tenido impacto a nivel mundial:</p>
 <ul>
    <li><a href='https://www.omnicalculator.com/finance/dcf'>Discounted cash flow calculator</a></li>
    <li><a href='https://www.omnicalculator.com/finance/fifo-for-inventories'>Inventory management: FIFO method</a></li>
    <li><a href='https://www.omnicalculator.com/finance/call-put-option'>Stock options calculator</a></li>
    <li><a href='https://www.omnicalculator.com/health/turno-vacunacion-covid-argentina'>Turno de vacunación contra el covid para Argentina</a></li>
    <li><a href='https://www.omnicalculator.com/health/vaccine-immunity'>Max Vaccine Immunity Calculator</a></li>
 </ul>
Así como otros proyectos que desarolló durante su bootcamp en IronHack, otorgándole así el primer puesto:
<ul>
    <li><a href='http://pokepetsio.herokuapp.com/'>Pokepets</a></li>
    <li><a href='https://mario-bross-in-cusco-peru.herokuapp.com/'>MarioBros: The Cuzco level</a>
    </li>

 </ul>


<p>Tiene interés en el desarrollo de herramientas web financieras y su aplicación en la WEB3.</p>
</div>





           
    </div>
  )
}

export default TeamPage