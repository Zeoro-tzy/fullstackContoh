import React, { useEffect, useState } from 'react'
import axios from 'axios';

const Input2Radio = () => {
    const [dataRadio,setDataRadio] = useState([]);
    const [load,setLoad] = useState(true);
    const [selectOption,setSelectOption] = useState('');
    // const [tampungDataRadio,setTampungDataRadio] =  useState("");

    const getData = async() => {
        try{
            const res = await axios.get("http://localhost:3001/inRad/inputRadio");
            console.log(res.data)
            setDataRadio(res.data)

            const selectOption = res.data.find(dr => dr.isSelected);
            if(selectOption){
                setSelectOption(selectOption.label);
            }

            setLoad(false);
        }catch(err){
            setLoad(true);
            console.log(err);
        }
    }
    
    const handleOptionChange = async (e,id) => {
        const newValue = e.target.value;
        setSelectOption(newValue);

        const updateLabel = {
            label : newValue
        }
        console.log(updateLabel)
        try{
             await axios.patch("http://localhost:3001/inRad/inputRadio/" + id,updateLabel)
            getData();
        }catch(err){
            console.log(err)

        }
     }

    useEffect(() => {
        getData();
    },[])

    useEffect(() => {
        console.log(selectOption) // Akan mencetak nilai terbaru dari selectOption setelah state diperbarui
    },[selectOption]) // useEffect akan dipanggil setiap kali selectOption diperbarui

    if(load ){
        return <p>Loading...</p>
    }

  return (
    <div>
      <h1 className='border-2 border-black p-2 text-xl m-4'>2. Input Radio Button</h1>
      <div className=' bg-orange-200 mt-5 mx-3 p-3'>
          <div className='m-2 w-full flex justify-around '>

            {dataRadio.map(dr => (
                <div key={dr._id}>
                    <label>
                        <input type="radio" value={dr.label} onChange={(e) => handleOptionChange(e,dr._id)} checked={selectOption === dr.label} /> {dr.label}
                    </label>
                </div>
            ))}
              </div>

          <div className='m-2'>
            <select name="select" id="select" className='p-2'>
              <option value="data1">Data Pertama</option>
              <option value="data2">Data Kedua</option>
              <option value="data3">Data Ketiga</option>
            </select>
          </div>

          <div className='m-2'>
            <input type="range" name="" id="" />
          </div>

          <div className='m-2'>
            <input type="color" name="" id="" />
          </div>

        </div>

        

    </div>
  )
}

export default Input2Radio
