import {ethers, Contract} from 'ethers';
import PaymentProcessor from './contracts/PaymentProcessor.json';
import Dai from './contracts/Dai.json'
import {useEffect, useState} from 'react';
import Store from './store'

function App() {
  const [paymentProcessor, setPaymentProcessor] = useState(undefined);
  const [dai , setDai] = useState(undefined);
  useEffect(()=>{
    const loadProvider = async()=>{
      if(window.ethereum){
        await window.ethereum.enable();
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();

        const paymentProcessor = new Contract(
          PaymentProcessor.networks[window.ethereum.networkVersion].address,
          PaymentProcessor.abi,
          signer
        );
        const dai = new Contract(
          Dai.networks[window.ethereum.networkVersion].address,
          Dai.abi,
          signer
        );
        setPaymentProcessor(paymentProcessor);
        setDai(dai)



         
      }else{
        console.log("Please install metamask");
      }
    }

    loadProvider();

  }, [])
  return (
    <div className = 'container'>
      <div className ='col-sm-12'>
        <h1>Ecommerce Blockchain App</h1>
        <Store paymentProcessor = {paymentProcessor} dai = {dai}/>
       </div>
    </div>
  );
}

export default App;
