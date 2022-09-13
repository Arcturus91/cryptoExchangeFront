
import { Table } from 'antd';
import Title from 'antd/lib/skeleton/Title';


const OperationsTable = (props) => {



console.log("yo soy props buy del table", props.buys)
console.log("yo soy props sell del table", props.sells)

const dataBuy = props.buys

const columnsBuy = [
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
    dataIndex: 'cryptoBuyAmount',
    sorter: (a, b) => a.cryptoBuyAmount - b.cryptoBuyAmount,
  },
  {
    title: 'Precio de compra',
    dataIndex: 'cryptoBuyPrice',
    sorter: (a, b) => a.cryptoBuyPrice - b.cryptoBuyPrice,
  },
  {
    title: 'Fecha',
    dataIndex: 'createdAt',
 
    onFilter: (value, record) => record.createdAt.startsWith(value),
    filterSearch: true,
    width: '40%',
  },
];

const dataSell = props.sells

const columnsSell = [
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
    dataIndex: 'cryptoSellAmount',
    sorter: (a, b) => a.cryptoSellAmount - b.cryptoSellAmount,
  },
  {
    title: 'Precio de compra',
    dataIndex: 'cryptoSellPrice',
    sorter: (a, b) => a.cryptoSellPrice - b.cryptoSellPrice,
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
        <Title level={3}> Tus compras</Title>
    <Table columns={columnsBuy} dataSource={dataBuy} onChange={onChange} />
    <Title level={3}> Tus ventas</Title>
    <Table columns={columnsSell} dataSource={dataSell} onChange={onChange} />
    </>
    )
}



export default OperationsTable;