// import React, { useState } from "react";

// interface InvoiceItem {
//   item: string;
//   quantity: string;
//   total: string;
// }

// interface Invoice {
//   invoiceNo: string;
//   date: string;
//   patientName: string;
//   items: InvoiceItem[];
//   totalBill: string;
//   title?: string; // Used to track the file name
// }

// const EmptyInvoice: Invoice = {
//   invoiceNo: "",
//   date: "",
//   patientName: "",
//   items: [{ item: "", quantity: "", total: "" }],
//   totalBill: "",
// };

// const InvoiceForm = ({
//   invoice,
//   onChange,
//   onSave,
// }: {
//   invoice: Invoice;
//   onChange: (inv: Invoice) => void;
//   onSave: () => void;
// }) => {
//   const handleItemChange = (
//     index: number,
//     field: keyof InvoiceItem,
//     value: string
//   ) => {
//     const updatedItems = invoice.items.map((item, i) =>
//       i === index ? { ...item, [field]: value } : item
//     );
//     onChange({ ...invoice, items: updatedItems });
//   };

//   return (
//     <div className="p-4 my-4 border text-sm space-y-2">
//       <input
//         placeholder="Invoice No"
//         className="border px-2 py-1"
//         value={invoice.invoiceNo}
//         onChange={(e) => onChange({ ...invoice, invoiceNo: e.target.value })}
//       />
//       <input
//         placeholder="Date"
//         className="border px-2 py-1"
//         value={invoice.date}
//         onChange={(e) => onChange({ ...invoice, date: e.target.value })}
//       />
//       <input
//         placeholder="Patient Name"
//         className="border px-2 py-1"
//         value={invoice.patientName}
//         onChange={(e) => onChange({ ...invoice, patientName: e.target.value })}
//       />
//       {invoice.items.map((item, idx) => (
//         <div key={idx} className="flex gap-2">
//           <input
//             placeholder="Item"
//             className="border px-2 py-1"
//             value={item.item}
//             onChange={(e) => handleItemChange(idx, "item", e.target.value)}
//           />
//           <input
//             placeholder="Qty"
//             className="border px-2 py-1 w-16"
//             value={item.quantity}
//             onChange={(e) => handleItemChange(idx, "quantity", e.target.value)}
//           />
//           <input
//             placeholder="₹Total"
//             className="border px-2 py-1 w-24"
//             value={item.total}
//             onChange={(e) => handleItemChange(idx, "total", e.target.value)}
//           />
//         </div>
//       ))}
//       <input
//         placeholder="Total Bill ₹"
//         className="border px-2 py-1"
//         value={invoice.totalBill}
//         onChange={(e) => onChange({ ...invoice, totalBill: e.target.value })}
//       />
//       <button
//         onClick={onSave}
//         className="mt-2 px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700"
//       >
//         Save Invoice
//       </button>
//     </div>
//   );
// };

// const InvoiceManager: React.FC = () => {
//   const [invoices, setInvoices] = useState<Invoice[]>([]);

//   const addNewInvoice = async () => {
//     const title = await window.context.createInvoice();
//     if (!title) return;

//     const newInvoice: Invoice = {
//       ...EmptyInvoice,
//       items: EmptyInvoice.items.map((item) => ({ ...item })),
//       title,
//     };

//     setInvoices((prev) => [...prev, newInvoice]);
//   };

//   const handleInvoiceChange = (index: number, updatedInvoice: Invoice) => {
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
//     } catch (error) {
//       console.error("Error saving invoice:", error);
//       alert("Failed to save invoice.");
//     }
//   };

//   return (
//     <div className="p-4">
//       <button
//         onClick={addNewInvoice}
//         className="mb-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
//       >
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
// Updated InvoiceManager with Real Invoice Schema and Styling
import React, { useState } from "react";

interface InvoiceItem {
  item: string;
  quantity: string;
  hsn: string;
  batch: string;
  expiry: string;
  mrp: string;
  gst: string;
  discount: string;
  total: string;
  checked?: boolean;
}

interface InvoiceData {
  date: string;
  invoiceNo: string;
  companyName: string;
  address: string;
  city: string;
  gstin: string;
  dlNumber1: string;
  dlNumber2: string;
  patientName: string;
  mobile: string;
  patientAddress: string;
  doctorName: string;
  items: InvoiceItem[];
  amountPaid: string;
  totalDiscount: string;
  totalBill: string;
  outstandingAmount: string;
  paymentStatus: string;
  pin: string;
  fssai: string;
  title?: string;
}

const EmptyInvoice: InvoiceData = {
  date: "",
  invoiceNo: "",
  companyName: "",
  address: "",
  city: "",
  gstin: "",
  dlNumber1: "",
  dlNumber2: "",
  patientName: "",
  mobile: "",
  patientAddress: "",
  doctorName: "",
  items: [{
    item: "",
    quantity: "",
    hsn: "",
    batch: "",
    expiry: "",
    mrp: "",
    gst: "",
    discount: "",
    total: "",
  }],
  amountPaid: "",
  totalDiscount: "",
  totalBill: "",
  outstandingAmount: "",
  paymentStatus: "",
  pin: "",
  fssai: "",
};

const InvoiceForm = ({
  invoice,
  onChange,
  onSave,
}: {
  invoice: InvoiceData;
  onChange: (inv: InvoiceData) => void;
  onSave: () => void;
}) => {
  const handleItemChange = (index: number, field: keyof InvoiceItem, value: string) => {
    const updatedItems = invoice.items.map((item, i) =>
      i === index ? { ...item, [field]: value } : item
    );
    onChange({ ...invoice, items: updatedItems });
  };

  const handleFieldChange = (field: keyof InvoiceData, value: string) => {
    onChange({ ...invoice, [field]: value });
  };

  return (
    <div className="p-4 my-4 border text-sm space-y-2">
      <div className="grid grid-cols-2 gap-4">
        <input placeholder="Invoice No" className="border px-2 py-1" value={invoice.invoiceNo} onChange={(e) => handleFieldChange("invoiceNo", e.target.value)} />
        <input placeholder="Date" className="border px-2 py-1" value={invoice.date} onChange={(e) => handleFieldChange("date", e.target.value)} />
        <input placeholder="Company Name" className="border px-2 py-1" value={invoice.companyName} onChange={(e) => handleFieldChange("companyName", e.target.value)} />
        <input placeholder="Address" className="border px-2 py-1" value={invoice.address} onChange={(e) => handleFieldChange("address", e.target.value)} />
        <input placeholder="City" className="border px-2 py-1" value={invoice.city} onChange={(e) => handleFieldChange("city", e.target.value)} />
        <input placeholder="PIN" className="border px-2 py-1" value={invoice.pin} onChange={(e) => handleFieldChange("pin", e.target.value)} />
        <input placeholder="FSSAI" className="border px-2 py-1" value={invoice.fssai} onChange={(e) => handleFieldChange("fssai", e.target.value)} />
        <input placeholder="GSTIN" className="border px-2 py-1" value={invoice.gstin} onChange={(e) => handleFieldChange("gstin", e.target.value)} />
        <input placeholder="DL Number 1" className="border px-2 py-1" value={invoice.dlNumber1} onChange={(e) => handleFieldChange("dlNumber1", e.target.value)} />
        <input placeholder="DL Number 2" className="border px-2 py-1" value={invoice.dlNumber2} onChange={(e) => handleFieldChange("dlNumber2", e.target.value)} />
        <input placeholder="Patient Name" className="border px-2 py-1" value={invoice.patientName} onChange={(e) => handleFieldChange("patientName", e.target.value)} />
        <input placeholder="Mobile" className="border px-2 py-1" value={invoice.mobile} onChange={(e) => handleFieldChange("mobile", e.target.value)} />
        <input placeholder="Patient Address" className="border px-2 py-1" value={invoice.patientAddress} onChange={(e) => handleFieldChange("patientAddress", e.target.value)} />
        <input placeholder="Doctor Name" className="border px-2 py-1" value={invoice.doctorName} onChange={(e) => handleFieldChange("doctorName", e.target.value)} />
      </div>

      <div className="mt-4 space-y-2">
        {invoice.items.map((item, idx) => (
          <div key={idx} className="grid grid-cols-5 gap-2">
            <input placeholder="Item" className="border px-2 py-1" value={item.item} onChange={(e) => handleItemChange(idx, "item", e.target.value)} />
            <input placeholder="Quantity" className="border px-2 py-1" value={item.quantity} onChange={(e) => handleItemChange(idx, "quantity", e.target.value)} />
            <input placeholder="HSN" className="border px-2 py-1" value={item.hsn} onChange={(e) => handleItemChange(idx, "hsn", e.target.value)} />
            <input placeholder="Batch" className="border px-2 py-1" value={item.batch} onChange={(e) => handleItemChange(idx, "batch", e.target.value)} />
            <input placeholder="Expiry" className="border px-2 py-1" value={item.expiry} onChange={(e) => handleItemChange(idx, "expiry", e.target.value)} />
            <input placeholder="MRP" className="border px-2 py-1" value={item.mrp} onChange={(e) => handleItemChange(idx, "mrp", e.target.value)} />
            <input placeholder="GST %" className="border px-2 py-1" value={item.gst} onChange={(e) => handleItemChange(idx, "gst", e.target.value)} />
            <input placeholder="Discount %" className="border px-2 py-1" value={item.discount} onChange={(e) => handleItemChange(idx, "discount", e.target.value)} />
            <input placeholder="Total" className="border px-2 py-1" value={item.total} onChange={(e) => handleItemChange(idx, "total", e.target.value)} />
          </div>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-4 mt-4">
        <input placeholder="Amount Paid" className="border px-2 py-1" value={invoice.amountPaid} onChange={(e) => handleFieldChange("amountPaid", e.target.value)} />
        <input placeholder="Total Discount" className="border px-2 py-1" value={invoice.totalDiscount} onChange={(e) => handleFieldChange("totalDiscount", e.target.value)} />
        <input placeholder="Total Bill" className="border px-2 py-1" value={invoice.totalBill} onChange={(e) => handleFieldChange("totalBill", e.target.value)} />
        <input placeholder="Outstanding Amount" className="border px-2 py-1" value={invoice.outstandingAmount} onChange={(e) => handleFieldChange("outstandingAmount", e.target.value)} />
        <input placeholder="Payment Status" className="border px-2 py-1" value={invoice.paymentStatus} onChange={(e) => handleFieldChange("paymentStatus", e.target.value)} />
      </div>

      <button onClick={onSave} className="mt-4 px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700">
        Save Invoice
      </button>
    </div>
  );
};

const InvoiceManager: React.FC = () => {
  const [invoices, setInvoices] = useState<InvoiceData[]>([]);

  const addNewInvoice = async () => {
    const id = await window.context.createInvoice();
    if (!id) return;

    const newInvoice: InvoiceData = {
      ...EmptyInvoice,
      items: EmptyInvoice.items.map((item) => ({ ...item })),
      title: id,
    };

    setInvoices((prev) => [...prev, newInvoice]);
  };

  const handleInvoiceChange = (index: number, updatedInvoice: InvoiceData) => {
    const updated = [...invoices];
    updated[index] = updatedInvoice;
    setInvoices(updated);
  };

  const handleSave = async (index: number) => {
    const invoice = invoices[index];
    const title = invoice.title;
    if (!title) {
      alert("No file title associated with this invoice.");
      return;
    }

    try {
      await window.context.writeInvoice(title, JSON.stringify(invoice, null, 2));
      alert(`Invoice "${title}" saved successfully.`);
      setInvoices([]); // ✅ Reset to start screen
    } catch (error) {
      console.error("Error saving invoice:", error);
      alert("Failed to save invoice.");
    }
  };

  return (
    <div className="p-4">
      <button onClick={addNewInvoice} className="mb-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
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
  );
};

export default InvoiceManager;
