import React, { useEffect, useState } from "react";
import { useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCopy } from "@fortawesome/free-solid-svg-icons";
import { faPen } from "@fortawesome/free-solid-svg-icons";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { v4 as uuidv4 } from 'uuid';


function Manager() {
  const ref = useRef();
  const passwordRef = useRef();
  const [form, setform] = useState({ site: "", username: "", password: "" });

  const [passwordArray, setPasswordArray] = useState([]);

  useEffect(() => {
    let passwords = localStorage.getItem("passwords");
    let passwordArray;
    if (passwords) {
      passwordArray = JSON.parse(passwords);
    } else {
      passwordArray = [];
    }
  }, []);

  const showPassword = () => {
    passwordRef.current.type = "password";
    console.log(ref.current.src);
    if (ref.current.src.includes("/closeeye.png")) {
      ref.current.src = "/eye.webp";
      passwordRef.current.type = "password";
    } else {
      ref.current.src = "/closeeye.png";
      passwordRef.current.type = "text";
    }
  };

  const savePassword = () => {
    setPasswordArray([...passwordArray, {...form, id: uuidv4()}]);
    localStorage.setItem("passwords", JSON.stringify([...passwordArray, {...form, id: uuidv4()}]));
    console.log([...passwordArray, form]);
  };

  const deletePassword = (id) => {
    let c = confirm("Do you really want to delte this password?")
    if(c){
        setPasswordArray(passwordArray.filter(item=>item.id!==id));
        localStorage.setItem("passwords", JSON.stringify(passwordArray.filter(item=>item.id!==id)));
    }

  };

  const editPassword = (id) => {
    setform(passwordArray.filter(item=>item.id===id)[0]);
    setPasswordArray(passwordArray.filter(item=>item.id!==id));
  }

  const handleChange = (e) => {
    setform({ ...form, [e.target.name]: e.target.value });
  };

  const copyText = (text) => {
    toast('Copied to clipboard!', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        });
    navigator.clipboard.writeText(text);
  };

  

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
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
      {/* Same as */}
      <ToastContainer />
      <div class="absolute top-0 z-[-2] h-screen w-screen rotate-180 transform bg-white bg-[radial-gradient(60%_120%_at_50%_50%,hsla(0,0%,100%,0)_0,rgba(252,205,238,.5)_100%)]"></div>

      <div className="myContainer px-80 text-center">
        <div className="logo font-bold text-2xl">
          <span className="text-green-800">&lt;</span>
          Pass
          <span className="text-green-800">OP/&gt;</span>
        </div>
        <p className="text-green-800 text-lg">Your own Password Manager</p>
        <div className=" flex flex-col p-4 gap-8 items-center">
          <input
            name="site"
            value={form.site}
            onChange={handleChange}
            placeholder="Enter website URL"
            type="text"
            className="rounded-full border border-green-500 px-4 py-0.5 text-black w-full"
          />
          <div className="flex gap-8 w-full">
            <input
              name="username"
              value={form.username}
              onChange={handleChange}
              placeholder="Enter Username"
              type="text"
              className="rounded-full border border-green-500 px-4 py-0.5 text-black w-full"
            />
            <div className="relative">
              <input
                ref={passwordRef}
                name="password"
                value={form.password}
                onChange={handleChange}
                placeholder="Enter Password"
                type="password"
                className="rounded-full border border-green-500 px-5 py-0.5 text-black w-25"
              />
              <span className="absolute inset-y-0 right-0 flex items-center pr-3">
                <img
                  ref={ref}
                  className="w-7 cursor-pointer"
                  src="/eye.webp"
                  alt=""
                  onClick={showPassword}
                />
              </span>
            </div>
          </div>

          <button
            type="submit"
            className=" bg-green-600 px-8 py-3 w-fit  flex justify-center items-center rounded-full hover:bg-green-500 "
            onClick={savePassword}
          >
            <lord-icon
              src="https://cdn.lordicon.com/jgnvfzqg.json"
              trigger="hover"
            ></lord-icon>
            Save Password
          </button>
        </div>

        <div className="passwords">
          <h1 className="flex font-bold text-2xl p-4">Your Passwords</h1>
          {passwordArray.length === 0 && (
            <div className="text-xl">No passwords to show</div>
          )}
          {passwordArray.length != 0 && (
            <table class="table-auto w-full rounded-xl overflow-hidden">
              <thead className="bg-green-400">
                <tr>
                  <th className="py-2">Site</th>
                  <th className="py-2">Username</th>
                  <th className="py-2">Password</th>
                  <th className="py-2">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-green-100">
                {passwordArray.map((item) => {
                  return (
                    <tr>
                      <td className="py-3 text-center w-52">
                        <a href={item.site} target="_blank">
                          {item.site}
                        </a>
                        <span
                          onClick={() => {
                            copyText(item.site);
                          }}
                        >
                          <FontAwesomeIcon
                            icon={faCopy}
                            className="ml-2 cursor-pointer items-center"
                            onClick={() => handleCopyPassword(item.password)}
                          />
                        </span>
                      </td>
                      <td className="py-3 text-center w-52">
                        {item.username}
                        <span
                          onClick={() => {
                            copyText(item.username);
                          }}
                        >
                          <FontAwesomeIcon
                            icon={faCopy}
                            className="ml-2 cursor-pointer items-center"
                            onClick={() => handleCopyPassword(item.password)}
                          />
                        </span>
                      </td>
                      <td className="py-3 text-center w-52">
                        {item.password}
                        <span
                          onClick={() => {
                            copyText(item.password);
                          }}
                        >
                          <FontAwesomeIcon
                            icon={faCopy}
                            className="ml-2 cursor-pointer items-center"
                            onClick={() => handleCopyPassword(item.password)}
                          />
                        </span>
                      </td>

                      <td className="py-3 text-center w-52">
                        <span
                          onClick={() => {
                            editPassword(item.id);
                          }}
                        >
                            <FontAwesomeIcon className="mx-2" icon={faPen} />
                        </span>
                        <span onClick={()=>{deletePassword(item.id)}}>
                            <FontAwesomeIcon className="mx-1" icon={faTrash} />
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </>
  );
}

export default Manager;
