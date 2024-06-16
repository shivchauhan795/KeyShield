import React, { useEffect, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';
import { v4 as uuidv4 } from 'uuid';

const Manager = () => {

  const [form, setform] = useState({ site: '', username: '', password: '' })
  const [passwordArray, setPasswordArray] = useState([])

  useEffect(() => {
    let passwords = localStorage.getItem("passwords")
    if (passwords) {
      setPasswordArray(JSON.parse(passwords))
    }
  }, [])


  const savePassword = () => {
    if (form.site.length > 3 && form.username.length > 3 && form.password.length > 3) {
      setPasswordArray([...passwordArray, { ...form, id: uuidv4() }])
      localStorage.setItem("passwords", JSON.stringify([...passwordArray, { ...form, id: uuidv4() }]))
      console.log([...passwordArray, form])
      setform({ site: '', username: '', password: '' })
      toast('Password Saved!!', {
        position: "bottom-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    }
    else {
      toast('Error: Password not saved!!', {
        position: "bottom-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    }
  }
  const editPassword = (id) => {
    setform(passwordArray.filter(item => item.id === id)[0])
    setPasswordArray(passwordArray.filter(item => item.id !== id))
  }
  const deletePassword = (id) => {
    let c = confirm("Do you want to Delete this Password?")
    if (c) {
      setPasswordArray(passwordArray.filter(item => item.id !== id))
      localStorage.setItem("passwords", JSON.stringify(passwordArray.filter(item => item.id !== id)))
      toast('Password Deleted!', {
        position: "bottom-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    }
  }

  const handleChange = (e) => {
    setform({ ...form, [e.target.name]: e.target.value })
  }
  const copyText = (text) => {
    toast('Copied Text!', {
      position: "bottom-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
    navigator.clipboard.writeText(text)
  }

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition="Bounce"
      />
      <ToastContainer />

      <div className='flex flex-col min-h-[80.7vh]'>


        <div className='flex flex-col items-center pt-10 gap-3'>

          <div className="text-4xl font-bold">
            VaultGuard
          </div>
          <p className='text-lg pb-10'>Your Trusted Password Manager</p>

          <input value={form.site} onChange={handleChange} type="text" placeholder='Enter Website URL' className='url border border-black px-4 py-1 rounded-full w-4/5' name='site' />
          <div className="uspass flex justify-center w-4/5 gap-9">

            <input value={form.username} onChange={handleChange} type="text" placeholder='Enter Username' className=' border border-black px-4 py-1 rounded-full w-full' name='username' />
            <input value={form.password} onChange={handleChange} type="password" placeholder='Enter Password' className=' border border-black px-4 py-1 rounded-full w-full' name='password' />

          </div>

          <button onClick={savePassword} className='bg-purple-300 rounded-full flex items-center px-3 py-1 mt-5 hover:bg-purple-200 gap-2 border border-black'>
            <lord-icon
              src="https://cdn.lordicon.com/jgnvfzqg.json"
              trigger="hover" >
            </lord-icon>
            Save Password
          </button>

        </div >

        <div className="passwords flex flex-col gap-5 items-center mt-12 mb-24 flex-wrap w-2/5">
          <h2 className='text-2xl font-bold text-wrap'>Your Passwords</h2>
          {passwordArray.length === 0 && <div>No Passwords to show.</div>}

          {passwordArray.length != 0 && (

            <div className='w-4/5 overflow-x-auto h-96 rounded-xl'>
              <table className='w-full rounded-xl overflow-hidden'>
                <thead className='bg-purple-300'>
                  <tr>
                    <th className='px-4 py-2'>URL</th>
                    <th className='px-4 py-2'>Username</th>
                    <th className='px-4 py-2'>Password</th>
                    <th className='px-4 py-2'>Action</th>
                  </tr>
                </thead>

                <tbody className='bg-purple-100'>
                  {passwordArray.map((item, index) => (
                    <tr key={index}>

                      <td className='px-4 py-2 '>
                        <div className='flex items-center'>
                          <span>{item.site}</span>
                          <div className='cursor-pointer' onClick={() => { copyText(item.site) }}>
                            <lord-icon
                              style={{ "width": "25px", "height": "25px", "paddingTop": "6px", "paddingLeft": "5px" }}
                              src="https://cdn.lordicon.com/iykgtsbt.json"
                              trigger="hover" >
                            </lord-icon>
                          </div>
                        </div>
                      </td>

                      <td className='px-4 py-2 '>
                        <div className='flex items-center'>
                          <span>{item.username}</span>
                          <div className='cursor-pointer' onClick={() => { copyText(item.username) }}>
                            <lord-icon
                              style={{ "width": "25px", "height": "25px", "paddingTop": "6px", "paddingLeft": "5px" }}
                              src="https://cdn.lordicon.com/iykgtsbt.json"
                              trigger="hover" >
                            </lord-icon>
                          </div>
                        </div>
                      </td>

                      <td className='px-4 py-2 '>
                        <div className='flex items-center'>
                          <span>{"*".repeat(item.password.length)}</span>
                          <div className='cursor-pointer' onClick={() => { copyText(item.password) }}>
                            <lord-icon
                              style={{ "width": "25px", "height": "25px", "paddingTop": "6px", "paddingLeft": "5px" }}
                              src="https://cdn.lordicon.com/iykgtsbt.json"
                              trigger="hover" >
                            </lord-icon>
                          </div>
                        </div>
                      </td>

                      <td className='px-4 py-2 '>
                        <div className='flex items-center gap-5 -ml-5'>

                          <div className='cursor-pointer' onClick={() => { editPassword(item.id) }}>
                            <lord-icon
                              style={{ "width": "25px", "height": "25px", "paddingTop": "6px", "paddingLeft": "5px" }}
                              src="https://cdn.lordicon.com/gwlusjdu.json"
                              trigger="hover" >
                            </lord-icon>
                          </div>
                          <div className='cursor-pointer' onClick={() => { deletePassword(item.id) }}>
                            <lord-icon
                              style={{ "width": "25px", "height": "25px", "paddingTop": "6px", "paddingLeft": "5px" }}
                              src="https://cdn.lordicon.com/skkahier.json"
                              trigger="hover" >
                            </lord-icon>
                          </div>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </>
  )
}

export default Manager