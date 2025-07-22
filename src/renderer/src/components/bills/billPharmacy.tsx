import React, { useState } from 'react'
import Logo from '../../../../../resources/icon.png'

interface InvoiceItem {
  item: string
  quantity: string
  hsn: string
  batch: string
  expiry: string
  mrp: string
  gst: string
  discount: string
  total: string
  checked?: boolean
}

interface InvoiceData {
  date: string
  invoiceNo: string
  companyName: string
  address: string
  city: string
  gstin: string
  dlNumber1: string
  dlNumber2: string
  patientName: string
  mobile: string
  patientAddress: string
  doctorName: string
  items: InvoiceItem[]
  amountPaid: string
  totalDiscount: string
  totalBill: string
  outstandingAmount: string
  paymentStatus: string
  pin: string
  fssai: string
  title?: string
}

const EmptyInvoice: InvoiceData = {
  date: '',
  invoiceNo: '',
  companyName: '',
  address: '',
  city: '',
  gstin: '',
  dlNumber1: '',
  dlNumber2: '',
  patientName: '',
  mobile: '',
  patientAddress: '',
  doctorName: '',
  items: [
    {
      item: '',
      quantity: '',
      hsn: '',
      batch: '',
      expiry: '',
      mrp: '',
      gst: '',
      discount: '',
      total: ''
    }
  ],
  amountPaid: '',
  totalDiscount: '',
  totalBill: '',
  outstandingAmount: '',
  paymentStatus: '',
  pin: '',
  fssai: ''
}

const InvoiceForm = ({
  invoice,
  onChange,
  onSave
}: {
  invoice: InvoiceData
  onChange: (inv: InvoiceData) => void
  onSave: () => void
}) => {
  const handleItemChange = (index: number, field: keyof InvoiceItem, value: string) => {
    const updatedItems = invoice.items.map((item, i) =>
      i === index ? { ...item, [field]: value } : item
    )
    onChange({ ...invoice, items: updatedItems })
  }

  const handleFieldChange = (field: keyof InvoiceData, value: string) => {
    onChange({ ...invoice, [field]: value })
  }

  return (
    <div className="border-2 border-gray-300 rounded-md w-full max-w-full p-4 mb-8">
      <div className="text-[10px]">
        <div className="text-center">
          <h1 className="text-lg font-bold underline">Sales Invoice</h1>
        </div>

        <div className="grid grid-cols-3 mt-2">
          <div>
            <p className="text-xs font-semibold">Date:</p>
            <input
              className="border px-2 py-1 rounded-md text-xs"
              value={invoice.date}
              onChange={(e) => handleFieldChange('date', e.target.value)}
            />
            <p className="text-xs font-semibold mt-2">Invoice No:</p>
            <input
              className="border px-2 py-1 rounded-md text-xs"
              value={invoice.invoiceNo}
              onChange={(e) => handleFieldChange('invoiceNo', e.target.value)}
            />
          </div>
          <div />
          <div className="flex justify-end items-start">
            <img src={Logo} alt="Logo" width={70} height={70} />
            <span className="font-semibold text-xl ml-2">NEXUS</span>
          </div>
        </div>

        {/* Add rest of form fields... */}
        {/* You already have the full form UI, so I'm omitting it here to focus on integration */}

        <button
          onClick={onSave}
          className="mt-4 px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700"
        >
          Save Invoice
        </button>
      </div>
    </div>
  )
}

const InvoiceManager: React.FC = () => {
  const [invoices, setInvoices] = useState<InvoiceData[]>([])

  const [searchDate, setSearchDate] = useState('')
  const [searchPatient, setSearchPatient] = useState('')
  const [searchMobile, setSearchMobile] = useState('')

  const addNewInvoice = async () => {
    const id = await window.context.createInvoice()
    if (!id) return

    const newInvoice: InvoiceData = {
      ...EmptyInvoice,
      items: EmptyInvoice.items.map((item) => ({ ...item })),
      title: id
    }

    setInvoices((prev) => [...prev, newInvoice])
  }

  const handleInvoiceChange = (index: number, updatedInvoice: InvoiceData) => {
    const updated = [...invoices]
    updated[index] = updatedInvoice
    setInvoices(updated)
  }

  const handleSave = async (index: number) => {
    const invoice = invoices[index]
    const title = invoice.title
    if (!title) {
      alert('No file title associated with this invoice.')
      return
    }

    try {
      await window.context.writeInvoice(title, JSON.stringify(invoice, null, 2))
      alert(`Invoice "${title}" saved successfully.`)
      setInvoices([]) // Reset to start screen
    } catch (error) {
      console.error('Error saving invoice:', error)
      alert('Failed to save invoice.')
    }
  }

  const getFilteredInvoices = async () => {
    try {
      const result = await window.context.getInvoices(searchDate, {
        patientName: searchPatient,
        mobile: searchMobile
      })

      const fetchedInvoices: InvoiceData[] = result.map((entry: any) => ({
        ...EmptyInvoice,
        ...entry.data,
        title: entry.title
      }))

      setInvoices(fetchedInvoices)
    } catch (error) {
      console.error('Error fetching invoices:', error)
      alert('Failed to fetch invoices.')
    }
  }

  return (
    <div className="p-4">
      {/* Search Inputs */}
      <div className="flex flex-wrap gap-2 mb-4">
        <input
          type="text"
          placeholder="Date (YYYY-MM-DD)"
          className="border px-2 py-1 rounded-md"
          value={searchDate}
          onChange={(e) => setSearchDate(e.target.value)}
        />
        <input
          type="text"
          placeholder="Patient Name"
          className="border px-2 py-1 rounded-md"
          value={searchPatient}
          onChange={(e) => setSearchPatient(e.target.value)}
        />
        <input
          type="text"
          placeholder="Mobile"
          className="border px-2 py-1 rounded-md"
          value={searchMobile}
          onChange={(e) => setSearchMobile(e.target.value)}
        />
        <button
          onClick={getFilteredInvoices}
          className="px-3 py-1 bg-gray-800 text-white rounded hover:bg-gray-900"
        >
          Get Invoices
        </button>
      </div>

      <button
        onClick={addNewInvoice}
        className="mb-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        + Add New Invoice
      </button>

      {invoices.map((invoice, idx) => (
        <InvoiceForm
          key={invoice.title || idx}
          invoice={invoice}
          onChange={(inv) => handleInvoiceChange(idx, inv)}
          onSave={() => handleSave(idx)}
        />
      ))}
    </div>
  )
}

export default InvoiceManager

// import React, { useState } from "react";
// import Logo from '../../../../../resources/icon.png'
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
//   checked?: boolean;
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
//   title?: string;
// }

// const EmptyInvoice: InvoiceData = {
//   date: "",
//   invoiceNo: "",
//   companyName: "",
//   address: "",
//   city: "",
//   gstin: "",
//   dlNumber1: "",
//   dlNumber2: "",
//   patientName: "",
//   mobile: "",
//   patientAddress: "",
//   doctorName: "",
//   items: [{
//     item: "",
//     quantity: "",
//     hsn: "",
//     batch: "",
//     expiry: "",
//     mrp: "",
//     gst: "",
//     discount: "",
//     total: "",
//   }],
//   amountPaid: "",
//   totalDiscount: "",
//   totalBill: "",
//   outstandingAmount: "",
//   paymentStatus: "",
//   pin: "",
//   fssai: "",
// };

// const InvoiceForm = ({
//   invoice,
//   onChange,
//   onSave,
// }: {
//   invoice: InvoiceData;
//   onChange: (inv: InvoiceData) => void;
//   onSave: () => void;
// }) => {
//   const handleItemChange = (index: number, field: keyof InvoiceItem, value: string) => {
//     const updatedItems = invoice.items.map((item, i) =>
//       i === index ? { ...item, [field]: value } : item
//     );
//     onChange({ ...invoice, items: updatedItems });
//   };

//   const handleFieldChange = (field: keyof InvoiceData, value: string) => {
//     onChange({ ...invoice, [field]: value });
//   };

//   return (
//     <div>
//       <div className="border-2 border-gray-300 rounded-md w-full max-w-full">
//         <div className="text-[10px]">
//           <div className="text-center">
//             <h1 className="text-lg font-bold underline">Sales Invoice</h1>
//           </div>

//           <div className="pl-4 mt-2 grid grid-cols-3 gap-44">
//             <div className="justify-start">
//               <div className="mb-3">
//                 <p className="text-xs font-semibold">Date: </p>
//                 <input
//                   placeholder="Date"
//                   className="border px-2 py-1 rounded-md placeholder:text-[11px] placeholder:text-[#4D4D4D] border-[#999999] placeholder:font-medium"
//                   value={invoice.date}
//                   onChange={(e) => handleFieldChange('date', e.target.value)}
//                 />
//               </div>
//               <div>
//                 <p className="text-xs font-semibold">Invoice No: </p>
//                 <input
//                   placeholder="Invoice No"
//                   className="border px-2 py-1 rounded-md placeholder:text-[11px] placeholder:text-[#4D4D4D] border-[#999999] placeholder:font-medium"
//                   value={invoice.invoiceNo}
//                   onChange={(e) => handleFieldChange('invoiceNo', e.target.value)}
//                 />
//               </div>
//             </div>
//             <div></div>
//             <div className="justify-end items-end">
//               <p className="flex items-end gap-2">
//                 <img src={Logo} alt="Logo" width={70} height={70} />
//                 <span className="font-semibold text-xl mb-1">NEXUS</span>
//               </p>
//             </div>
//           </div>
//           <div className="border-t border-gray-300 my-4"></div>

//           <div className="my-4 text-sm space-y-2">
//             <div className="grid grid-cols-3">
//               <div className="pl-4">
//                 <div className="mb-3">
//                   <input
//                     placeholder="Company Name"
//                     className="border px-2 py-1 rounded-md placeholder:text-[11px] placeholder:text-[#4D4D4D] border-[#999999] placeholder:font-medium"
//                     value={invoice.companyName}
//                     onChange={(e) => handleFieldChange('companyName', e.target.value)}
//                   />
//                 </div>
//                 <div className="mb-3">
//                   <input
//                     placeholder="Address"
//                     className="border px-2 py-1 rounded-md placeholder:text-[11px] placeholder:text-[#4D4D4D] border-[#999999] placeholder:font-medium"
//                     value={invoice.address}
//                     onChange={(e) => handleFieldChange('address', e.target.value)}
//                   />
//                 </div>
//                 <div className="mb-3">
//                   <input
//                     placeholder="City"
//                     className="border px-2 py-1 rounded-md placeholder:text-[11px] placeholder:text-[#4D4D4D] border-[#999999] placeholder:font-medium"
//                     value={invoice.city}
//                     onChange={(e) => handleFieldChange('city', e.target.value)}
//                   />
//                 </div>
//                 <div className="mb-3">
//                   <input
//                     placeholder="PIN"
//                     className="border px-2 py-1 rounded-md placeholder:text-[11px] placeholder:text-[#4D4D4D] border-[#999999] placeholder:font-medium"
//                     value={invoice.pin}
//                     onChange={(e) => handleFieldChange('pin', e.target.value)}
//                   />
//                 </div>
//               </div>
//               <div>
//                 <div className="mb-3">
//                   <span className="text-xs font-semibold text-[#1A1A1A]">FSSAI: </span>
//                   <input
//                     placeholder="FSSAI"
//                     className="border px-2 py-1 rounded-md placeholder:text-[11px] placeholder:text-[#4D4D4D] border-[#999999] placeholder:font-medium"
//                     value={invoice.fssai}
//                     onChange={(e) => handleFieldChange('fssai', e.target.value)}
//                   />
//                 </div>
//                 <div className="mb-3">
//                   <span className="text-xs font-semibold text-[#1A1A1A]">GSTIN: </span>
//                   <input
//                     placeholder="GSTIN"
//                     className="border px-2 py-1 rounded-md placeholder:text-[11px] placeholder:text-[#4D4D4D] border-[#999999] placeholder:font-medium"
//                     value={invoice.gstin}
//                     onChange={(e) => handleFieldChange('gstin', e.target.value)}
//                   />
//                 </div>
//                 <div className="mb-3">
//                   <span className="text-xs font-semibold text-[#1A1A1A]">DL Number 1: </span>
//                   <input
//                     placeholder="DL Number 1"
//                     className="border px-2 py-1 rounded-md placeholder:text-[11px] placeholder:text-[#4D4D4D] border-[#999999] placeholder:font-medium"
//                     value={invoice.dlNumber1}
//                     onChange={(e) => handleFieldChange('dlNumber1', e.target.value)}
//                   />
//                 </div>
//                 <div className="mb-3">
//                   <span className="text-xs font-semibold text-[#1A1A1A]">DL Number 2: </span>
//                   <input
//                     placeholder="DL Number 2"
//                     className="border px-2 py-1 rounded-md placeholder:text-[11px] placeholder:text-[#4D4D4D] border-[#999999] placeholder:font-medium"
//                     value={invoice.dlNumber2}
//                     onChange={(e) => handleFieldChange('dlNumber2', e.target.value)}
//                   />
//                 </div>
//               </div>
//               <div></div>
//             </div>
//             <div className="border-t border-gray-300 my-4 pb-5"></div>
//             <div className="my-4 grid grid-cols-2 gap-4 ">
//               <div className="grid grid-cols-2 gap-4">
//                 <div className="pl-4">
//                   <div className="mb-4">
//                     <p className="text-xs font-semibold mb-1 text-[#1A1A1A]">Patient Name</p>
//                     <input
//                       placeholder="Patient Name"
//                       className="border px-2 py-1 rounded-md placeholder:text-[11px] placeholder:text-[#4D4D4D] border-[#999999] placeholder:font-medium"
//                       value={invoice.patientName}
//                       onChange={(e) => handleFieldChange('patientName', e.target.value)}
//                     />
//                   </div>
//                   <div>
//                     <p className="text-xs font-semibold mb-1 text-[#1A1A1A]">Phone Number</p>
//                     <input
//                       placeholder="Mobile"
//                       className="border px-2 py-1 rounded-md placeholder:text-[11px] placeholder:text-[#4D4D4D] border-[#999999] placeholder:font-medium"
//                       value={invoice.mobile}
//                       onChange={(e) => handleFieldChange('mobile', e.target.value)}
//                     />
//                   </div>
//                 </div>
//                 <div>
//                   <div className="mb-4">
//                     <p className="text-xs font-semibold mb-1 text-[#1A1A1A]">Address</p>
//                     <input
//                       placeholder="Patient Address"
//                       className="border px-2 py-1 rounded-md placeholder:text-[11px] placeholder:text-[#4D4D4D] border-[#999999] placeholder:font-medium"
//                       value={invoice.patientAddress}
//                       onChange={(e) => handleFieldChange('patientAddress', e.target.value)}
//                     />
//                   </div>
//                   <div>
//                     <p className="text-xs font-semibold mb-1 text-[#1A1A1A]">Doctor Name</p>
//                     <input
//                       placeholder="Doctor Name"
//                       className="border px-2 py-1 rounded-md placeholder:text-[11px] placeholder:text-[#4D4D4D] border-[#999999] placeholder:font-medium"
//                       value={invoice.doctorName}
//                       onChange={(e) => handleFieldChange('doctorName', e.target.value)}
//                     />
//                   </div>
//                 </div>
//               </div>
//             </div>
//             <div className="pt-5">
//               <table className="w-full mt-4 border-collapse border border-[#CCCCCC]">
//                 <thead>
//                   <tr className="border-b border-[#CCCCCC] text-center font-semibold">
//                     <th className="border-r border-[#CCCCCC] p-1  font-bold text-xs">ITEM</th>
//                     <th className="border-r border-[#CCCCCC] p-1 font-bold text-xs">QUANTITY</th>
//                     <th className="border-r border-[#CCCCCC] p-1 font-bold text-xs">HSN</th>
//                     <th className="border-r border-[#CCCCCC] p-1 font-bold text-xs">BATCH</th>
//                     <th className="border-r border-[#CCCCCC] p-1 font-bold text-xs">EXPIRY</th>
//                     <th className="border-r border[#CCCCCC] p-1 font-bold text-xs">MRP</th>
//                     <th className="border-r border-[#CCCCCC] p-1 font-bold text-xs">GST %</th>
//                     <th className="border-r border-[#CCCCCC] p-1 font-bold text-xs">DISCOUNT %</th>
//                     <th className="p-1 font-bold text-xs">TOTAL</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {invoice.items.map((item, idx) => (
//                     <tr key={idx} className="border-b border-[#CCCCCC]">
//                       <td className="border-r border-[#CCCCCC] align-top py-6">
//                         <div className="flex flex-col items-center justify-center">
//                           <p className="text-xs font-semibold text-[#1A1A1A] mr-24 mb-2">
//                             Item Name
//                           </p>
//                           <input
//                             placeholder="Lorem Ipsum"
//                             className="w-40 border px-2 py-1 rounded-md placeholder:text-[11px] placeholder:text-[#4D4D4D] border-[#999999] placeholder:font-medium"
//                             value={item.item}
//                             onChange={(e) => handleItemChange(idx, 'item', e.target.value)}
//                           />
//                         </div>
//                       </td>
//                       <td className="border-r border-[#CCCCCC] p-1">
//                         <div className="flex flex-col items-center justify-center">
//                           <p className="text-xs font-semibold text-[#1A1A1A] mb-2">Quantity</p>
//                           <input
//                             placeholder="Quantity"
//                             className="w-20 border px-2 py-1 rounded-md placeholder:text-[11px] placeholder:text-[#4D4D4D] border-[#999999] placeholder:font-medium "
//                             value={item.quantity}
//                             onChange={(e) => handleItemChange(idx, 'quantity', e.target.value)}
//                           />
//                         </div>
//                       </td>
//                       <td className="border-r border-[#CCCCCC] p-1">
//                         <div className="flex flex-col items-center justify-center">
//                           <p className="text-xs font-semibold text-[#1A1A1A] mb-2 ">HSN</p>
//                           <input
//                             placeholder="HSN"
//                             className="w-20 border px-2 py-1 rounded-md placeholder:text-[11px] placeholder:text-[#4D4D4D] border-[#999999] placeholder:font-medium"
//                             value={item.hsn}
//                             onChange={(e) => handleItemChange(idx, 'hsn', e.target.value)}
//                           />
//                         </div>
//                       </td>
//                       <td className="border-r border-[#CCCCCC] p-1">
//                         <div className="flex flex-col items-center justify-center">
//                           <p className="text-xs font-semibold text-[#1A1A1A] mb-2 ">Batch</p>
//                           <input
//                             placeholder="Batch"
//                             className="w-20 border px-2 py-1 rounded-md placeholder:text-[11px] placeholder:text-[#4D4D4D] border-[#999999] placeholder:font-medium"
//                             value={item.batch}
//                             onChange={(e) => handleItemChange(idx, 'batch', e.target.value)}
//                           />
//                         </div>
//                       </td>
//                       <td className="border-r border-[#CCCCCC] p-1">
//                         <div className="flex flex-col items-center justify-center">
//                           <p className="text-xs font-semibold text-[#1A1A1A] mb-2">Expiry</p>
//                           <input
//                             placeholder="Expiry"
//                             className="w-20 border px-2 py-1 rounded-md placeholder:text-[11px] placeholder:text-[#4D4D4D] border-[#999999] placeholder:font-medium"
//                             value={item.expiry}
//                             onChange={(e) => handleItemChange(idx, 'expiry', e.target.value)}
//                           />
//                         </div>
//                       </td>
//                       <td className="border-r border-[#CCCCCC] p-1">
//                         <div className="flex flex-col items-center justify-center">
//                           <p className="text-xs font-semibold text-[#1A1A1A] mb-2 ">MRP</p>
//                           <input
//                             placeholder="MRP"
//                             className="w-20 border px-2 py-1 rounded-md placeholder:text-[11px] placeholder:text-[#4D4D4D] border-[#999999] placeholder:font-medium"
//                             value={item.mrp}
//                             onChange={(e) => handleItemChange(idx, 'mrp', e.target.value)}
//                           />
//                         </div>
//                       </td>
//                       <td className="border-r border-[#CCCCCC] p-1">
//                         <div className="flex flex-col items-center justify-center">
//                           <p className="text-xs font-semibold text-[#1A1A1A] mb-2 ">GST %</p>
//                           <input
//                             placeholder="GST %"
//                             className="w-20 border px-2 py-1 rounded-md placeholder:text-[11px] placeholder:text-[#4D4D4D] border-[#999999] placeholder:font-medium"
//                             value={item.gst}
//                             onChange={(e) => handleItemChange(idx, 'gst', e.target.value)}
//                           />
//                         </div>
//                       </td>
//                       <td className="border-r border-[#CCCCCC] p-1">
//                         <div className="flex flex-col items-center justify-center">
//                           <p className="text-xs font-semibold text-[#1A1A1A] mb-2 ">Discount %</p>
//                           <input
//                             placeholder="Discount %"
//                             className="w-20 border px-2 py-1 rounded-md placeholder:text-[11px] placeholder:text-[#4D4D4D] border-[#999999] placeholder:font-medium"
//                             value={item.discount}
//                             onChange={(e) => handleItemChange(idx, 'discount', e.target.value)}
//                           />
//                         </div>
//                       </td>
//                       <td className="p-1">
//                         <div className="flex flex-col items-center justify-center">
//                           <p className="text-xs font-semibold text-[#1A1A1A] mb-2 ">Total</p>
//                           <input
//                             placeholder="Total"
//                             className="w-20 border px-2 py-1 rounded-md placeholder:text-[11px] placeholder:text-[#4D4D4D] border-[#999999] placeholder:font-medium"
//                             value={item.total}
//                             onChange={(e) => handleItemChange(idx, 'total', e.target.value)}
//                           />
//                         </div>
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>

//             <div className="mt-6 grid grid-cols-4">
//               {/* Left Column */}
//               <div className="col-span-1 flex flex-col justify-between">
//                 <div className="text-center">
//                   <div className="mt-28 h-8 border-t border-black">
//                     <p className="mt-2 text-xs font-semibold">Authorized Signature</p>
//                   </div>
//                 </div>
//               </div>

//               {/* Middle Column*/}
//               <div className="col-span-2 border-l border-[#CCCCCC] ">
//                 <div className="flex flex-col items-center justify-between">
//                   <div className="text-center w-full">
//                     <p className="font-bold">&quot;GET WELL SOON BY NEXUS&quot;</p>
//                   </div>
//                   <div className="border-t w-full border-gray-300 my-4">
//                     <div className="p-8  text-left">
//                       <p className="text-xs font-semibold">Terms & Conditions</p>
//                       <p className="text-xs">Confirm Medicines from your Doctor before use</p>
//                     </div>
//                   </div>
//                 </div>
//               </div>

//               {/* Right Column*/}
//               <div className="col-span-1 border-l border-[#CCCCCC] pl-2">
//                 <table className="w-full text-xs pr-4">
//                   <tbody>
//                     <tr>
//                       <td className="py-1 font-semibold text-xs">Amount Paid:</td>
//                       <td className="py-1 text-right font-semibold text-xs">
//                         <input
//                           placeholder="Amount Paid"
//                           className="w-40 border px-2 py-1 rounded-md placeholder:text-[11px] placeholder:text-[#4D4D4D] border-[#999999] placeholder:font-medium"
//                           value={invoice.amountPaid}
//                           onChange={(e) => handleFieldChange('amountPaid', e.target.value)}
//                         />
//                       </td>
//                     </tr>
//                     <tr>
//                       <td className="py-1 font-semibold text-xs">Total Discount:</td>
//                       <td className="py-1 text-right font-semibold text-xs">
//                         <input
//                           placeholder="Total Discount"
//                           className="w-40 border px-2 py-1 rounded-md placeholder:text-[11px] placeholder:text-[#4D4D4D] border-[#999999] placeholder:font-medium"
//                           value={invoice.totalDiscount}
//                           onChange={(e) => handleFieldChange('totalDiscount', e.target.value)}
//                         />
//                       </td>
//                     </tr>
//                     <tr>
//                       <td className="py-1 font-semibold text-xs">Total Bill:</td>
//                       <td className="py-1 text-right font-semibold text-xs">
//                         <input
//                           placeholder="Total Bill"
//                           className="w-40 border px-2 py-1 rounded-md placeholder:text-[11px] placeholder:text-[#4D4D4D] border-[#999999] placeholder:font-medium"
//                           value={invoice.totalBill}
//                           onChange={(e) => handleFieldChange('totalBill', e.target.value)}
//                         />
//                       </td>
//                     </tr>
//                     <tr>
//                       <td className="py-1 font-semibold text-xs">Outstanding Amt:</td>
//                       <td className="py-1 text-right font-semibold text-xs">
//                         <input
//                           placeholder="Outstanding Amount"
//                           className="w-40 border px-2 py-1 rounded-md placeholder:text-[11px] placeholder:text-[#4D4D4D] border-[#999999] placeholder:font-medium"
//                           value={invoice.outstandingAmount}
//                           onChange={(e) => handleFieldChange('outstandingAmount', e.target.value)}
//                         />
//                       </td>
//                     </tr>
//                     <tr>
//                       <td className="py-1 font-semibold text-xs">PAYMENT STATUS:</td>
//                       <td className="py-1 text-right font-semibold text-xs">
//                         <input
//                           placeholder="Payment Status"
//                           className="w-40 border px-2 py-1 rounded-md placeholder:text-[11px] placeholder:text-[#4D4D4D] border-[#999999] placeholder:font-medium"
//                           value={invoice.paymentStatus}
//                           onChange={(e) => handleFieldChange('paymentStatus', e.target.value)}
//                         />
//                       </td>
//                     </tr>
//                   </tbody>
//                 </table>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//       <button
//         onClick={onSave}
//         className="mt-4 px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700"
//       >
//         Save Invoice
//       </button>
//     </div>
//   )
// }

// const InvoiceManager: React.FC = () => {
//   const [invoices, setInvoices] = useState<InvoiceData[]>([]);

//   const addNewInvoice = async () => {
//     const id = await window.context.createInvoice();
//     if (!id) return;

//     const newInvoice: InvoiceData = {
//       ...EmptyInvoice,
//       items: EmptyInvoice.items.map((item) => ({ ...item })),
//       title: id,
//     };

//     setInvoices((prev) => [...prev, newInvoice]);
//   };

//   const handleInvoiceChange = (index: number, updatedInvoice: InvoiceData) => {
//     const updated = [...invoices];
//     updated[index] = updatedInvoice;
//     setInvoices(updated);
//   };

//   const handleSave = async (index: number) => {
//     const invoice = invoices[index];
//     const title = invoice.title;
//     if (!title) {
//       alert("No file title associated with this invoice.");
//       return;
//     }

//     try {
//       await window.context.writeInvoice(title, JSON.stringify(invoice, null, 2));
//       alert(`Invoice "${title}" saved successfully.`);
//       setInvoices([]); // ✅ Reset to start screen
//     } catch (error) {
//       console.error("Error saving invoice:", error);
//       alert("Failed to save invoice.");
//     }
//   };

//   return (
//     <div className="p-4">
//       <button onClick={addNewInvoice} className="mb-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
//         + Add New Invoice
//       </button>

//       {invoices.map((invoice, idx) => (
//         <InvoiceForm
//           key={invoice.title || idx}
//           invoice={invoice}
//           onChange={(inv) => handleInvoiceChange(idx, inv)}
//           onSave={() => handleSave(idx)}
//         />
//       ))}
//     </div>
//   );
// };

// export default InvoiceManager;
