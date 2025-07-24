import React, { useState } from "react";
import Logo from '../../../../../resources/icon.png';

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
};

const InvoiceForm = ({
  invoice,
  onChange,
  onSave
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
              onChange={(e) => handleFieldChange("date", e.target.value)}
            />
            <p className="text-xs font-semibold mt-2">Invoice No:</p>
            <input
              className="border px-2 py-1 rounded-md text-xs"
              value={invoice.invoiceNo}
              onChange={(e) => handleFieldChange("invoiceNo", e.target.value)}
            />
          </div>
          <div />
          <div className="flex justify-end items-start">
            <img src={Logo} alt="Logo" width={70} height={70} />
            <span className="font-semibold text-xl ml-2">NEXUS</span>
          </div>
        </div>

        {/* Additional fields can go here if needed */}

        <button
          onClick={onSave}
          className="mt-4 px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700"
        >
          Save Invoice
        </button>
      </div>
    </div>
  );
};

const InvoiceManager: React.FC = () => {
  const [invoices, setInvoices] = useState<InvoiceData[]>([]);
  const [searchDate, setSearchDate] = useState('');
  const [searchPatient, setSearchPatient] = useState('');
  const [searchMobile, setSearchMobile] = useState('');
  const [searchInvoiceNo, setSearchInvoiceNo] = useState('');

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
    alert('No file title associated with this invoice.');
    return;
  }

  try {
    await window.context.writeInvoice(title, JSON.stringify(invoice, null, 2));
    alert(`Invoice "${title}" updated successfully.`);
    // Optionally remove this if you want to keep the invoice visible:
    // setInvoices([]);
  } catch (error) {
    console.error('Error saving invoice:', error);
    alert('Failed to save invoice.');
  }
};


  const getFilteredInvoices = async () => {
    try {
      const result = await window.context.getInvoices(searchDate, {
        patientName: searchPatient,
        mobile: searchMobile,
      });

      const fetchedInvoices: InvoiceData[] = result.map((entry: any) => ({
        ...EmptyInvoice,
        ...entry.data,
        title: entry.title,
      }));

      setInvoices(fetchedInvoices);
    } catch (error) {
      console.error("Error fetching invoices:", error);
      alert("Failed to fetch invoices.");
    }
  };

  const searchByInvoiceNumber = async () => {
    try {
      const invoice = await window.context.readInvoice(searchInvoiceNo);
      if (!invoice) {
        alert("Invoice not found.");
        return;
      }

      setInvoices([
        {
          ...EmptyInvoice,
          ...invoice,
          title: invoice.id || '',
        },
      ]);
    } catch (err) {
      console.error("Error fetching invoice by number:", err);
      alert("Failed to fetch invoice.");
    }
  };

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

      {/* Search by Invoice No */}
      <div className="flex flex-wrap gap-2 mb-4">
        <input
          type="text"
          placeholder="Invoice No"
          className="border px-2 py-1 rounded-md"
          value={searchInvoiceNo}
          onChange={(e) => setSearchInvoiceNo(e.target.value)}
        />
        <button
          onClick={searchByInvoiceNumber}
          className="px-3 py-1 bg-indigo-600 text-white rounded hover:bg-indigo-700"
        >
          Update by Invoice No
        </button>
      </div>

      {/* Add new invoice */}
      <button
        onClick={addNewInvoice}
        className="mb-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        + Add New Invoice
      </button>

      {/* Render invoice forms */}
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
