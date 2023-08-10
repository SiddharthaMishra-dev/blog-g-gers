'use client'
import { useState } from "react";

const InitialState={
    userName:"",
    password:""
}

export default function Register(){
    const [formData, setFormData] = useState(InitialState);
    const handleChange = (e: any) => {
      const { name, value } = e.target;
      setFormData((prevValue) => ({ ...prevValue, [name]: value }));
    };
  
    const handleSubmit = async(e:any) => {
      e.preventDefault()
      
      const response=await fetch('/api/register',{
          method:'POST',
          body:JSON.stringify(formData)
      })
      console.log(response)
    };
  
    return (
      <div>
        <form>
          <div className="w-full">
            <div className="p-4 flex flex-col w-3/5 ">
              <label>userName</label>
              <input
                placeholder="userName"
                name="userName"
                className="text-black p-2 text-lg"
                value={formData.userName}
                onChange={handleChange}
              />
            </div>
            <div className="p-4 flex flex-col w-3/5 ">
              <label>password</label>
              <input
                placeholder="password"
                name="password"
                className="text-black p-2 text-lg"
                value={formData.password}
                onChange={handleChange}
              />
            </div>
           
            <div>
              <button  onClick={handleSubmit}>
                Submit
              </button>
            </div>
          </div>
        </form>
      </div>
    );
  
}

