// import React, { useEffect, useState } from "react";
// import toast from "react-hot-toast";
// import api from "../../api/axios";

// const AdminProducts = () => {
//   const [products, setProducts] = useState([]);

//   useEffect(() => {
//     const fetchProducts = async () => {
//       try {
//         const { data } = await api.get("/admin/products"); // backend admin route
//         setProducts(data);
//       } catch (error) {
//         toast.error("Failed to fetch products");
//       }
//     };
//     fetchProducts();
//   }, []);

//   const deleteProduct = async (id) => {
//     try {
//       await api.delete(`/admin/products/${id}`);
//       setProducts(products.filter((p) => p._id !== id));
//       toast.success("Product deleted");
//     } catch (error) {
//       toast.error("Failed to delete product");
//     }
//   };

//   return (
//     <div className="p-6">
//       <h1 className="text-3xl font-bold mb-6">Manage Products</h1>
//       <table className="w-full border-collapse border">
//         <thead>
//           <tr className="bg-gray-100">
//             <th className="border px-4 py-2">Name</th>
//             <th className="border px-4 py-2">Price</th>
//             <th className="border px-4 py-2">Category</th>
//             <th className="border px-4 py-2">Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {products.map((p) => (
//             <tr key={p._id}>
//               <td className="border px-4 py-2">{p.name}</td>
//               <td className="border px-4 py-2">₹{p.price}</td>
//               <td className="border px-4 py-2">{p.category}</td>
//               <td className="border px-4 py-2 flex gap-2">
//                 <button
//                   className="bg-red-500 text-white px-2 py-1 rounded"
//                   onClick={() => deleteProduct(p._id)}
//                 >
//                   Delete
//                 </button>
//                 <button
//                   className="bg-blue-500 text-white px-2 py-1 rounded"
//                   onClick={() => toast("Edit feature coming soon")}
//                 >
//                   Edit
//                 </button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default AdminProducts;

import React from 'react'

const AdminProducts = () => {
  return (
    <div>
      
    </div>
  )
}

export default AdminProducts

