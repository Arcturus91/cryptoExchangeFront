
import { Table,Typography } from 'antd';
const { Title, Paragraph, Text } = Typography;


const InventoryTable = (props) => {
/*
coinPrice: 1555.27
coinQuantity: 41
*/ 

console.log("props que llega a ltable", props)

const dataInv = props.inventory



const columnsInv = [
  {
    title: 'Nombre de la cripto',
    dataIndex: 'cryptoName',
    filters: [
      {
        text: 'BTC',
        value: 'BTC',
      },
      {
        text: 'ETH',
        value: 'ETH',
      }
    ],
    filterMode: 'tree',
    filterSearch: true,
    onFilter: (value, record) => record.cryptoName.includes(value),
    width: '30%',
  },
  {
    title: 'Cantidad',
    dataIndex: 'coinQuantity',
    sorter: (a, b) => a.coinQuantity - b.coinQuantity,
  },
  {
    title: 'Precio de compra',
    dataIndex: 'coinPrice',
    sorter: (a, b) => a.coinPrice - b.coinPrice,
  },
  {
    title: 'Fecha',
    dataIndex: 'createdAt',
 
    onFilter: (value, record) => record.createdAt.startsWith(value),
    filterSearch: true,
    width: '40%',
  },
];


const onChange = (pagination, filters, sorter, extra) => {
  console.log('params', pagination, filters, sorter, extra);
};



    return (
        <>
        <Title level={3}> El inventario </Title>
    <Table columns={columnsInv} dataSource={dataInv} onChange={onChange} />
    
    </>
    )
}



export default InventoryTable;