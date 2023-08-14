import React from 'react'
import { Button, Container } from 'react-bootstrap'
import Test from "../../assest/img/buku1.png"
import { useNavigate, useParams } from 'react-router-dom'
import { API } from '../../config/Api';
import { useQuery } from 'react-query';

function Show_Payment() {
  const navigate = useNavigate();

  let param = useParams();
  let id = parseInt(param.id);

  let { data : myPayment } = useQuery("myPayment", async () => {
    const response = await API.get(`/transactionbyid/${id}`);
    console.log("ini payment : ", response);
    return response.data.data
  })

  const convertRupiah = (price) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(price);
  };

  return (
    <div>
      <Container style={{marginTop: "110px"}}>
        <div className='mb-4 fs-3 fw-bold'>Payment</div>
        <div className='d-flex'>
          <div><img src={myPayment?.transaction?.booksPurchased?.thumbnail} alt='test' /></div>
          <div className='mx-5'>
            <h3>{myPayment?.transaction?.booksPurchased?.title}</h3>
            <p>{myPayment?.transaction?.booksPurchased?.author}</p>
            <p>{convertRupiah(myPayment?.transaction?.booksPurchased?.price)}</p>
          </div>
          <div className='align-self-end ms-auto'>
            <Button variant='dark'>Bayar Sekarang</Button>
          </div>
        </div>
      </Container>
    </div>
  )
}

export default Show_Payment