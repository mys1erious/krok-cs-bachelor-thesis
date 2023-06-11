// 'use client';
//
//
// import React, {useState} from "react";
// import aws from "@/app/api/upload-img/route";
// import toast from "react-hot-toast";
//
//
// const FileInput = () => {
//     const storeFile = (e: any) => {
//         setFile(e.target.files[0]);
//     };
//
//     const uploadFile = async() => {
//         setMessage('Uploading...');
//
//         const responseData = await aws(file);
//         setMessage(String(responseData));
//         toast.success(String(responseData));
//         // @ts-ignore
//         setFile(null);
//     };
//
//     return (
//         <div className="w-full relative">
//             <p>Upload File:</p>
//             <p>Msg: {message}</p>
//             <input type="file" onChange={(e) => storeFile(e)}/>
//             <input className="border border-black" type="button" defaultValue="Send" onClick={uploadFile}/>
//         </div>
//     );
// };
//
//
// export default FileInput;
