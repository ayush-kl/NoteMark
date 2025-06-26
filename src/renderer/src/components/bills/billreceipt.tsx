// import React, { forwardRef } from "react";
// import companyLogo from "../../../../assets/svg/main_logo.svg"; // Use relative path or place in /public

// interface InvoiceItem {
//   item: string;
//   quantity: string;
//   hsn: string;
//   batch: string;
//   expiry: string;
//   mrp: string;
//   gst: string;
//   discount: string;
//   total: string;
// }

// interface InvoiceData {
//   date: string;
//   invoiceNo: string;
//   companyName: string;
//   address: string;
//   city: string;
//   gstin: string;
//   dlNumber1: string;
//   dlNumber2: string;
//   patientName: string;
//   mobile: string;
//   patientAddress: string;
//   doctorName: string;
//   items: InvoiceItem[];
//   amountPaid: string;
//   totalDiscount: string;
//   totalBill: string;
//   outstandingAmount: string;
//   paymentStatus: string;
//   pin: string;
//   fssai: string;
// }

// const InvoicePrintContent = forwardRef<HTMLDivElement>((_, ref) => {
//   const invoiceData: InvoiceData = {
//     date: "DD-MON-YYYY",
//     invoiceNo: "XXXXXXXXXXXX",
//     companyName: "LOREM IPSUM",
//     address: "MAIN ROAD, IPSUM",
//     city: "LOREM",
//     gstin: "ABCDEFGHIJKLMNOP",
//     pin: "XXXXXXXXX",
//     fssai: "ABCXXXXX",
//     dlNumber1: "XXXXXXXXXXXX",
//     dlNumber2: "XXXXXXXXXXXX",
//     patientName: "Lorem Ipsum",
//     mobile: "+91 XXXXXXXXX",
//     patientAddress: "N/A",
//     doctorName: "Dr. Lorem Ipsum",
//     items: [
//       {
//         item: "Lorem Ipsum",
//         quantity: "xx",
//         hsn: "xxxxxx",
//         batch: "xxxxxx",
//         expiry: "dd-mm-yyyy",
//         mrp: "xxxxxx",
//         gst: "xx",
//         discount: "xx",
//         total: "xxxxxx",
//       },
//       {
//         item: "Lorem Ipsum",
//         quantity: "xx",
//         hsn: "xxxxxx",
//         batch: "xxxxxx",
//         expiry: "dd-mm-yyyy",
//         mrp: "xxxxxx",
//         gst: "xx",
//         discount: "xx",
//         total: "xxxxxx",
//       },
//       {
//         item: "Lorem Ipsum",
//         quantity: "xx",
//         hsn: "xxxxxx",
//         batch: "xxxxxx",
//         expiry: "dd-mm-yyyy",
//         mrp: "xxxxxx",
//         gst: "xx",
//         discount: "xx",
//         total: "xxxxxx",
//       },
//     ],
//     amountPaid: "XXX.XX",
//     totalDiscount: "XXX.XX",
//     totalBill: "XXX.XX",
//     outstandingAmount: "XXX.XX",
//     paymentStatus: "Partial Paid",
//   };

//   return (
//     <div ref={ref} className="border-2 border-gray-300 p-4 rounded-md w-full">
//       <div className="font-mono text-xs">
//         <div className="text-center">
//           <h1 className="text-lg font-bold underline">Sales Invoice</h1>
//         </div>

//         <div className="flex justify-between mt-2">
//           <div>
//             <p>Date: {invoiceData.date}</p>
//             <p>Invoice No: {invoiceData.invoiceNo}</p>
//           </div>
//           <div>
//             <p className="flex items-center gap-2">
//               <img
//                 src={companyLogo}
//                 alt="Company Logo"
//                 width={40}
//                 height={40}
//               />
//               <span className="font-semibold">NEXUS</span>
//             </p>
//           </div>
//         </div>

//         <div className="border-t border-gray-300 my-4"></div>

//         <div className="mt-4 grid grid-cols-2 gap-4">
//           <div>
//             <p>{invoiceData.companyName}</p>
//             <p>{invoiceData.address}</p>
//             <p>{invoiceData.city}</p>
//             <p>{invoiceData.pin}</p>
//           </div>
//           <div>
//             <p>
//               <span className="font-bold">FSSAI: </span>
//               {invoiceData.fssai}
//             </p>
//             <p>
//               <span className="font-bold">GSTIN: </span>
//               {invoiceData.gstin}
//             </p>
//             <p>
//               <span className="font-bold">DL NUMBER 1: </span>
//               {invoiceData.dlNumber1}
//             </p>
//             <p>
//               <span className="font-bold">DL NUMBER 2: </span>
//               {invoiceData.dlNumber2}
//             </p>
//           </div>
//         </div>

//         <div className="border-t border-gray-300 my-4"></div>

//         <div className="mt-4">
//           <p>
//             <span className="font-bold">Patient Name:</span>{" "}
//             {invoiceData.patientName}
//           </p>
//           <p>
//             <span className="font-bold">Mobile:</span> {invoiceData.mobile}
//           </p>
//           <p>
//             <span className="font-bold">Address:</span>{" "}
//             {invoiceData.patientAddress}
//           </p>
//           <p>
//             <span className="font-bold">Doctor Name:</span>{" "}
//             {invoiceData.doctorName}
//           </p>
//         </div>

//         <table className="w-full mt-4 border-collapse border border-black">
//           <thead>
//             <tr className="border-b border-black text-center">
//               <th className="border-r border-black p-1">ITEM</th>
//               <th className="border-r border-black p-1">QUANTITY</th>
//               <th className="border-r border-black p-1">HSN</th>
//               <th className="border-r border-black p-1">BATCH</th>
//               <th className="border-r border-black p-1">EXPIRY</th>
//               <th className="border-r border-black p-1">MRP</th>
//               <th className="border-r border-black p-1">GST %</th>
//               <th className="border-r border-black p-1">DISCOUNT %</th>
//               <th className="p-1">TOTAL</th>
//             </tr>
//           </thead>
//           <tbody>
//             {invoiceData.items.map((item, index) => (
//               <tr key={index} className="border-b border-black text-center">
//                 <td className="border-r border-black p-1">{item.item}</td>
//                 <td className="border-r border-black p-1">{item.quantity}</td>
//                 <td className="border-r border-black p-1">{item.hsn}</td>
//                 <td className="border-r border-black p-1">{item.batch}</td>
//                 <td className="border-r border-black p-1">{item.expiry}</td>
//                 <td className="border-r border-black p-1">{item.mrp}</td>
//                 <td className="border-r border-black p-1">{item.gst}</td>
//                 <td className="border-r border-black p-1">{item.discount}</td>
//                 <td className="p-1">{item.total}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>

//         <div className="mt-6 grid grid-cols-4 gap-4">
//           <div className="col-span-1 flex flex-col justify-between">
//             <div className="text-center">
//               <div className="mt-28 h-8 border-t border-black">
//                 <p className="mt-2 text-xs font-semibold">
//                   Authorized Signature
//                 </p>
//               </div>
//             </div>
//           </div>

//           <div className="col-span-2 border-l border-gray-300 pl-2">
//             <div className="flex flex-col items-center justify-between">
//               <div className="text-center w-full">
//                 <p className="font-bold">"GET WELL SOON BY NEXUS"</p>
//               </div>
//               <div className="border-t border-gray-300 my-4">
//                 <div className="mt-6 text-left">
//                   <p className="text-xs font-semibold">Terms & Conditions</p>
//                   <p className="text-xs">
//                     Confirm Medicines from your Doctor before use
//                   </p>
//                 </div>
//               </div>
//             </div>
//           </div>

//           <div className="col-span-1 border-l border-gray-300 pl-2">
//             <table className="w-full text-xs">
//               <tbody>
//                 <tr>
//                   <td className="py-1 font-semibold text-xs">Amount Paid:</td>
//                   <td className="py-1 text-right font-semibold text-xs">
//                     Rs.{invoiceData.amountPaid}
//                   </td>
//                 </tr>
//                 <tr>
//                   <td className="py-1 font-semibold text-xs">
//                     Total Discount:
//                   </td>
//                   <td className="py-1 text-right font-semibold text-xs">
//                     Rs.{invoiceData.totalDiscount}
//                   </td>
//                 </tr>
//                 <tr>
//                   <td className="py-1 font-semibold text-xs">Total Bill:</td>
//                   <td className="py-1 text-right font-semibold text-xs">
//                     Rs.{invoiceData.totalBill}
//                   </td>
//                 </tr>
//                 <tr>
//                   <td className="py-1 font-semibold text-xs">
//                     Outstanding Amt:
//                   </td>
//                   <td className="py-1 text-right font-semibold text-xs">
//                     Rs.{invoiceData.outstandingAmount}
//                   </td>
//                 </tr>
//                 <tr>
//                   <td className="py-1 font-semibold text-xs">
//                     PAYMENT STATUS:
//                   </td>
//                   <td className="py-1 text-right font-semibold text-xs">
//                     {invoiceData.paymentStatus}
//                   </td>
//                 </tr>
//               </tbody>
//             </table>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// });

// export default InvoicePrintContent;
